/**
 * SEO configuration and metadata
 */

import { PROFILE, BIOS } from './profile';

export const SEO_CONFIG = {
  siteUrl: 'https://jayapratama.dev', // Update with your domain
  siteName: `${PROFILE.name} - ${PROFILE.title}`,
  locale: 'en_US',
  defaultImage: '/og-image.png', // Update with actual image
  defaultImageAlt: `${PROFILE.name} - ${PROFILE.title} Portfolio`,
};

export const PAGE_SEO = {
  '/': {
    title: `${PROFILE.name} - ${PROFILE.title} | MERN Stack Developer`,
    description: BIOS.short,
    keywords: ['Portfolio', 'Full Stack Developer', 'React', 'Node.js', ...PROFILE.keywords],
  },
  '/about': {
    title: `About - ${PROFILE.name} | ${PROFILE.title}`,
    description: `Learn more about ${PROFILE.name}, a ${PROFILE.title} specializing in MERN stack and modern web technologies.`,
    keywords: ['About', 'Developer', 'Experience', ...PROFILE.keywords],
  },
  '/projects': {
    title: `Projects - ${PROFILE.name} | Full Stack Portfolio`,
    description: `Explore full-stack web projects built by ${PROFILE.name} using React, Node.js, and modern technologies.`,
    keywords: ['Projects', 'Portfolio', 'Full Stack', 'React', 'Node.js', ...PROFILE.keywords],
  },
  '/skills': {
    title: `Skills - ${PROFILE.name} | React, Node.js, MERN Stack`,
    description: `Technical skills of ${PROFILE.name} — React, Node.js, TypeScript, and modern web development technologies.`,
    keywords: ['Skills', 'Technical', 'React', 'Node.js', 'TypeScript', ...PROFILE.keywords],
  },
  '/experience': {
    title: `Experience - ${PROFILE.name} | ${PROFILE.title}`,
    description: `Professional experience of ${PROFILE.name} including internships and projects in full stack web development.`,
    keywords: ['Experience', 'Work', 'Internships', 'Professional', ...PROFILE.keywords],
  },
  '/education': {
    title: `Education - ${PROFILE.name} | B.Tech Computer Science`,
    description: `Educational background of ${PROFILE.name} including B.Tech degree and academic achievements.`,
    keywords: ['Education', 'B.Tech', 'Computer Science', 'University', ...PROFILE.keywords],
  },
  '/certificates': {
    title: `Certificates - ${PROFILE.name} | Developer Certifications`,
    description: `Professional certifications and achievements of ${PROFILE.name} in web development and technology.`,
    keywords: ['Certificates', 'Certifications', 'Achievements', 'Professional', ...PROFILE.keywords],
  },
  '/contact': {
    title: `Contact - ${PROFILE.name} | Hire a ${PROFILE.title}`,
    description: `Get in touch with ${PROFILE.name} for projects, job opportunities, or collaborations. Based in ${PROFILE.location}.`,
    keywords: ['Contact', 'Hire', 'Collaborate', 'Email', ...PROFILE.keywords],
  },
};

/**
 * Schema.ld structured data for rich snippets
 */
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: SEO_CONFIG.siteUrl,
  email: PROFILE.email,
  jobTitle: PROFILE.title,
  image: `${SEO_CONFIG.siteUrl}/profile.jpg`,
  sameAs: [
    'https://github.com/Jayy-develop',
    'https://linkedin.com/in/jayapratama',
    'https://twitter.com/jayapratama',
    'https://instagram.com/jayapratama',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
    addressLocality: PROFILE.location,
  },
});
