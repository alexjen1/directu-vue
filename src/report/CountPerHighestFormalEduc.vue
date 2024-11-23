<template>
    <div class="report_count-container">
      <Navbar />
      <div class="content-box" id="reportContent">
        <h1>Farmer Report Search by Highest Formal Education</h1>
        <div>
          <div class="input">
            <label for="education">Select Education Level(s):</label>
            <div class="selected-education-container">
              <div class="selected-education">
                <!-- Display selected education levels as tags -->
                <span v-for="education in selectedEducationLevels" :key="education" class="tag">
                  {{ education }}
                  <button @click="removeEducation(education)">x</button>
                </span>
              </div>
              <!-- Download Button -->
              <button class="btn" style="background-color: #343248; border: 1px solid white; color: white;  margin-left: 90%;" @click="downloadPDF">Download PDF</button>
            </div>
            <select v-model="selectedEducationLevel" @change="addEducation" required spellcheck="false" class="black-select">
              <option disabled value="">Select Education Level</option>
              <option v-for="education in educationLevels" :key="education" :value="education">
                {{ education }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedEducationLevels.length > 0 && farmers.length > 0" class="total-count">
        <h2>Total Farmers: {{ farmers.length }}</h2>
      </div>
  
        <!-- Display farmers for the selected education levels -->
        <div v-if="farmers.length > 0">
          <h2>Farmers with {{ selectedEducationLevels.join(', ') }} education:</h2>
          <div class="table-responsive">
            <table class="table">
              <thead class="table-primary">
                <tr>
                  <th>RSBA No.</th>
                  <th>Surname</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Extension Name</th>
                  <th>Contact No.</th>
                  <th>Education Level</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="farmer in farmers" :key="farmer.id">
                  <td>{{ farmer.reference_number }}</td>
                  <td>{{ farmer.surname }}</td>
                  <td>{{ farmer.first_name }}</td>
                  <td>{{ farmer.middle_name }}</td>
                  <td>{{ farmer.extension_name }}</td>
                  <td>{{ farmer.mobile_number }}</td>
                  <td>{{ farmer.highest_formal_education }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Message when no farmers found -->
        <div v-else-if="selectedEducationLevels.length > 0">
          <p>No farmers found with {{ selectedEducationLevels.join(', ') }} education.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import html2pdf from 'html2pdf.js';
  
  const selectedEducationLevels = ref([]);
  const selectedEducationLevel = ref('');
  const educationLevels = ref([]);
  const farmers = ref([]);
  
  const token = localStorage.getItem('auth_token');
  
  const fetchEducationLevels = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8055/items/farmers?fields=highest_formal_education',
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      const educationList = response.data.data.map(farmer => farmer.highest_formal_education);
      educationLevels.value = [...new Set(educationList)];
    } catch (error) {
      console.error('Error fetching education levels:', error);
    }
  };
  
  const addEducation = () => {
    if (selectedEducationLevel.value && !selectedEducationLevels.value.includes(selectedEducationLevel.value)) {
      selectedEducationLevels.value.push(selectedEducationLevel.value);
      selectedEducationLevel.value = '';
      fetchFarmersByEducation();
    }
  };
  
  const removeEducation = (education) => {
    const index = selectedEducationLevels.value.indexOf(education);
    if (index > -1) {
      selectedEducationLevels.value.splice(index, 1);
      fetchFarmersByEducation();
    }
  };
  
  const fetchFarmersByEducation = async () => {
    farmers.value = []; // Clear previous data to reorder based on selection
    try {
      if (selectedEducationLevels.value.length > 0) {
        for (const education of selectedEducationLevels.value) {
          const response = await axios.get(
            `http://localhost:8055/items/farmers?filter[highest_formal_education]=${education}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
          farmers.value = [...farmers.value, ...response.data.data];
        }
      } else {
        farmers.value = [];
      }
    } catch (error) {
      console.error('Error fetching farmers:', error);
      farmers.value = [];
    }
  };
  
  onMounted(() => {
    fetchEducationLevels();
  });
  
  // PDF Download Function
const downloadPDF = async () => {
  const element = document.getElementById('reportContent');
  
  // Get the content height and calculate how many rows fit into a legal page
  const pageHeight = 11; // Height in inches for legal paper
  const rowHeight = 0.5; // Estimated height of each row in inches
  const maxRowsPerPage = Math.floor(pageHeight / rowHeight);
  
  // Prepare an array of pages
  const pages = [];
  
  for (let i = 0; i < farmers.value.length; i += maxRowsPerPage) {
    const pageContent = document.createElement('div');
    const farmersPage = farmers.value.slice(i, i + maxRowsPerPage);
    
    pageContent.innerHTML = `
      <h1 style="color: black;">Farmer Report by Education Level - Page ${(i / maxRowsPerPage) + 1}</h1>
      <table class="table" style="border-collapse: collapse; width: 100%;">
        <thead class="table-primary" style="background-color: #007bff; color: black;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">RSBA No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Surname</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">First Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Middle Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Extension Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Contact No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Education Level</th>
          </tr>
        </thead>
        <tbody>
          ${farmersPage.map(farmer => `
            <tr>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.reference_number}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.surname}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.first_name}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.middle_name}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.extension_name}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.mobile_number}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.highest_formal_education}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    pages.push(pageContent);
  }

  const options = {
    margin: [0.1, 0.1, 0.1, 0.1],
    filename: 'farmer_report_education_level.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true 
    },
    jsPDF: { unit: 'in', format: 'legal', orientation: 'landscape' }
  };

  for (const page of pages) {
    await html2pdf()
      .set(options)
      .from(page)
      .save()
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }
};
  </script>
  
  <style scoped>
  .report_count-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    background-color: #262735;
    overflow: hidden;
  }
  
  .content-box {
    position: relative;
    padding: 2rem;
    background-color: #343248;
    margin-top: 2rem;
    border: 1px solid #343248;
    border-radius: 8px;
    max-height: 80vh; /* Set a max height for the content box */
    overflow-y: auto; /* Enable vertical scrolling */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

  
  h1 {
    color: white;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-align: left;
  }
  h2 {
    color: white;
  }
  
  /* Style the search input */
  .input-field1 {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .input-field1 input {
    width: 100%;
    max-width: 300px;
    height: 2.5rem;
    border-radius: 6px;
    font-size: 1rem;
    padding: 0 1rem;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    transition: border 0.3s;
  }
  
  .input-field1 label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: white;
    font-size: 1rem;
    pointer-events: none;
    transition: 0.3s;
  }
  
  input:focus {
    border: 2px solid black;
  }
  
  input:focus ~ label,
  input:valid ~ label {
    top: 0;
    left: 1rem;
    font-size: 0.875rem;
    background: white;
    padding: 0 2px;
  }
  
  .search-box {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  
  .table-responsive {
    overflow-x: auto; /* Allows horizontal scrolling on smaller screens */
  }
  
  .table {
    width: 100%;
    margin-top: 1.5rem;
    border-collapse: collapse;
  }
  
  .table-primary {
    background-color: #647f9c;
    color: white;
  }
  
  .table th,
  .table td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .table th {
    font-weight: bold;
  }
  
  /* New style for table data text */
  .table td {
    color: white; /* Set text color to black */
  }
  
  /* Style for action buttons */
  .action-button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.5rem; /* Increase icon size */
    margin-right: 0.5rem; /* Space between icons */
  }
  label {
    margin-right: -100px;
  }
  select {
    padding: 5px;
    font-size: 14px;
}
.selected-education-container {
  align-items: center;
  justify-content: space-between; /* Adjusts space between elements */
}

.selected-education {
  display: flex;
  flex-wrap: wrap; /* Allows tags to wrap to the next line if needed */
}

.btn {
  margin-left: 10px; /* Adds space between the tags and the button */
}


.tag {
  display: inline-block;
  background-color: lightgreen;
  color: black;
  border-radius: 15px;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.tag button {
  margin-left: 5px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
}

.input select {
  width: 20%;
}
  
  @media (max-width: 768px) {
    .content-box {
      padding: 1.5rem;
    }
  
    h1 {
      font-size: 1.5rem;
    }
  
    .search-box {
      position: relative;
      top: 0;
      right: 0;
      width: 100%;
      margin-top: 1rem;
    }
  
    .input-field input {
      width: 100%;
      max-width: 100%;
    }
  
    .table th,
    .table td {
      font-size: 0.875rem; /* Smaller font size on smaller screens */
    }
  }
  .btn {
      width: 8%; /* Full width on small screens */
      text-align: center; /* Center text */
      margin-left: 0; /* Reset margin */
    }
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    color: white;
    background-color: #007bff; /* Bootstrap primary color */
    border: none;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #0056b3; /* Darker shade for hover effect */
  }
  
  @media (max-width: 576px) {
    .content-box {
      padding: 1rem;
    }
  
    h1 {
      font-size: 1.25rem;
    }
  
    .input-field input {
      font-size: 0.875rem;
    }
  
    .btn {
      width: 100%; /* Full width on small screens */
      text-align: center; /* Center text */
      margin-left: 0; /* Reset margin */
    }
  }
  </style>
  