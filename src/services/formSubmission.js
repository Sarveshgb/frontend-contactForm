// Simulated API endpoint for form submission
export const submitContactForm = async (formData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate API call
    // In a real implementation, this would be an actual API call using fetch or axios
    return new Promise((resolve, reject) => {
      try {
        // For demo purposes, we'll log the data and always resolve successfully
        console.log('Form data submitted:', formData);
        
        // Randomly simulate an error (10% chance) for testing purposes
        if (Math.random() < 0.1) {
          throw new Error('Network error occurred');
        }
        
        resolve({
          success: true,
          message: 'Form submitted successfully'
        });
      } catch (error) {
        reject(error);
      }
    });
  };