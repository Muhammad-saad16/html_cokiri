import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',

  fields: [
    defineField({
      name: 'heroSectionTitle',
      title: 'Hero Section Title',
      type: 'string',
    }),

    defineField({
      name: 'programSectionTitle',
      title: 'Programs Section Title',
      type: 'string',
      initialValue: 'Latest Events and Programs',
    }),

    defineField({
      name: 'videoSectionTitle',
      title: 'Videos Section Title',
      type: 'string',
      initialValue: 'Videos & Lectures',
    }),

    defineField({
      name: 'publicationSectionTitle',
      title: 'Publications Section Title',
      type: 'string',
      initialValue: 'Publications',
    }),

    defineField({
      name: 'testimonialSectionTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      initialValue: 'Words of Honor',
    }),
  ],
})