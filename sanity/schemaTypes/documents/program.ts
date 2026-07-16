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
    }),

    defineField({
      name: 'alt',
      title: 'Image Alt Text',
      type: 'string',
    }),

    defineField({
      name: 'shortDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 1 Year, 6 Months, Ongoing (Weekly)',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'eligibility',
      title: 'Eligibility',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
    }),

    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'e.g. On-campus, Online, On-campus (Evenings)',
    }),

    defineField({
      name: 'applyLink',
      title: 'Apply Link',
      type: 'string',
      description: 'Relative or absolute URL for the "Apply Now" button',
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