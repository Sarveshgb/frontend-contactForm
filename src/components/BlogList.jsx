import BlogCard from './BlogCard';

const BlogList = ({ posts }) => {
  
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
