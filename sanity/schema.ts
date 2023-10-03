import { type SchemaTypeDefinition } from 'sanity'
import workflow from "./schemas/documents/workflow";
import delay from "./schemas/actions/delay";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    workflow,
    //actions
    delay
  ],
}
