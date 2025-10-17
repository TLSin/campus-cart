import pkg from 'xendit-node'
import env from '#start/env'

const Xendit = (pkg as any).default ? (pkg as any).default : pkg

const xendit = new Xendit({
    secretKey: env.get('XENDIT_SECRET_KEY')!,
})

const { EWallet } = xendit

export async function createGCashCharge(externalId: string, amount: number) {
    try {
        const payload = {
            externalId: externalId,
            amount: amount,
            ewalletType: 'GCASH',
            checkoutMethod: 'ONE_TIME_PAYMENT',
            channelProperties: {
                successRedirectURL: `${env.get('APP_URL')}/order/success`,
                failureRedirectURL: `${env.get('APP_URL')}/order/failure`,
            },
        }

        const charge = await EWallet.createEWalletCharge(payload)

        const checkoutAction = charge.actions.find((action: any) => action.action === 'MOBILE_WEB_CHECKPOINT')
        const checkoutUrl = checkoutAction ? checkoutAction.url : null

        const paymentQrCodeUrl = charge.qr_code_url || 'https://placeholder.com/default-gcash-qr.png'

        return {
            xenditId: charge.id,
            checkoutUrl: checkoutUrl,
            paymentQrCodeUrl: paymentQrCodeUrl,
        }
    } catch(error) {
        console.error('Xendit GCash Charge Error:', error)
        throw new Error('Failed to create Xendit GCash charge.')
    }

}