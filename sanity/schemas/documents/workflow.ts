import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'workflow',
    type: 'document',
    title: 'Workflow',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'trigger',
            title: 'Trigger',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'accountId',
            title: 'Account ID',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'actions',
            title: 'Actions',
            type: 'array',
            of: [{type: 'delay'}]
        })
    ]
})