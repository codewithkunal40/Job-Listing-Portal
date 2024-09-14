async function searchJobs() {
    const query = document.getElementById('jobSearch').value;
  
    try {
      const response = await fetch(`http://localhost:8080/api/jobs?search=${query}`);
      const jobs = await response.json();
  
      displayJobs(jobs);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  }
  
  function displayJobs(jobs) {
    const results = document.getElementById('jobResults');
    results.innerHTML = '';
  
    jobs.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.classList.add('job-item');
      jobItem.innerHTML = `<h2>${job.title}</h2><p>${job.description}</p>`;
      results.appendChild(jobItem);
    });
  }
  

  /*job_searching_profile*/

  const jobSeekerForm = document.getElementById('jobSeekerForm');
  const resumeInput = document.getElementById('resume');
  const resumePreview = document.getElementById('resumePreview');
  const profilePictureInput = document.getElementById('profilePicture');
  const profilePicturePreview = document.getElementById('profilePicturePreview');
  const experienceContainer = document.getElementById('experience-container');
  const educationContainer = document.getElementById('education-container');
  const addExperienceButton = document.getElementById('addExperience');
  const addEducationButton = document.getElementById('addEducation');
  
  // Function to add experience fields dynamically
  function addExperienceField() {
      const experienceField = document.createElement('div');
      experienceField.innerHTML = `
          <label for="experience-company">Company:</label>
          <input type="text" name="experience-company">
          <label for="experience-position">Position:</label>
          <input type="text" name="experience-position">
          <label for="experience-start">Start Date:</label>
          <input type="date" name="experience-start">
          <label for="experience-end">End Date:</label>
          <input type="date" name="experience-end">
          <button type="button" class="remove-experience">Remove</button>
      `;
      experienceContainer.appendChild(experienceField);
  
      const removeButton = experienceField.querySelector('.remove-experience');
      removeButton.addEventListener('click', () => {
          experienceContainer.removeChild(experienceField);
      });
  }
  
  // Function to add education fields dynamically
  function addEducationField() {
      // Similar implementation to addEducationField, with appropriate labels and inputs
  }
  
  // Function to handle resume upload and preview
  function handleResumeUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          resumePreview.textContent = 'Resume: ' + file.name;
          // Store the resume data (e.g., as a base64 string)
      };
      reader.readAsDataURL(file);
  }
  
  // Function to handle profile picture upload and preview
  function handleProfilePictureUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          profilePicturePreview.innerHTML = `<img src="${reader.result}">`;
          // Store the profile picture data (e.g., as a base64 string)
      };
      reader.readAsDataURL(file);
  }
  
  // Event listeners for form submission, resume upload, profile picture upload, and dynamic field addition
  jobSeekerForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Validate form data
      // ...
  
      // Collect profile data
      const profileData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          resume: resumeData, // Replace with actual resume data
          skills: document.getElementById('skills').value.split(','),
          experience: [],
          education: [],
          profilePicture: profilePictureData // Replace with actual profile picture data
      };
  
      // Collect experience and education data
      experienceContainer.querySelectorAll('div').forEach(experienceField => {
          profileData.experience.push({
              company: experienceField.querySelector('[name="experience-company"]').value,
              position: experienceField.querySelector('[name="experience-position"]').value,
              startDate: experienceField.querySelector('[name="experience-start"]').value,
              endDate: experienceField.querySelector('[name="experience-end"]').value
          });
      });
  
      educationContainer.querySelectorAll('div').forEach(educationField => {
          // Collect education data in a similar way
      });
  
      // Store profile data
      storeProfileData(profileData);
  });
  
  resumeInput.addEventListener('change', () => {
      handleResumeUpload(resumeInput.files[0]);
  });
  
  profilePictureInput.addEventListener('change', () => {
      handleProfilePictureUpload(profilePictureInput.files[0]);
  });
  
  addExperienceButton.addEventListener('click', addExperienceField);
  addEducationButton.addEventListener('click', addEducationField);
  
  // Function to store profile data (replace with your server-side logic or local storage)
  function storeProfileData(profileData) {
      // ...
  }





/*employer_profile*/

  // Assuming you have a function to fetch employer data
function fetchEmployers() {
  // Replace with your actual API call
  fetch('https://api.example.com/employers')
      .then(response => response.json())
      .then(data => {
          const employerList = document.getElementById('employerList');
          data.forEach(employer => {
              const employerCard = document.createElement('div');
              employerCard.classList.add('employer-card');
              employerCard.innerHTML = `
                  <h3>${employer.companyName}</h3>
                  <p>Industry: ${employer.industry}</p>
                  <p>Location: ${employer.location}</p>
                  <p>Contact: ${employer.contactInfo}</p>
              `;
              employerList.appendChild(employerCard);
          });
      })
      .catch(error => console.error(error));
}

// Call the function to fetch and display employer profiles
fetchEmployers();




/*Job Sesrch*/

function searchJobs() {
  const jobSearch = document.getElementById('jobSearch').value;
  const jobType = document.getElementById('jobType').value;
  const location = document.getElementById('location').value;

  // Replace with your actual API call
  fetch(`https://api.example.com/jobs?search=${jobSearch}&type=${jobType}&location=${location}`)
      .then(response => response.json())
      .then(data => {
          const jobResults = document.getElementById('jobResults');
          jobResults.innerHTML = '';
          data.forEach(job => {
              const jobCard = document.createElement('div');
              jobCard.classList.add('job-card');
              jobCard.innerHTML = `
                  <h3>${job.title}</h3>
                  <p>${job.company}</p>
                  <p>${job.location}</p>
              `;
              jobResults.appendChild(jobCard);
          });
      })
      .catch(error => console.error(error));
}