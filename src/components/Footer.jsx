const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CareerCraft</h3>
            <p>Empowering students and professionals to craft their ideal career path.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul className="footer-links">
              <li><a href="#">Career Resources</a></li>
              <li><a href="#">Student Guides</a></li>
              <li><a href="#">Professional Development</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <ul className="footer-links">
              <li><a href="#">Twitter</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
          
          <div className="copyright">
            &copy; {currentYear} CareerCraft. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  