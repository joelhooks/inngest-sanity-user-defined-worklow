import {serve} from 'inngest/next'
import {inngest} from '@/inngest/inngest.client'
import {newAccount} from '@/inngest/functions/marketing/new-account'

export const {GET, POST, PUT} = serve(inngest, [newAccount])
