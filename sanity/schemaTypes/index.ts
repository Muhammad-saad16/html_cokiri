

import {hero} from './documents/hero'
import {program} from './documents/program'
import {event} from './documents/event'
import {carousel} from './documents/carousel'
import {video} from './documents/video'
import {book} from './documents/book'
import {testimonial} from './documents/testimonial'
import {galleryImage} from './documents/galleryImage'
import {personalityVisit} from './documents/personalityVisit'

import {homepage} from './singletons/homepage'
import {about} from './singletons/about'
import {contact} from './singletons/contact'
import {siteSettings} from './singletons/siteSettings'
import {preFooter} from './singletons/preFooter'

export const schemaTypes = [
  homepage,
  about,
  contact,
  siteSettings,
  preFooter,

  hero,
  program,
  event,
  carousel,
  video,
  book,
  testimonial,
  galleryImage,
  personalityVisit,
]