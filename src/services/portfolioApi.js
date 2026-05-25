import axios from 'axios';

// Backend API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Projects
export const getProjects = async () => {
  try {
    const response = await apiClient.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Education
export const getEducation = async () => {
  try {
    const response = await apiClient.get('/education');
    return response.data;
  } catch (error) {
    console.error('Error fetching education:', error);
    return [];
  }
};

// Experience
export const getExperience = async () => {
  try {
    const response = await apiClient.get('/experience');
    return response.data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
};

// Skills
export const getSkills = async () => {
  try {
    const response = await apiClient.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

// Certificates
export const getCertificates = async () => {
  try {
    const response = await apiClient.get('/certificates');
    return response.data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
};

// About
export const getAbout = async () => {
  try {
    const response = await apiClient.get('/about');
    return response.data;
  } catch (error) {
    console.error('Error fetching about:', error);
    return {};
  }
};

export default apiClient;
