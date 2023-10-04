import {inngest} from '../../inngest.client'
import {sanityClient} from '@/server/sanity.client'
import {postInSlack} from '@/server/post-in-slack'
import {sendEmail} from '@/server/send-email'

export type NewAccountEvent = {
  name: 'marketing/new-account'
  data: {
    accountId: string | number
    status?: string
    leadEmail?: string
  } & Record<any, any>
}

export const newAccount = inngest.createFunction(
  {id: 'new-account', name: 'New Account Created'},
  {event: 'marketing/new-account'},
  async ({event, step}) => {
    const {accountId = 'default'} = event.data

    const workflow = await step.run('load workflow from sanity', async () => {
      return sanityClient.fetch(
        `*[_type == "workflow" && trigger == "new-account" && accountId == "${accountId}"][0]{title, _id, _type, trigger, accountId, "actions": actions[]}`,
      )
    })

    let shouldContinue = Boolean(workflow)

    while (shouldContinue && workflow.actions.length > 0) {
      const action = workflow.actions.shift()
      switch (action._type) {
        case 'delay':
          await step.sleep(`${action.duration}${action.unit}`)
          break
        case 'sendEmail':
          const sendToAddress = event.data[action.to]
          await step.run('send email', async () => {
            return sendEmail({
              to: sendToAddress,
              template: action.template,
              accountId,
            })
          })
          break
        case 'filter':
          shouldContinue = await step.run('filter', async () => {
            return (
              action.field &&
              event.data[action.field as string] === action.value
            )
          })
          break
        case 'slack':
          await step.run('send slack message', async () => {
            return postInSlack({
              channelId: action.channel,
              accountId,
              notificationType: event.data.status,
            })
          })
          break
        default:
          shouldContinue = false
      }
    }

    return {status: 'complete', workflow: workflow.title, accountId}
  },
)
