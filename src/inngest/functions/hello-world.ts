import { inngest } from '../inngest.client'
import {sanityClient} from "@/server/sanity.client";

export const helloWorld = inngest.createFunction(
    { id: 'hello-world', name: 'Hello World' },
    { event: 'test/hello.world' },
    async ({ event, step }) => {
        const { accountId } = event.data;

        const workflow = await step.run('load workflow from sanity', async () => {
          return sanityClient.fetch(`*[_type == "workflow" && trigger == "hello-world" && accountId == "${accountId}"][0]{title, _id, _type, trigger, accountId, "actions": actions[]}`)
        })

        let shouldContinue = true

        while(shouldContinue && workflow.actions.length > 0) {
          const action = workflow.actions.shift()
          if(action._type === 'delay') {
            await step.sleep(`${action.duration}${action.unit}`)
          }
          if(action._type === 'stop') {
            shouldContinue = false
          }
        }

        return { status: 'complete', workflow: workflow.title,  accountId}
    }
)
