import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <h1>Get in Touch</h1>
        <p>
          Have questions or need assistance? We're here to help! 
          Fill out the form below and our team will get back to you shortly.
        </p>
      </div>
      
      <ContactForm />
    </div>
  );
};

export default ContactPage;