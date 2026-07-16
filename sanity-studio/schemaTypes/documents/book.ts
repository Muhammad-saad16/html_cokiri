import {defineField, defineType} from 'sanity'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'cover',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'pdf',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),

    defineField({
      name: 'order',
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
})