<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <div>
      </div>

      <!-- Display farmers for all available sexes -->
      <div v-if="farmers.length > 0">
        <p style="color: black;">Total Count: {{ farmers.length }}</p>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-primary">
              <tr>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="farmer in farmers" :key="farmer.id">
                <td>{{ farmer.sex }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message when no farmers found -->
      <div v-else>
        <p>No farmers found.</p>
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

const sexes = ref([]);
const farmers = ref([]);

const token = localStorage.getItem('auth_token');

const fetchSexes = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8055/items/farmers?fields=sex',
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    const sexList = response.data.data.map(farmer => farmer.sex);
    sexes.value = [...new Set(sexList)];
    fetchFarmers();
  } catch (error) {
    console.error('Error fetching sexes:', error);
  }
};

const fetchFarmers = async () => {
  farmers.value = []; // Clear previous data
  try {
    const response = await axios.get(
      'http://localhost:8055/items/farmers',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    farmers.value = response.data.data;
  } catch (error) {
    console.error('Error fetching farmers:', error);
    farmers.value = [];
  }
};

onMounted(() => {
  fetchSexes();
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
      <h1 style="color: black;">Farmer Report - Page ${(i / maxRowsPerPage) + 1}</h1>
      <table class="table" style="border-collapse: collapse; width: 100%;">
      <thead class="table-primary" style="background-color: #007bff; color: black;">
        <tr>
          <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">Gender</th>
        </tr>
      </thead>
      <tbody>
        ${farmersPage.map(farmer => `
          <tr>
            <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.sex}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    `;
    
    pages.push(pageContent);
  }

  const options = {
    margin: [0.1, 0.1, 0.1, 0.1],
    filename: 'farmer_report_gender.pdf',
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
    color: balck;
  }
  
  /* Style the search input */
  .input {
    position: relative;
    margin-bottom: 2rem;
  }
  
  .input select {
    width: 20%;
    height: 30px;
  }
  
  .selected-sex-container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Adjusts space between elements */
  }
  
  .selected-sex {
    display: flex;
    flex-wrap: wrap; /* Allows tags to wrap to the next line if needed */
  }
  
  .btn {
    margin-left: 10px; 
    height: 35px;
    width: 150px;
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
  
  .table-responsive {
    overflow-x: auto;
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
  </style>
  