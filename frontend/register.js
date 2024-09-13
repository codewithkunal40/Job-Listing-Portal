const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Basic validation (you can add more checks)
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name === '' || email === '') {
    alert('Please fill in all required fields.');
    return;
  }

  // Send form data to server (replace with your server-side endpoint)
  const formData = new FormData(registerForm);
  fetch('your-server-endpoint', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Handle successful registration (e.g., redirect to a login page)
      alert('Registration successful!');
    } else {
      // Handle registration errors
      alert('Registration failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});