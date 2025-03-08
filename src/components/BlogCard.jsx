import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    console.log("post",post)
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate text for preview
  const truncate = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <article className="blog-card">
      <div className="blog-card-image">
        <span className="blog-category">{post.category}</span>
      </div>
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="blog-date">{formatDate(post.publishDate)}</span>
          <span className="blog-author">By {post.author}</span>
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{truncate(post.body)}</p>
        <Link to={`/blog/${post.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;