import axios from 'axios';

// Base URL for the dummy API
const API_BASE_URL = 'https://dummyjson.com';

// Function to fetch blog posts
export const fetchBlogPosts = async () => {
  try {
    // Fetch posts from the dummyjson API
    const response = await axios.get(`${API_BASE_URL}/posts`);
    // console.log(response)
    if (!response.data || !response.data.posts) {
      throw new Error('Invalid data format received');
    }
    
    // Add additional fields needed for our UI
    const posts = response.data.posts.map(post => ({
      ...post,
      // Generate a random category from our predefined list
      category: getRandomCategory(),
      // Generate a random publish date within the last year
      publishDate: getRandomDate(),
      // Add author name
      author: getRandomAuthor(),
    }));
    
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

// Helper function to get a random category
const getRandomCategory = () => {
  const categories = [
    'Career Development', 
    'Study Tips', 
    'Technology', 
    'Education',
    'Student Life',
    'Job Search',
    'Skill Building',
    'Industry Insights'
  ];
  
  return categories[Math.floor(Math.random() * categories.length)];
};

// Helper function to get a random date within the last year
const getRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const timestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  
  return new Date(timestamp).toISOString();
};

// Helper function to get a random author name
const getRandomAuthor = () => {
  const authors = [
    'Emma Thompson',
    'James Wilson',
    'Sarah Parker',
    'Michael Lee',
    'Jessica Brown',
    'Daniel Smith',
    'Rachel Green',
    'David Miller'
  ];
  
  return authors[Math.floor(Math.random() * authors.length)];
};

export const fetchBlogPostById = async (id) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
   
      return data;

    } catch (error) {
      console.error(`Error fetching blog post with ID ${id}:`, error);
      throw error;
    }
  };
