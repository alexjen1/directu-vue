<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <div>
      </div>

      <!-- Display grouped farmers by sex -->
      <div v-if="groupedFarmers.length > 0">
        <p style="color: black;">Total Count: {{ groupedFarmers.length }}</p>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-primary">
              <tr>
                <th>#</th>
                <th>Gender</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(farmer, index) in groupedFarmers" :key="farmer.id">
                <td>{{ index + 1 }}</td>
                <td>{{ farmer.sex }}</td>
                <td>{{ farmer.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message when no farmers found -->
      <div v-else>
        <p>No farmers found.</p>
      </div>
      <!-- <button class="btnpdf" @click="downloadPDF">Download PDF</button> -->
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const groupedFarmers = ref([]); // To hold grouped farmers by gender
const token = localStorage.getItem('auth_token');

// Fetch and group farmers by sex
const fetchFarmers = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8055/items/farmers?fields=sex',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Group farmers by sex and count occurrences
    const sexCounts = {};
    response.data.data.forEach(farmer => {
      const sex = farmer.sex || 'Not Specified';
      if (sexCounts[sex]) {
        sexCounts[sex]++;
      } else {
        sexCounts[sex] = 1;
      }
    });

    // Transform the object into an array for rendering
    groupedFarmers.value = Object.entries(sexCounts).map(([sex, count], index) => ({
      id: index + 1, // Auto-incremented ID
      sex,
      count,
    }));
  } catch (error) {
    console.error('Error fetching farmers:', error);
    groupedFarmers.value = [];
  }
};

onMounted(() => {
  fetchFarmers();
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
  
  for (let i = 0; i < groupedFarmers.value.length; i += maxRowsPerPage) {
    const pageContent = document.createElement('div');
    const farmersPage = groupedFarmers.value.slice(i, i + maxRowsPerPage);
    
    pageContent.innerHTML = `
      <h1 style="color: black;">Farmer Report - Page ${(i / maxRowsPerPage) + 1}</h1>
      <table class="table" style="border-collapse: collapse; width: 100%;">
        <thead class="table-primary" style="background-color: #007bff; color: black;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">Gender</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">Count</th>
          </tr>
        </thead>
        <tbody>
          ${farmersPage.map(farmer => `
            <tr>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.sex}</td>
              <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.count}</td>
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
  