<<<<<<< HEAD
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { getCertificates } from "@/services/portfolioApi";

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        setCertificates(data || []);
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  const categories = [...new Set(certificates.map(c => c.issuer))];

  const filteredCertificates = selectedCategory
    ? certificates.filter(c => c.issuer === selectedCategory)
    : certificates;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <ScrollAnimation>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl font-bold gradient-text">Certificates & Achievements</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            Professional certifications and achievements earned through continuous learning and skill development.
          </p>
        </div>
      </ScrollAnimation>

      {/* Filter Buttons */}
      {categories.length > 0 && (
        <ScrollAnimation>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <p className="text-sm font-semibold text-gray-300">Filter by Issuer:</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                All ({certificates.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      )}

      {/* Certificates Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray-400">Loading certificates...</div>
        ) : filteredCertificates.map((cert, index) => (
          <ScrollAnimation key={cert.id}>
            <motion.div
              variants={itemVariants}
              className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10 flex flex-col"
            >
              {/* Image Badge */}
              {cert.image && (
                <div className="mb-4 h-24 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg overflow-hidden border border-yellow-500/30 flex items-center justify-center">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              {/* Issuer Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  {cert.issuer}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-300 transition-colors leading-tight">
                  {cert.title}
                </h3>

                {/* Date */}
                {cert.issued_date && (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 pb-4 border-b border-white/10">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{cert.issued_date}</span>
                  </div>
                )}
              </div>

              {/* View Certificate Button */}
              {cert.credential_url && (
                <motion.a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-all duration-300 group/link hover:shadow-lg hover:shadow-yellow-500/50"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </motion.a>
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </motion.div>

      {/* Empty State */}
      {!loading && filteredCertificates.length === 0 && (
        <ScrollAnimation>
          <div className="text-center py-20">
            <Award className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No certificates found in this category.</p>
          </div>
        </ScrollAnimation>
      )}

      {/* Stats */}
      <ScrollAnimation>
        <motion.div
          className="mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                {certificates.length}
              </div>
              <p className="text-gray-400">Total Certificates</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                {categories.length}
              </div>
              <p className="text-gray-400">Categories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">
                100%
              </div>
              <p className="text-gray-400">Completion Rate</p>
            </div>
          </div>
        </motion.div>
      </ScrollAnimation>
    </div>
  );
};

export default Certificates;
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { certificateAPI } from '../services/api';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: '',
    credential_url: '',
    issued_date: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await certificateAPI.getAll();
      setCertificates(response.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      alert('Error loading certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await certificateAPI.update(editingId, formData);
        alert('Certificate updated!');
      } else {
        await certificateAPI.create(formData);
        alert('Certificate created!');
      }

      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        issuer: '',
        image: '',
        credential_url: '',
        issued_date: '',
      });
      fetchCertificates();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await certificateAPI.delete(id);
        alert('Certificate deleted!');
        fetchCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
        alert('Error deleting certificate');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-4xl font-bold text-white">Certificates Management</h1>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: '',
                issuer: '',
                image: '',
                credential_url: '',
                issued_date: '',
              });
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Certificate
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Certificate' : 'Add Certificate'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Certificate Title"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="Issuing Organization"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="issued_date"
                  value={formData.issued_date}
                  onChange={handleChange}
                  placeholder="Issue Date (e.g., Jan 2024)"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Certificate Image/Badge URL"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <input
                type="url"
                name="credential_url"
                value={formData.credential_url}
                onChange={handleChange}
                placeholder="Credential URL (link to verify)"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      issuer: '',
                      image: '',
                      credential_url: '',
                      issued_date: '',
                    });
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List */}
        <div className="grid gap-6">
          {certificates.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400 border border-gray-700">
              No certificates. Add one to get started!
            </div>
          ) : (
            certificates.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-green-400 text-sm">{item.issuer}</p>
                    {item.issued_date && <p className="text-gray-400 text-sm mt-1">Issued: {item.issued_date}</p>}
                    {item.credential_url && (
                      <a
                        href={item.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm hover:underline mt-2 inline-block"
                      >
                        View Credential →
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
>>>>>>> 860324800f4424f00784c63bd8f8713db7790ba5
