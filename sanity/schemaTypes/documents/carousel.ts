import {defineField, defineType} from 'sanity'

export const carousel = defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Carousel Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
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
      title: 'title',
      subtitle: 'caption',
      media: 'image',
    },
  },
})