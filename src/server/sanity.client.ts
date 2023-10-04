import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
})
