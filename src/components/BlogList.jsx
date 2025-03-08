import BlogCard from './BlogCard';

const BlogList = ({ posts }) => {
    console.log("222 posts", posts)
  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
