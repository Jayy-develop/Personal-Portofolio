import projects from './projects';
import experience from './experience';
import certificates from './certificates';

/**
 * Centralized profile configuration
 * Update this file to customize your portfolio branding
 */

const yearsExperience = (() => {
  const years = experience
    .map(item => (item.duration || '').match(/\d{4}/g) || [])
    .flat()
    .map(Number)
    .filter(Boolean);

  if (!years.length) return '0+';

  const startYear = Math.min(...years);
  const currentYear = new Date().getFullYear();
  const diff = Math.max(currentYear - startYear + 1, 1);
  return `${diff}+`;
})();

export const PROFILE = {
  name: 'Jaya Pratama',
  title: 'Full Stack Developer',
  subtitle: 'I design & code for web',
  bio: 'Software Developer specializing in Full Stack Development with expertise in modern web technologies.',
  description: 'Passionate full-stack developer with expertise in building modern web applications. I transform ideas into elegant digital solutions.',
  
  // Location & Contact
  location: 'Indonesia',
  email: 'jayapenting92@gmail.com',
  phone: '+6288706497974',
  whatsapp: '+6288706497974',
  timezone: 'WIB (UTC+7)',
  
  // Academic
  education: {
    college: 'Bengal College of Engineering and Technology',
    collegeLocation: 'Durgapur, WB, India',
    degree: 'B.Tech (Computer Science and Engineering)',
    cgpa: '8.48',
    graduationYear: 2024,
  },
  
  // Stats
  stats: {
    projects: `${projects.length}+`,
    experienceYears: yearsExperience,
    internships: `${experience.length}+`,
    certifications: `${certificates.length}+`,
    gpa: '3.75',
  },
  
  // Keywords for SEO
  keywords: ['Jaya Pratama', 'Full Stack Developer', 'MERN Stack', 'React Developer', 'Node.js', 'Next.js', 'TypeScript', 'Indonesia', 'Web Developer'],
};

// Office hours
export const OFFICE_HOURS = {
  weekday: 'Monday - Friday: 9:00 AM - 6:00 PM (WIB)',
  saturday: 'Saturday: 10:00 AM - 2:00 PM (WIB)',
  sunday: 'Sunday: Available for urgent matters',
};

// Short bio for different contexts
export const BIOS = {
  short: 'Full Stack Developer crafting modern web applications with React, Node.js, and cutting-edge technologies.',
  medium: 'I\'m Jaya Pratama, a full-stack developer passionate about building performant and user-friendly web applications. With expertise in MERN stack and modern web technologies, I transform ideas into elegant digital solutions.',
  long: 'Hi! I\'m Jaya Pratama, a passionate full-stack developer with expertise in building modern web applications. My journey in tech started during college, where I discovered my love for creating innovative solutions through code. I completed my B.Tech in Computer Science with a strong academic record while actively engaging in real-world projects and internships. I specialize in React, Node.js, and modern web technologies, with a keen interest in creating performant and user-friendly applications.',
};
