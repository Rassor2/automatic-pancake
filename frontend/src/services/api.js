import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ==================== Categories ====================

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API}/categories/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching category:', error);
    throw error;
  }
};

// ==================== Articles ====================

export const fetchArticles = async (limit = 50, skip = 0) => {
  try {
    const response = await axios.get(`${API}/articles`, {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchFeaturedArticles = async (limit = 3) => {
  try {
    const response = await axios.get(`${API}/articles/featured`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API}/articles/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const fetchArticlesByCategory = async (categorySlug, exclude = null, limit = 50) => {
  try {
    const params = { limit };
    if (exclude) params.exclude = exclude;
    
    const response = await axios.get(`${API}/articles/category/${categorySlug}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }
};

export const searchArticles = async (query) => {
  try {
    const response = await axios.get(`${API}/articles/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};

// ==================== Newsletter ====================

export const subscribeNewsletter = async (email, name = null) => {
  try {
    const response = await axios.post(`${API}/newsletter/subscribe`, {
      email,
      name
    });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

// ==================== Contact ====================

export const submitContactForm = async (data) => {
  try {
    const response = await axios.post(`${API}/contact`, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
