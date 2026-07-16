import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('homepage').title('Homepage'),
      S.documentTypeListItem('about').title('About Page'),
      S.documentTypeListItem('contact').title('Contact Page'),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
      S.documentTypeListItem('preFooter').title('Pre Footer'),

      S.divider(),

      S.documentTypeListItem('hero').title('Hero Slider'),
      S.documentTypeListItem('program').title('Programs'),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('carousel').title('Carousel'),
      S.documentTypeListItem('video').title('Videos'),
      S.documentTypeListItem('book').title('Books'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])