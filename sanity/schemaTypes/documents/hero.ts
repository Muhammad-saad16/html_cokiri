import {defineField, defineType} from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Slider',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Slide Subtitle',
      type: 'text',
    }),

    defineField({
      name: 'image',
      title: 'Slider Image',
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
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Button Link',
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
      media: 'image',
    },
  },
})