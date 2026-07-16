import {defineField, defineType} from 'sanity'

export const personalityVisit = defineType({
  name: 'personalityVisit',
  title: 'Personality Visit',
  type: 'document',

  fields: [
    defineField({
      name: 'personName',
      title: 'Person Name',
      type: 'string',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Image Alt Text',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),

    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'personName',
      media: 'image',
    },
  },
})
