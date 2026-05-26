<<<<<<< HEAD
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Briefcase, GraduationCap, Globe, Sparkles, ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { PROFILE, BIOS } from "@/config/profile";
import profileImg from "@/assets/profile/Fotojaya.jpeg";
import cvPdf from "@/assets/files/cv_pdf/CV Jaya Pratama.pdf";

const About = () => {
  const achievements = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "15+",
      description: "Projects Completed",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "3+",
      description: "Years Experience",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "10+",
      description: "Certifications",
    },
  ];

  const interests = [
    "Web Development",
    "Full Stack Architecture",
    "Cloud Computing",
    "DevOps & Automation",
    "Open Source",
    "AI/ML Applications",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto pb-20">
      {/* Header */}
      <ScrollAnimation>
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-gray-400 text-lg">
            A passionate developer building the future, one line of code at a time.
          </p>
        </div>
      </ScrollAnimation>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Left Column - Image */}
        <ScrollAnimation>
          <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* Right Column - Content */}
        <ScrollAnimation>
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Bio */}
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                {BIOS.long}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="space-y-3 py-6 border-t border-b border-white/10">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-2">
                {[
                  { label: "Location", value: PROFILE.location },
                  { label: "Timezone", value: PROFILE.timezone },
                  { label: "Email", value: PROFILE.email.split('@')[0] + '...' },
                  { label: "Phone", value: PROFILE.phone },
                ].map((fact, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-gray-400">{fact.label}</span>
                    <span className="text-white font-medium">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex gap-3 pt-4">
              <a
                href={cvPdf}
                download
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
              >
                <span>Download CV</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-300 group"
              >
                <span>Get in Touch</span>
              </Link>
            </div>
          </motion.div>
        </ScrollAnimation>
      </div>

      {/* Achievements */}
      <ScrollAnimation>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8">Key Achievements</h3>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
              >
                <div className="flex justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                  {achievement.icon}
                </div>
                <p className="text-3xl font-bold gradient-text mb-2">
                  {achievement.title}
                </p>
                <p className="text-gray-400">{achievement.description}</p>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollAnimation>

      {/* Interests */}
      <ScrollAnimation>
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8">Interests & Passions</h3>
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {interests.map((interest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
                  {interest}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollAnimation>

      {/* Call to Action */}
      <ScrollAnimation>
        <motion.div
          className="text-center py-12 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you'd like to collaborate!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

export default About;
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { aboutAPI } from '../services/api';

export default function About() {
  const [formData, setFormData] = useState({
    bio_short: '',
    bio_long: '',
    location: '',
    timezone: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await aboutAPI.get();
      if (response.data) {
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await aboutAPI.save(formData);
      alert('About updated successfully!');
    } catch (error) {
      console.error('Error saving about:', error);
      alert('Error saving about');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-4xl font-bold text-white">About Section</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 border border-gray-700 space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Short Bio</label>
            <textarea
              name="bio_short"
              value={formData.bio_short}
              onChange={handleChange}
              placeholder="Short biography"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-20"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Long Bio</label>
            <textarea
              name="bio_long"
              value={formData.bio_long}
              onChange={handleChange}
              placeholder="Detailed biography"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-32"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your location"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Timezone</label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                placeholder="UTC+7"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+62 xxx xxxx xxxx"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
>>>>>>> 860324800f4424f00784c63bd8f8713db7790ba5
