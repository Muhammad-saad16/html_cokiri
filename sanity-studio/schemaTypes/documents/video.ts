import {defineField, defineType} from 'sanity'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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