import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Heading for the "Our Story" intro section',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Intro paragraphs shown next to the featured image',
    }),

    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    }),

    defineField({
      name: 'missionDescription',
      title: 'Mission Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
    }),

    defineField({
      name: 'visionDescription',
      title: 'Vision Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      description: 'The core pillars of service (e.g. Ilm, Da\'wah, Islah, Khidmah)',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'subtitle'},
          },
        },
      ],
    }),
  ],
})