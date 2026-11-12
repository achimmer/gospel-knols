import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {format, parseISO} from 'date-fns'
import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'references',
      title: 'References',
      type: 'blockContent',
      description: 'Optional closing source list. Keep inline citations in Content. The website adds the References heading.',
    }),
    defineField({
      name: 'disclaimerMode',
      title: 'Disclaimer',
      type: 'string',
      initialValue: 'standard',
      description: 'Existing posts without a selection keep their disclaimer in Content. Standard wording is managed in Settings.',
      options: {list: [
        {title: 'Standard disclaimer (from Settings)', value: 'standard'},
        {title: 'Custom disclaimer', value: 'custom'},
        {title: 'None', value: 'none'},
      ], layout: 'radio'},
    }),
    defineField({
      name: 'customDisclaimer',
      title: 'Custom disclaimer',
      type: 'blockContent',
      description: 'The website adds the Disclaimer heading.',
      hidden: ({document}) => document?.disclaimerMode !== 'custom',
      validation: (rule) => rule.custom((value, context) =>
        context.document?.disclaimerMode === 'custom' && (!Array.isArray(value) || !value.length)
          ? 'Add the custom disclaimer or choose another option.' : true),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'attachments',
      title: 'Downloads',
      description: 'Optional files readers can download, such as a PDF or study notes.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'file',
          title: 'Downloadable file',
          options: {storeOriginalFilename: true},
          validation: (rule) => rule.required().assetRequired(),
          fields: [
            defineField({
              name: 'label',
              title: 'Download title',
              type: 'string',
              description: 'For example: Download the study guide',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.coverImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],
  // List preview configuration. https://www.sanity.io/docs/previews-list-views
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, authorFirstName, authorLastName, date}) {
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
