import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
  ],
})