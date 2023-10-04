type PostInSlackProps = {
  channelId: string
  accountId: string | number
  notificationType?: string
}
export async function postInSlack({
  channelId,
  accountId,
  notificationType = 'default',
}: PostInSlackProps) {
  console.info(
    `💥 Posting in Slack channel ${channelId} for account ${accountId} with notification type ${notificationType}`,
  )
}
