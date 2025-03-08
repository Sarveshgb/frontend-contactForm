import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitContactForm } from '../services/formSubmission';
import Loading from './Loading';
import FormSuccess from './FormSuccess';
import '../styles/contact.css';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        'Invalid phone number'
      ),
    subject: Yup.string()
      .required('Please select a subject'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      await submitContactForm(values);
      setFormSubmitted(true);
      resetForm();
    } catch (error) {
      setSubmitError(
        error.message || 'There was an error submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return <FormSuccess />;
  }

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <p className="form-description">
        Have questions or need assistance? Fill out the form below and we'll get back to you soon.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, errors, touched }) => (
          <Form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <Field 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Your full name"
                className={errors.name && touched.name ? 'error-input' : ''}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                placeholder="your.email@example.com"
                className={errors.email && touched.email ? 'error-input' : ''}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <Field 
                type="text" 
                id="phone" 
                name="phone" 
                placeholder="(123) 456-7890"
                className={errors.phone && touched.phone ? 'error-input' : ''}
              />
              <ErrorMessage name="phone" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <Field 
                as="select" 
                id="subject" 
                name="subject"
                className={errors.subject && touched.subject ? 'error-input' : ''}
              >
                <option value="" disabled>Select a subject</option>
                <option value="coach">Coach Inquiry</option>
                <option value="institute">Institute/Organisation</option>
                <option value="trainee">Trainee/Coach</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="subject" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <Field 
                as="textarea" 
                id="message" 
                name="message" 
                placeholder="Your message here..."
                rows="5"
                className={errors.message && touched.message ? 'error-input' : ''}
              />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>

            {submitError && <div className="form-error">{submitError}</div>}

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting || !(isValid && dirty)}
            >
              {isSubmitting ? <Loading /> : 'Send Message'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;