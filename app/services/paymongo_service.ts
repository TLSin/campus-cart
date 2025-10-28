import env from '#start/env'
import { Buffer } from 'node:buffer'

const PAYMONGO_API_URL = 'https://api.paymongo.com/v1'

interface PaymongoErrorDetail {
    detail: string
    // Add other fields if you need them, like code or source
}

/**
 * Interface for dynamic user billing data.
 */
interface UserBilling {
    name: string
    email: string
    phone?: string | null
    address?: string // The shipping address will be used as a simple line1 address
}

interface PaymongoErrorResponse {
    errors?: PaymongoErrorDetail[]
    // On success, PayMongo returns a 'data' object, which is not needed for this error check
    data?: any
}

export interface PaymentIntentResult {
    paymentIntentId: string
    clientSecret: string
    checkoutUrl: string
}

/**
 * Create a Paymongo GCash Payment Intent
*/
export async function createGCashPaymentIntent(externalId: string, amount: number, UserBilling: UserBilling) {
    const amountInCentavos = Math.round(amount * 100)
    const SECRET_KEY = env.get('PAYMONGO_SECRET_KEY')!

    if (!SECRET_KEY) {
        console.error('FATAL ERROR: PAYMONGO_SECRET_KEY is MISSING from .env or env.ts!')
        throw new Error('FATAL: PAYMONGO_SECRET_KEY is missing.')
    }

    // console.log('DEBUG: Secret Key Found. Length:', SECRET_KEY.length)

    const authString = Buffer.from(SECRET_KEY + ':').toString('base64')

    const piPayload = {
        data: {
            attributes: {
                amount: amountInCentavos,
                currency: 'PHP',
                payment_method_allowed: ['gcash'],
                return_url: `${env.get('APP_URL')}/order/success?order_id=${externalId}`,
                client_reference_id: externalId,
                description: `Order ${externalId} payment`,
                billing: {
                    name: UserBilling.name,
                    email: UserBilling.email,
                    phone: UserBilling.phone,
                    address: UserBilling.address ? {
                        line1: UserBilling.address,
                        country: 'PH',
                    } : undefined,
                },
            },
        }
    }

    let piResponse: Response
    let piResult: PaymongoErrorResponse
    let paymentIntentId: string
    let clientSecret: string

    try {
        piResponse = await fetch(`${PAYMONGO_API_URL}/payment_intents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify(piPayload),
        })

        piResult = (await piResponse.json()) as PaymongoErrorResponse

        if (!piResponse.ok || piResult.errors) {
            console.error('Paymongo Payment Intent Error:', piResult)
            throw new Error(piResult.errors ? piResult.errors[0].detail : 'Failed to create Paymongo Payment Intent.')
        }

        paymentIntentId = piResult.data.id
        clientSecret = piResult.data.attributes.client_secret
    } catch (error) {
        console.error('Paymongo Payment Intent Creation Error:', error)
        throw new Error('Failed to create Paymongo Payment Intent')
    }

    const pmPayload = {
        data: {
            attributes: {
                type: 'gcash',
                billing: {
                    name: UserBilling.name,
                    email: UserBilling.email,
                    phone: UserBilling.phone,
                    address: UserBilling.address ? {
                        line1: UserBilling.address,
                        country: 'PH',
                    } : undefined,
                },
            }
        }
    }

    let pmResponse: Response
    let pmResult: PaymongoErrorResponse
    let paymentMethodId: string

    try {
        pmResponse = await fetch(`${PAYMONGO_API_URL}/payment_methods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify(pmPayload),
        })

        pmResult = (await pmResponse.json()) as PaymongoErrorResponse

        if (!pmResponse.ok || pmResult.errors) {
            console.error('PayMongo Payment Method Creation Error:', pmResult)
            throw new Error(pmResult.errors ? pmResult.errors[0].detail : 'Failed to create PayMongo Payment Method.')
        }

        paymentMethodId = pmResult.data.id

    } catch (error) {
        console.error('PayMongo GCash Payment Method Creation Error:', error)
        throw new Error('Failed to create PayMongo Payment Method.')
    }

    const finalReturnUrl = `${env.get('APP_URL')}/order/success?order_id=${externalId}`

    const attachPayload = {
        data: {
            attributes: {
                payment_method: paymentMethodId,
                return_url: finalReturnUrl,
            },
        },
    }

    let attachResponse: Response
    let attachResult: PaymongoErrorResponse

    try {
        attachResponse = await fetch(`${PAYMONGO_API_URL}/payment_intents/${paymentIntentId}/attach`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify(attachPayload),
        })

        attachResult = (await attachResponse.json()) as PaymongoErrorResponse

        if(!attachResponse.ok || attachResult.errors){
            console.error('PayMongo Payment Intent Attach Error:', attachResult)
            throw new Error(attachResult.errors ? attachResult.errors[0].detail : 'Failed to attach Payment Method to Intent.')
        }

        const checkoutUrl = attachResult.data.attributes.next_action?.redirect?.url

        if(!checkoutUrl){
            throw new Error('PayMongo response is missing the checkout URL.')
        }

        return {
            paymentIntentId: paymentIntentId,
            clientSecret: clientSecret,
            checkoutUrl: checkoutUrl,
        }

    } catch (error) {
        console.error('PayMongo GCash Attach/Confirm Error:', error)
        throw new Error('Failed to complete PayMongo GCash payment flow.')
    }
}
