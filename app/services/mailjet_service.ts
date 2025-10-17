import mailjetImport from 'node-mailjet'

const Mailjet = mailjetImport as unknown as {
    apiConnect: (pub: string, sec: string) => any
  }

const mjPublic = process.env.MAILJET_API_KEY
const mjSecret = process.env.MAILJET_SECRET_KEY


if (!mjPublic || !mjSecret) {
    throw new Error('Mailjet API keys are not set in environment variables')
}

const mailjetClient = Mailjet.apiConnect(mjPublic, mjSecret)
// const mailjetClient = Mailjet.apiConnect(mjPublic, mjSecret)

export interface SendEmailParams {
    toEmail: string
    toName?: string
    fromEmail: string
    fromName?: string
    subject: string
    htmlPart?: string
    textPart?: string
    templateId?: number
    variables?: Record<string, unknown>
}

export async function sendEmail(params: SendEmailParams) {
    const {
        toEmail,
        toName,
        fromEmail,
        fromName,
        subject,
        htmlPart,
        textPart,
        templateId,
        variables,
    } = params

    const message: any = {
        From: {
            Email: fromEmail,
            ...(fromName ? { Name: fromName } : {}),
        },
        To: [
            {
                Email: toEmail,
                ...(toName ? { Name: toName } : {}),
            },
        ],
        subject: subject,
    }

    if (templateId) {
        message.TemplateId = templateId
        message.TemplateLanguage = true
        if (variables) message.Variables = variables
    } else {
        if (htmlPart) message.HtmlPart = htmlPart
        if (textPart) message.TextPart = textPart
    }

    try {
        const response = await mailjetClient
            .post('send', { version: 'v3.1' })
            .request({ Messages: [message] })

        return response.body
    } catch (err: any) {
        console.error('Mailjet sendEmail error:', err.statusCode, err.message)
        throw err
    }
}