export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  isVisible: boolean;
  order: number;
  createdAt: Date;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  isVisible: boolean;
  order: number;
}

export interface Profile {
  id: number;
  name: string;
  tagline: string;
  title: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  heroImage?: string;
  aboutImage?: string;
}

export interface Tool {
  id: number;
  name: string;
  category: string;
  isVisible: boolean;
  order: number;
}
