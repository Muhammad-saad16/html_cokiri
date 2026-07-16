import type {StructureResolver} from 'sanity/structure'

export const SINGLETON_TYPES = new Set([
  'homepage',
  'about',
  'contact',
  'siteSettings',
  'preFooter',
])

const singletonListItem = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .id(type)
    .title(title)
    .child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singletonListItem(S, 'homepage', 'Homepage'),
      singletonListItem(S, 'about', 'About Page'),
      singletonListItem(S, 'contact', 'Contact Page'),
      singletonListItem(S, 'siteSettings', 'Site Settings'),
      singletonListItem(S, 'preFooter', 'Pre Footer'),

      S.divider(),

      S.documentTypeListItem('hero').title('Hero Slider'),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('carousel').title('Carousel'),
      S.documentTypeListItem('video').title('Videos'),
      S.documentTypeListItem('book').title('Books'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
      S.documentTypeListItem('personalityVisit').title('Personality Visits'),
    ])