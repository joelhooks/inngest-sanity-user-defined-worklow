type SendEmailProps = {to: string; accountId: string | number; template: string}
export async function sendEmail({to, template, accountId}: SendEmailProps) {
  console.log(
    `📧 Sending email to ${to} for account ${accountId} with template ${template}`,
  )
}
