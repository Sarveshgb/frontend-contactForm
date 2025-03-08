import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Career Resources for Every Stage of Your Journey</h1>
          <p>
            From student resources to professional coaching, we're here to help you navigate your career path.
          </p>
        </div>
      </section>
      
      <section className="content-section">
        <h2>Explore Our Resources</h2>
        <p>Check out our latest blog posts and resources for different career stages.</p>
        
        <div className="audience-cards">
          <div className="audience-card">
            <h3>For Students (13-18)</h3>
            <p>Early career guidance and educational planning resources.</p>
            <Link to="/blog" className="card-link">Learn More</Link>
          </div>
          
          <div className="audience-card">
            <h3>For College Students (18-22)</h3>
            <p>Internship opportunities, resume building and career path exploration.</p>
            <Link to="/blog" className="card-link">Learn More</Link>
          </div>
          
          <div className="audience-card">
            <h3>For Career Changers (23-40)</h3>
            <p>Skill development, industry transitions and professional growth.</p>
            <Link to="/blog" className="card-link">Learn More</Link>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <h2>Need Personalized Guidance?</h2>
        <p>Get in touch with our team of career coaches and advisors.</p>
        <Link to="/contact" className="cta-button">Contact Us</Link>
      </section>
    </div>
  );
};

export default HomePage;
