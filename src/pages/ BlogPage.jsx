import { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import BlogFilter from '../components/BlogFilter';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { fetchBlogPosts } from '../services/api';
import '../styles/blog.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: '',
    searchTerm: ''
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data);
        setFilteredPosts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, posts]);

  const applyFilters = () => {
    let result = [...posts];

    // Apply category filter
    if (filters.category) {
      result = result.filter(post => post.category === filters.category);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const today = new Date();
      let filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          filterDate = today;
          break;
        case 'thisWeek':
          filterDate.setDate(today.getDate() - 7);
          break;
        case 'thisMonth':
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case 'thisYear':
          filterDate.setFullYear(today.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      result = result.filter(post => {
        const postDate = new Date(post.publishDate);
        return postDate >= filterDate;
      });
    }

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(searchLower) || 
          post.body.toLowerCase().includes(searchLower)
      );
    }

    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

 
  const handleSearch = (term) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: term, // Update search term filter immediately
    }));
  };
  const handleResetFilters = () => {
    setFilters({
      category: '',
      dateRange: '',
      searchTerm: ''
    });
  };

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="blog-page-loading">
        <Loading />
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Our Blog</h1>
        <p className="blog-description">
          Discover the latest insights, tips, and stories curated for students, 
          college graduates, and career changers.
        </p>
      </div>

      <div className="blog-controls">
        <SearchBar onSearch={handleSearch} initialValue={filters.searchTerm} />
        <BlogFilter 
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="no-posts">
          <h3>No posts found matching your criteria</h3>
          <button onClick={handleResetFilters} className="reset-button">
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <BlogList posts={currentPosts} />
          
          <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={filteredPosts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default BlogPage;