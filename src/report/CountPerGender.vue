<template>
    <div class="report_count-container">
      <Navbar />
      <div class="content-box" id="reportContent">
        <h1>Farmer Report Search by Sex</h1>
        <div>
          <div class="input">
            <label for="sex">Select Sex:</label>
            <div class="selected-sex-container">
              <div class="selected-sex">
                <!-- Display selected sex as tags -->
                <span v-for="sex in selectedSex" :key="sex" class="tag">
                  {{ sex }}
                  <button @click="removeSex(sex)">x</button>
                </span>
              </div>
              <!-- Download Button -->
              <button class="btn" style="background-color: #343248; border: 1px solid white; color: white;" @click="downloadPDF">Download PDF</button>
            </div>
            <select v-model="selectedSexOption" @change="addSex" required spellcheck="false" class="black-select">
              <option disabled value="">Select Sex</option>
              <option v-for="sex in sexes" :key="sex" :value="sex">
                {{ sex }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedSex.length > 0 && farmers.length > 0" class="total-count">
        <h2>Total Farmers: {{ farmers.length }}</h2>
      </div>
  
        <!-- Display farmers for the selected sexes -->
        <div v-if="farmers.length > 0">
          <h2>Farmers with Sex: {{ selectedSex.join(', ') }}:</h2>
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
                  <th>Gender</th>
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
                  <td>{{ farmer.sex }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Message when no farmers found -->
        <div v-else-if="selectedSex.length > 0">
          <p>No farmers found with the selected sex: {{ selectedSex.join(', ') }}.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import html2pdf from 'html2pdf.js';
  
  const selectedSex = ref([]);
  const selectedSexOption = ref('');
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
    } catch (error) {
      console.error('Error fetching sexes:', error);
    }
  };
  
  const addSex = () => {
    if (selectedSexOption.value && !selectedSex.value.includes(selectedSexOption.value)) {
      selectedSex.value.push(selectedSexOption.value);
      selectedSexOption.value = '';
      fetchFarmersBySex();
    }
  };
  
  const removeSex = (sex) => {
    const index = selectedSex.value.indexOf(sex);
    if (index > -1) {
      selectedSex.value.splice(index, 1);
      fetchFarmersBySex();
    }
  };
  
  const fetchFarmersBySex = async () => {
    farmers.value = []; // Clear previous data to reorder based on selection
    try {
      if (selectedSex.value.length > 0) {
        for (const sex of selectedSex.value) {
          const response = await axios.get(
            `http://localhost:8055/items/farmers?filter[sex]=${sex}`,
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
        <h1 style="color: black;">Farmer Report by Gender - Page ${(i / maxRowsPerPage) + 1}</h1>
        <table class="table" style="border-collapse: collapse; width: 100%;">
        <thead class="table-primary" style="background-color: #007bff; color: black;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">RSBA No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Surname</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">First Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Middle Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Extension Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Contact No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Gender</th>
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
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    padding: 10px;
    text-align: left;
  }
  
  .table-primary {
    background-color: #007bff; /* Adjust for visibility */
  }
  
  .table-primary th {
    color: white; /* White text for table headers */
  }
  </style>
  