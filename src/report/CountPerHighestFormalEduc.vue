<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <div>
      </div>

      <!-- Display farmers for each education level -->
      <div v-if="farmers.length > 0">
        <p style="color: black;">Total Count: {{ farmers.length }}</p>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-primary">
              <tr>
                <th>Education Level</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="farmer in farmers" :key="farmer.id">
                <td>{{ farmer.highest_formal_education }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message when no farmers found -->
      <div v-else>
        <p>No farmers found for the displayed education levels.</p>
      </div>
      <button class="btnpdf" @click="downloadPDF">Download PDF</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const educationLevels = ref([]);
const farmers = ref([]);

const token = localStorage.getItem('auth_token');

// Fetch all available education levels
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

    // Get all education levels from the farmers
    const educationList = response.data.data.map(farmer => farmer.highest_formal_education);
    educationLevels.value = [...new Set(educationList)];
    
    fetchFarmersByEducation();
  } catch (error) {
    console.error('Error fetching education levels:', error);
  }
};

// Fetch farmers for each education level
const fetchFarmersByEducation = async () => {
  farmers.value = []; // Clear previous data
  try {
    if (educationLevels.value.length > 0) {
      for (const education of educationLevels.value) {
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
      <h1 style="color: black;">Farmer Report by Farming Activity - Page ${(i / maxRowsPerPage) + 1}</h1>
      <table class="table" style="border-collapse: collapse; width: 100%;">
        <thead class="table-primary" style="background-color: #007bff; color: black;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">Education Level</th>
          </tr>
        </thead>
        <tbody>
          ${farmersPage.map(farmer => `
            <tr>
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
    background-color: #f2f4f7;
    overflow: hidden;
  }
  
  .content-box {
    position: relative;
    padding: 2rem;
    background-color: #f2f4f7;
    margin-top: 2rem;
    border: 1px solid #f2f4f7;
    border-radius: 8px;
    max-height: 80vh; /* Set a max height for the content box */
    overflow-y: auto; /* Enable vertical scrolling */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

  
  h1 {
    color: black;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-align: left;
  }
  h2 {
    color: black;
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
    background-color: #387e90;
    color: white;
  }
  .table th {
    color: black;
    background-color: white;
  }
  .table td {
  border-bottom: 1px solid #d7d7d7;
  border-left: none; 
  border-right: none;
}

.table td:first-child {
  border-left: 1px solid #F5F5F5; 
}

.table td:last-child {
  border-right: 1px solid #F5F5F5;
}
.table th {
  border-top: 1px solid #ddd; 
  border-bottom: 1px solid #ddd;
  border-left: none; 
  border-right: none;
}

.table thead th {
  border-top: 1px solid white;
  border-bottom: 1px solid white; 
}
  .table th {
    font-weight: bold;
  }
  
  .table td {
    color: black;
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
  