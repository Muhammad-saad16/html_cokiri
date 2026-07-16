import type { Image, PortableTextBlock } from "sanity";

import { client } from "./client";

const REVALIDATE_SECONDS = 60;

function fetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

export interface SanityProgram {
  _id: string;
  title: string;
  slug?: string;
  image?: Image;
  alt?: string;
  shortDescription: string;
  duration: string;
  eligibility: string;
  audience?: string;
  format?: string;
  applyLink?: string;
  isFeatured: boolean;
}

export interface SanityEvent {
  _id: string;
  title: string;
  image: Image;
  alt?: string;
  eventDate?: string;
  time?: string;
  location?: string;
  description?: string;
}

export interface SanityGalleryImage {
  _id: string;
  title?: string;
  image: Image;
  alt: string;
}

export interface SanityPersonalityVisit {
  _id: string;
  personName?: string;
  image: Image;
  alt: string;
}

export interface SanityTestimonial {
  _id: string;
  name: string;
  designation?: string;
  photo?: Image;
  message: string;
  rating: number;
}

export interface SanityVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: Image;
  description?: string;
}

export interface SanityBook {
  _id: string;
  title: string;
  author?: string;
  cover: Image;
  description?: string;
  pdf?: { asset: { url: string } };
}

export interface SanityHeroSlide {
  _id: string;
  title: string;
  subtitle?: string;
  image: Image;
  alt: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface SanityCarouselSlide {
  _id: string;
  title: string;
  image: Image;
  alt: string;
  caption?: string;
}

export interface SanityHomepage {
  heroSectionTitle?: string;
  programSectionTitle?: string;
  videoSectionTitle?: string;
  publicationSectionTitle?: string;
  testimonialSectionTitle?: string;
}

export interface SanitySiteSettings {
  siteName?: string;
  tagline?: string;
  logo?: Image;
  favicon?: Image;
}

export interface SanityPreFooter {
  researchAreas?: string[];
  studentServices?: string[];
  community?: string[];
  contactTitle?: string;
  contactDescription?: string;
  email?: string;
  phone?: string;
  logo?: Image;
}

export interface SanityAboutPillar {
  title: string;
  subtitle?: string;
  description?: string;
}

export interface SanityAbout {
  title?: string;
  description?: PortableTextBlock[];
  image?: Image;
  missionTitle?: string;
  missionDescription?: string;
  visionTitle?: string;
  visionDescription?: string;
  pillars?: SanityAboutPillar[];
}

export interface SanityContact {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  mapUrl?: string;
}

const ACTIVE_ORDERED = (orderField: string) =>
  `isActive == true] | order(${orderField} asc)`;

export function getPrograms() {
  return fetch<SanityProgram[]>(
    `*[_type == "program" && ${ACTIVE_ORDERED("displayOrder")} {
      _id, title, "slug": slug.current, image, alt, shortDescription,
      duration, eligibility, audience, format, applyLink, isFeatured
    }`
  );
}

export function getEvents() {
  return fetch<SanityEvent[]>(
    `*[_type == "event" && ${ACTIVE_ORDERED("order")} {
      _id, title, image, alt, eventDate, time, location, description
    }`
  );
}

export function getFeaturedEvents(limit = 3) {
  return fetch<SanityEvent[]>(
    `*[_type == "event" && ${ACTIVE_ORDERED("order")} [0...$limit] {
      _id, title, image, alt, eventDate, time, location, description
    }`,
    { limit }
  );
}

export function getGalleryImages() {
  return fetch<SanityGalleryImage[]>(
    `*[_type == "galleryImage" && ${ACTIVE_ORDERED("displayOrder")} {
      _id, title, image, alt
    }`
  );
}

export function getPersonalityVisits() {
  return fetch<SanityPersonalityVisit[]>(
    `*[_type == "personalityVisit" && ${ACTIVE_ORDERED("displayOrder")} {
      _id, personName, image, alt
    }`
  );
}

export function getTestimonials() {
  return fetch<SanityTestimonial[]>(
    `*[_type == "testimonial" && ${ACTIVE_ORDERED("order")} {
      _id, name, designation, photo, message, rating
    }`
  );
}

export function getVideos() {
  return fetch<SanityVideo[]>(
    `*[_type == "video" && ${ACTIVE_ORDERED("order")} {
      _id, title, youtubeUrl, thumbnail, description
    }`
  );
}

export function getBooks() {
  return fetch<SanityBook[]>(
    `*[_type == "book" && ${ACTIVE_ORDERED("order")} {
      _id, title, author, cover, description, pdf { asset -> { url } }
    }`
  );
}

export function getHeroSlides() {
  return fetch<SanityHeroSlide[]>(
    `*[_type == "hero" && ${ACTIVE_ORDERED("displayOrder")} {
      _id, title, subtitle, image, alt, buttonText, buttonLink
    }`
  );
}

export function getCarouselSlides() {
  return fetch<SanityCarouselSlide[]>(
    `*[_type == "carousel" && ${ACTIVE_ORDERED("displayOrder")} {
      _id, title, image, alt, caption
    }`
  );
}

export function getHomepage() {
  return fetch<SanityHomepage | null>(`*[_type == "homepage"][0]`);
}

export function getSiteSettings() {
  return fetch<SanitySiteSettings | null>(`*[_type == "siteSettings"][0]`);
}

export function getPreFooter() {
  return fetch<SanityPreFooter | null>(`*[_type == "preFooter"][0]`);
}

export function getAbout() {
  return fetch<SanityAbout | null>(`*[_type == "about"][0]`);
}

export function getContact() {
  return fetch<SanityContact | null>(`*[_type == "contact"][0]`);
}
