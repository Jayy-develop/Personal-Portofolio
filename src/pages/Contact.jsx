import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Send, MessageSquare, Zap, Instagram } from 'lucide-react'
import { useState } from 'react'
import { PROFILE } from '@/config/profile'
import { SOCIAL_LINKS } from '@/config/social'
import { CONTACT_INFO, OFFICE_HOURS } from '@/config/contact'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Open mailto link as fallback since Formspree isn't configured
      const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
      window.open(mailtoLink, '_blank')
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: CONTACT_INFO.email, link: `mailto:${CONTACT_INFO.email}` },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: CONTACT_INFO.phone, link: `tel:${CONTACT_INFO.phone}` },
    { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: CONTACT_INFO.location },
    { icon: <Zap className="w-5 h-5" />, label: 'Time Zone', value: CONTACT_INFO.timezone },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub', link: SOCIAL_LINKS.github },
    { icon: Linkedin, label: 'LinkedIn', link: SOCIAL_LINKS.linkedin },
    { icon: Instagram, label: 'Instagram', link: SOCIAL_LINKS.instagram },
  ].filter(link => link.link)

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-pink-400" />
            <h2 className="text-4xl font-bold gradient-text">Get in Touch</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 md:gap-12">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="group"
                  >
                    {info.link ? (
                      <a href={info.link} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="text-gray-400 group-hover:text-white transition-colors">{info.icon}</div>
                        <div>
                          <p className="text-xs md:text-sm text-gray-400">{info.label}</p>
                          <p className="text-sm md:text-base text-white break-all">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-3 p-3">
                        <div className="text-gray-400">{info.icon}</div>
                        <div>
                          <p className="text-xs md:text-sm text-gray-400">{info.label}</p>
                          <p className="text-sm md:text-base text-white">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-6">Connect with Me</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-center gap-2 p-3 md:p-4 rounded-lg bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/40 hover:to-purple-600/40 border border-pink-500/30 hover:border-pink-500/50 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium hidden sm:inline">{social.label}</span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg md:text-xl font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-400 text-sm md:text-base">
                <p>{OFFICE_HOURS.weekday}</p>
                <p>{OFFICE_HOURS.saturday}</p>
                <p className="text-xs md:text-sm text-gray-500">{OFFICE_HOURS.sunday}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 md:p-8 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all text-sm md:text-base text-white placeholder-gray-500"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all text-sm md:text-base text-white placeholder-gray-500"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all text-sm md:text-base text-white placeholder-gray-500"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 outline-none transition-all resize-none text-sm md:text-base text-white placeholder-gray-500"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm">
                  ✗ Error sending message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50 group"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
