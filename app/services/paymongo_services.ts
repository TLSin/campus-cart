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

/**
 * Creates a PayMongo Source for a GCash payment and returns the checkout URL.
 */
export async function createGCashSource(externalId: string, amount: number, UserBilling: UserBilling) {
    // PayMongo amounts must be in centavos (PHP 1.00 = 100)
    const amountInCentavos = Math.round(amount * 100) 
    
    // Basic Auth header using the Secret Key
    const SECRET_KEY = env.get('PAYMONGO_SECRET_KEY')!

    if (!SECRET_KEY) {
        console.error('FATAL ERROR: PAYMONGO_SECRET_KEY is MISSING from .env or env.ts!')
        throw new Error('FATAL: PAYMONGO_SECRET_KEY is missing.')
    }
    console.log('DEBUG: Secret Key Found. Length:', SECRET_KEY.length)

    const authString = Buffer.from(SECRET_KEY + ':').toString('base64')

    const payload = {
        data: {
            attributes: {
                amount: amountInCentavos,
                currency: 'PHP',
                type: 'gcash',
                client_reference_id: externalId,
                // CRITICAL: Set redirect URLs for success/failure
                redirect: {
                    success: `${env.get('APP_URL')}/order/success?order_id=${externalId}`,
                    failed: `${env.get('APP_URL')}/order/failure?order_id=${externalId}`,
                },
                // Optional: Include billing info if available
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
        },
    }

    try {
        const response = await fetch(`${PAYMONGO_API_URL}/sources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`,
            },
            body: JSON.stringify(payload),
        })

        const result = (await response.json()) as PaymongoErrorResponse

        if (!response.ok || result.errors) {
            console.error('PayMongo Source Error:', result)
            throw new Error(result.errors ? result.errors[0].detail : 'Failed to create PayMongo source.')
        }
        
        const sourceId = result.data.id
        const checkoutUrl = result.data.attributes.redirect.checkout_url

        if (!checkoutUrl) {
            throw new Error('PayMongo response is missing the checkout URL.')
        }
        
        return {
            sourceId: sourceId,
            checkoutUrl: checkoutUrl,
        }
    } catch (error) {
        console.error('PayMongo GCash Charge Error:', error)
        throw new Error('Failed to create PayMongo GCash source.')
    }
}