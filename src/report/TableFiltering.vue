<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <h1>Farmer Filtering</h1>

      <!-- Multiple Search Inputs (up to 5) -->
      <div class="search-box-container">
        <div v-for="(query, index) in searchQueries" :key="index" class="input-field1 search-box">
          <input
            type="text"
            v-model="searchQueries[index]"
            :name="'search' + index"
            :id="'search' + index"
            required
            spellcheck="false"
          />
          <label :for="'search' + index">Filter by Column {{ index + 1 }}:</label>
        </div>
      </div>

      <!-- Dropdown for selecting multiple columns -->
      <div class="filter-dropdown">
        <label for="columns">Select Columns to Display:</label>
        <div class="selected-columns-container">
          <div class="selected-columns">
            <!-- Display selected columns as tags -->
            <span v-for="column in selectedColumns" :key="column" class="tag">
              {{ column }}
              <button @click="removeColumn(column)">x</button>
            </span>
          </div>
        </div>
        <select v-model="selectedColumn" @change="addColumn" required spellcheck="false" class="black-select">
          <option disabled value="">Select Column</option>
          <option v-for="column in availableColumns" :key="column" :value="column">
            {{ column }}
          </option>
        </select>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="loading-spinner">
        Loading farmers...
      </div>

      <!-- Farmers table -->
      <div v-if="!loading && filteredFarmers.length > 0 && selectedColumns.length > 0" class="table-responsive">
        <h2>Displaying Columns: {{ selectedColumns.join(', ') }}</h2>
        <table class="table" id="farmersTable">
          <thead class="table-primary">
            <tr>
              <th v-for="column in selectedColumns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="farmer in filteredFarmers" :key="farmer.id">
              <td v-for="column in selectedColumns" :key="column">{{ farmer[column] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Message when no column is selected -->
      <div v-else-if="selectedColumns.length === 0 && !loading">
        <p style="color: black;">Please select at least one column to display.</p>
      </div>

      <!-- Message when no farmers found -->
      <div v-else-if="!loading && filteredFarmers.length === 0">
        <p>No farmers found.</p>
      </div>

      <!-- Download button -->
      <div v-if="selectedColumns.length > 0">
        <button @click="downloadPDF" class="btn btn-primary">Download PDF</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js

const farmers = ref([]);
const availableColumns = ref([]);
const selectedColumn = ref('');
const selectedColumns = ref([]);
const loading = ref(false);
const searchQueries = ref(['', '', '', '', '']); // Array for up to 5 search queries
const token = localStorage.getItem('auth_token');

// Fetch farmers and columns
const fetchFarmers = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:8055/items/farmers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && response.data.data) {
      farmers.value = response.data.data;
      availableColumns.value = Object.keys(response.data.data[0] || {});
    } else {
      farmers.value = [];
    }
  } catch (error) {
    console.error('Error fetching farmers:', error);
    farmers.value = [];
  } finally {
    loading.value = false;
  }
};

// Filter farmers based on selected columns and search queries
const filteredFarmers = computed(() => {
  return farmers.value
    .filter(farmer => {
      return searchQueries.value.every(query => {
        return query ? selectedColumns.value.some(column => {
          const fieldValue = farmer[column];
          // Check for exact match, case-insensitive
          return fieldValue ? fieldValue.toString().toLowerCase() === query.toLowerCase() : false;
        }) : true;
      });
    })
    .map(farmer => {
      const filteredFarmer = {};
      selectedColumns.value.forEach(column => {
        filteredFarmer[column] = farmer[column];
      });
      return filteredFarmer;
    });
});

// Add selected column to the list
const addColumn = () => {
  if (selectedColumn.value && !selectedColumns.value.includes(selectedColumn.value)) {
    selectedColumns.value.push(selectedColumn.value);
    selectedColumn.value = ''; // Reset the dropdown
  }
};

// Remove column from the selected columns list
const removeColumn = (column) => {
  const index = selectedColumns.value.indexOf(column);
  if (index > -1) {
    selectedColumns.value.splice(index, 1);
  }
};

// Download the table data as a PDF using html2pdf.js
const downloadPDF = () => {
  const element = document.getElementById('farmersTable');
  const opt = {
    margin: 1,
    filename: 'farmer_report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'legal', orientation: 'landscape' }
  };
  html2pdf()
    .from(element)
    .set(opt)
    .save();
};

onMounted(() => {
  fetchFarmers();
});
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
    color: black;
    font-size: 1rem;
    pointer-events: none;
    transition: 0.3s;
  }
  
  input:focus {
    border-color: #63e6be;
    box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
  }
  
  input:focus ~ label,
  input:valid ~ label {
    top: 0;
    left: 1rem;
    font-size: 0.875rem;
    background: #f2f4f7;
    padding: 0 2px;
  }
    
    .table-responsive {
    margin-top: 20px;
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
  border-left: none; /* Default: No vertical lines */
  border-right: none;
}

.table td:first-child {
  border-left: 1px solid #F5F5F5; 
}

.table td:last-child {
  border-right: 1px solid #F5F5F5;
}
.table th {
  border-top: 1px solid #ddd; /* Horizontal line */
  border-bottom: 1px solid #ddd;
  border-left: none; /* Default: No vertical lines */
  border-right: none;
}

.table thead th {
  border-top: 1px solid #f2f4f7;
  border-bottom: 1px solid #f2f4f7; 
}
  .table th {
    font-weight: bold;
  }
  
  /* New style for table data text */
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
  .selected-columns-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  .selected-columns {
    white-space: nowrap; /* Prevent wrapping */
  }
  .selected-columns .tag {
    display: inline-block;
    background-color: lightgreen;
    color: black;
    border-radius: 15px;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  
  .selected-columns .tag button {
    margin-left: 5px;
    background: none;
    border: none;
    color: black;
    cursor: pointer;
  }
  
  
  .input select {
    width: 20%;
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
      background-color: #7e4ee6; /* Bootstrap primary color */
      border: none;
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: #7e4ee6; /* Darker shade for hover effect */
    }
    .search-box-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .search-box {
      flex: 1 1 calc(20% - 10px); /* Adjust this based on the desired width */
      min-width: 150px;
    }

    input[type="text"] {
      width: 100%;
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
    