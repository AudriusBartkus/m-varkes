// REPLACE THIS WITH YOUR APPS SCRIPT WEB APP URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSdlP9zagu38lkJpBNf6Daw6qL4dPCHoMHRYpuMPw78m6I_KrdwsvTDbZi-em9vmx8/exec';

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const button = this.querySelector('button');
  const statusDiv = document.getElementById('status');
  
  button.disabled = true;
  button.textContent = 'Sending...';
  statusDiv.innerHTML = '';
  
  const formData = {
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    message: this.message.value
  };
  
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    // With no-cors, we can't read the response, but if no error is thrown, it worked
    statusDiv.innerHTML = '<div class="message success">Thank you! We\'ll get back to you soon.</div>';
    this.reset();
    
  } catch (error) {
    statusDiv.innerHTML = '<div class="message error">Something went wrong. Please try again.</div>';
  } finally {
    button.disabled = false;
    button.textContent = 'Send Message';
  }
});
