/**
 * Social media and external links
 */

export const SOCIAL_LINKS = {
  github: 'https://github.com/Jayy-develop',
  linkedin: 'https://linkedin.com/in/jayapratama',
  twitter: '',
  instagram: 'https://www.instagram.com/jay_prtma/',
  email: 'jayapenting92@gmail.com',
  whatsapp: 'https://api.whatsapp.com/send?phone=6288706497974',
  cv: '/files/CV_Jaya_Pratama.pdf', // Update this path to your CV
};

export const SOCIAL_INFO = [
  {
    name: 'GitHub',
    icon: 'Github',
    url: SOCIAL_LINKS.github,
    label: 'GitHub Profile',
    color: 'hover:text-gray-400',
  },
  {
    name: 'LinkedIn',
    icon: 'Linkedin',
    url: SOCIAL_LINKS.linkedin,
    label: 'LinkedIn Profile',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Instagram',
    icon: 'Instagram',
    url: SOCIAL_LINKS.instagram,
    label: 'Instagram Profile',
    color: 'hover:text-pink-400',
  },
  {
    name: 'WhatsApp',
    icon: 'MessageCircle',
    url: SOCIAL_LINKS.whatsapp,
    label: 'WhatsApp Chat',
    color: 'hover:text-green-400',
  },
];
