import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { fetchBlogPostById } from "../services/api";
// import '../styles/blog-detail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogPostById(id);
        console.log("read 333", data)
        setPost(data);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  // Format date for display


  if (loading) {
    return (
      <div className="blog-detail-loading">
        <Loading />
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!post) {
    return <ErrorMessage message="Blog post not found" />;
  }

  return (
    <div className="blog-detail">
      <Link to="/blog" className="back-link">
        &larr; Back to all posts
      </Link>

      <article className="blog-article">
        <header className="blog-header">
          <div className="blog-meta">
            <span className="blog-category">{post.category}</span>
            {/* <span className="blog-date">{formatDate(post.publishDate)}</span> */}
            {/* <span className="blog-author">By {post.author}</span> */}
          </div>
          <h1 className="blog-title">{post.title}</h1>
        </header>

        {post.thumbnail && (
          <div className="blog-featured-image">
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
            />
          </div>
        )}

        <div className="blog-content">
          {/* Render paragraphs */}
          {post.body.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags section */}
        {post.tags && post.tags.length > 0 && (
  <div className="blog-tags">
    <h3>Tags:</h3>
    <div className="tags-list">
      {post.tags.join(', ')}
    </div>
  </div>
)}

        {/* Related posts could go here */}
        
        {/* Comments section could go here */}
      </article>
    </div>
  );
};

export default BlogDetail;