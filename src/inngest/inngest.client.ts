import {EventSchemas, Inngest} from 'inngest'
import {NewAccountEvent} from '@/inngest/functions/marketing/new-account'

// Create a client to send and receive events
type Events = {
  'marketing/new-account': NewAccountEvent
}
export const inngest = new Inngest({
  name: 'User Defined Workflow',
  schemas: new EventSchemas().fromRecord<Events>(),
})
