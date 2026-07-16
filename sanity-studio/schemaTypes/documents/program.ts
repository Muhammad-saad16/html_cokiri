import {defineField, defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'image',
      title: 'Program Image',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),

    defineField({
      name: 'isFeatured',
      title: 'Featured Program',
      type: 'boolean',
      initialValue: false,
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
      title: 'title',
      media: 'image',
    },
  },
})