import {defineField, defineType} from 'sanity'

export const preFooter = defineType({
  name: 'preFooter',
  title: 'Pre Footer',
  type: 'document',

  fields: [
    defineField({
      name: 'researchAreas',
      title: 'Research Areas',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'studentServices',
      title: 'Student Services',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'community',
      title: 'Community',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
      initialValue: 'Institute Contact',
    }),

    defineField({
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),

    defineField({
      name: 'logo',
      title: 'Watermark Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Pre Footer',
      }
    },
  },
})