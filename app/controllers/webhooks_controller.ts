import type { HttpContext } from '@adonisjs/core/http'
import OrderHistory from '#models/order_history'
import CartItem from '#models/cart_item'
import Cart from '#models/cart'

export default class WebhooksController {
    /**
     * Handles incoming PayMongo Webhook notifications.
     */
    async handle({ request, response }: HttpContext) {
        // Log the full body for debugging purposes
        const eventData = request.body()
        console.log('PayMongo Webhook Received:', JSON.stringify(eventData, null, 2))

        // IMPORTANT: You MUST verify the X-Paymongo-Signature header for security.
        // This is a security requirement to ensure the request is truly from PayMongo.
        // (Implementation details for signature verification are omitted but required)

        // Check for the successful payment event. PayMongo uses a nested structure.
        // 'link.payment_paid' is the common event for successful Source/Link payments.
        const eventType = eventData.data?.attributes?.type 

        if (eventType === 'link.payment_paid') {
            // PayMongo typically puts the external reference ID you provided in the 'reference_number' field
            const externalId = eventData.data?.attributes?.data?.attributes?.reference_number 
            
            if (!externalId) {
                console.error('PayMongo Webhook payload missing reference_number (externalId).')
                return response.status(400).send({ message: 'Missing reference number.' })
            }

            try {
                // Find the order using the custom external ID ('ORDER...')
                const order = await OrderHistory.query()
                    .where('xenditExternalId', externalId) 
                    .firstOrFail()

                // Process only if the order is still awaiting payment
                if (order.status === 'Awaiting Payment') {
                    order.status = 'Processing' // Payment is confirmed by PayMongo
                    await order.save()

                    // Remove items from the user's cart
                    const cart = await Cart.findBy('studentId', order.studentId)
                    if (cart) {
                        const lineItems = await OrderLineItem.query()
                            .where('orderHistoryId', order.orderHistoryId)
                            .select('productId')

                        const lineItemProductIds = lineItems.map(item => item.productId)
                        
                        // Delete the cart items that correspond to the ordered products
                        await CartItem.query()
                            .where('cartId', cart.cartId)
                            .whereIn('productId', lineItemProductIds)
                            .delete()
                            
                        console.log(`Order ${externalId} payment confirmed. Status updated to Processing and cart cleaned.`)
                    }
                }

                // A 200 OK status confirms successful receipt and prevents retries.
                return response.status(200).send({ message: 'Webhook received and processed.' })
            } catch (error) {
                console.error('PayMongo Webhook processing failed for externalId:', externalId, error)
                // Returning a non-200 status tells PayMongo to retry the webhook later.
                return response.status(500).send({ message: 'Internal server error during processing.' })
            }
        }

        // Acknowledge other events with 200 to prevent retries
        return response.status(200).send({ message: 'Event received, no action needed.' })
    }
}