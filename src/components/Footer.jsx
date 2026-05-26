import { Link } from 'react-router-dom'
import { Code2, Github, Linkedin, Mail, Phone, Instagram } from 'lucide-react'
import { PROFILE } from '@/config/profile'
import { SOCIAL_LINKS, SOCIAL_INFO } from '@/config/social'
import { OFFICE_HOURS } from '@/config/contact'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const pageLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialIcons = [
    { icon: Github, url: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: Linkedin, url: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: Instagram, url: SOCIAL_LINKS.instagram, label: 'Instagram' },
  ].filter(social => social.url)

  const column1 = pageLinks.slice(0, 3)
  const column2 = pageLinks.slice(3, 6)
  const column3 = pageLinks.slice(6, 9)

  return (
    <footer className="relative mt-24 pt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent backdrop-blur-xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 mb-8 border-b border-white/10">
          {/* Branding */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group hover:opacity-80 transition-opacity">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code2 className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">{PROFILE.name}</span>
                <span className="text-xs text-gray-400">{PROFILE.title}</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {PROFILE.bio}
            </p>
            <div className="flex space-x-3 pt-2">
              {socialIcons.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group"
                    aria-label={`Visit ${social.label}`}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Pages</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              <div>
                {column1.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div>
                {column2.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div>
                {column3.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  aria-label={`Email ${PROFILE.name}`}
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  aria-label={`Call ${PROFILE.name}`}
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  {PROFILE.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Hours</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>{OFFICE_HOURS.weekday}</p>
              <p>{OFFICE_HOURS.saturday}</p>
              <p className="text-xs text-gray-500">{OFFICE_HOURS.sunday}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} <span className="font-semibold text-white">{PROFILE.name}</span>. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Designed & Built with <span className="text-red-500">❤️</span> by {PROFILE.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
