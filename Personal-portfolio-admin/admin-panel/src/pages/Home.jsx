import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Copy, Check, FileDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAbout } from "@/services/portfolioApi";
import cvPdf from "@/assets/files/cv_pdf/CV Jaya Pratama.pdf";

const Home = () => {
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAbout();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const copyToClipboard = async () => {
    try {
      const email = profile?.email || 'jayapenting92@gmail.com';
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
      <motion.div
        className="text-center relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-block"
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ✨ Welcome to my portfolio
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 relative tracking-tighter"
        >
          <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
            {profile?.name || loading ? (loading ? 'Loading...' : 'Jaya Pratama') : profile?.name}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-gray-300"
        >
          {profile?.title || 'Full Stack Developer'} & Software Engineer
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed"
        >
          {profile?.bio || 'Full Stack Developer crafting modern web applications with React, Node.js, and cutting-edge technologies.'}
        </motion.p>

        {/* Location & Role */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 text-gray-300 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Based in {profile?.location || 'Indonesia'}
          </span>
          <span className="hidden sm:block text-gray-600">•</span>
          <span>{profile?.timezone || 'WIB (UTC+7)'}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Get in Touch</span>
              </>
            )}
          </button>

          <a
            href={cvPdf}
            download
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-300 group"
            aria-label="Download CV"
          >
            <FileDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Download CV</span>
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-16"
        >
          {profile?.socialLinks?.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group hover:shadow-lg"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          )}
          {profile?.socialLinks?.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group hover:shadow-lg"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 group hover:shadow-lg"
              aria-label="Email"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="text-gray-400 text-center text-sm">
            <p className="mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>

        {/* Stats Section - Optional */}
        <motion.div
          variants={itemVariants}
          className="mt-20 pt-20 border-t border-white/10 grid grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {profile?.stats?.projects || '3'}
            </div>
            <p className="text-sm text-gray-400 mt-2">Projects</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {profile?.stats?.internships || '1'}
            </div>
            <p className="text-sm text-gray-400 mt-2">Internships</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {profile?.stats?.gpa || '3.75'}
            </div>
            <p className="text-sm text-gray-400 mt-2">GPA</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
