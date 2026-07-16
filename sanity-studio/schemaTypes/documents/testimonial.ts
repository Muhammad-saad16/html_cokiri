import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'message',
      title: 'Testimonial',
      type: 'text',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 5,
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