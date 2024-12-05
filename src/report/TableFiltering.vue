<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <h1>Farmer Filtering</h1>

      <!-- Single Search Input -->
      <div class="search-box-container">
        <div class="input-field1 search-box">
          <input
            type="text"
            v-model="searchQuery"
            name="searchQuery"
            id="searchQuery"
            required
            spellcheck="false"
          />
          <label for="searchQuery">Search by Column:</label>
        </div>

        <!-- Dropdown for selecting multiple columns -->
        <div class="filter-dropdown">
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
      </div>

      <!-- Dropdown for selecting value from the last selected column -->
      <div v-if="lastSelectedColumn" class="filter-dropdown">
        <select v-model="selectedValue" @change="filterBySelectedValue" class="black-select1">
          <option disabled value="">Select {{ lastSelectedColumn }}</option>
          <option value="">All</option>
          <option v-for="value in uniqueValues" :key="value" :value="value">
            {{ value }}
          </option>
        </select>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading" class="loading-spinner">
        Loading farmers...
      </div>

      <div v-if="selectedColumns.length > 0">
        <div class="download-buttons-container">
          <button @click="downloadPDF" class="btn btn-primary btn-margin">Download as PDF</button>
          <button @click="downloadCSV" class="btn btn-secondary">Export as CSV</button>
        </div>
      </div>

      <!-- Farmers table -->
      <div v-if="!loading && filteredFarmers.length > 0 && selectedColumns.length > 0" class="table-responsive">
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
const selectedColumns = ref(['reference_number', 'surname', 'first_name', 'middle_name', 'extension_name']); // Default selected columns
const loading = ref(false);
const searchQuery = ref(''); // Single search query instead of an array
const token = localStorage.getItem('auth_token');
const selectedValue = ref('');
 const lastSelectedColumn = ref('');
const uniqueValues = computed(() => {
  const lastColumn = lastSelectedColumn.value;
  if (!lastColumn) return [];
  const values = new Set(farmers.value.map(farmer => farmer[lastColumn]));
  return Array.from(values);
});

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

// Filter farmers based on selected columns and search query
const filteredFarmers = computed(() => {
  return farmers.value
    .filter(farmer => {
      const matchesSearch = searchQuery.value ? selectedColumns.value.some(column => {
        const fieldValue = farmer[column];
        return fieldValue ? fieldValue.toString().toLowerCase().includes(searchQuery.value.toLowerCase()) : false;
      }) : true;

      const matchesValue = selectedValue.value ? farmer[lastSelectedColumn.value] === selectedValue.value : true;

      return matchesSearch && matchesValue;
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
    lastSelectedColumn.value = selectedColumn.value; // Set the last selected column
    selectedColumns.value.push(selectedColumn.value);
    selectedColumn.value = ''; // Reset the dropdown
    selectedValue.value = ''; // Reset the value dropdown
  }
};

// Remove column from the selected columns list
const removeColumn = (column) => {
  const index = selectedColumns.value.indexOf(column);
  if (index > -1) {
    selectedColumns.value.splice(index, 1);
    if (lastSelectedColumn.value === column) {
      lastSelectedColumn.value = ''; // Reset last selected column if removed
      selectedValue.value = ''; // Reset the value dropdown
    }
  }
};

// Filter by selected value from the last selected column
const filterBySelectedValue = () => {
  // This function is called when a value is selected from the last column dropdown
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

const downloadCSV = () => {
  const headers = selectedColumns.value.join(',');
  const rows = filteredFarmers.value.map(farmer =>
    selectedColumns.value.map(column => `"${farmer[column] || ''}"`).join(',')
  );
  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'farmer_report.csv';
  link.click();
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
  font-size: 2rem;
  text-align: left;
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

.search-box-container {
  display: flex;
  align-items: center; /* Align search box and dropdown */
  gap: 20px;
}

.search-box {
  flex: 1 1 20%; /* Adjust width based on need */
  top: -15px;
}

.filter-dropdown {
  flex: 1 1 60%; /* Adjust width based on need */
}

.selected-columns-container {
  margin-bottom: 1rem;
}

.selected-columns .tag {
  display: inline-block;
  background-color: lightgreen;
  color: black;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
}

.selected-columns button {
  margin-left: 8px;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
}

.download-buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-responsive {
    margin-top: -20px;
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
  border-top: 1px solid #ddd; /* Horizontal line */
  border-bottom: 1px solid #ddd;
  border-left: none; 
  border-right: none;
}

.table thead th {
  border-top: 1px solid #f2f4f7;
  border-bottom: 1px solid #f2f4f7; 
}
  .table th {
    font-weight: bold;
  }

.loading-spinner {
  font-size: 1.5rem;
  color: #007bff;
  text-align: center;
}
.download-buttons-container {
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 10px; /* Space between buttons */
  margin-bottom: 20px; /* Optional: Adds space between the buttons and table */
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
    .btn-margin {
        margin-right: 10px; /* Adjust the value as needed */
    }
    .black-select {
      background-color: #f2f4f7; 
      color: black; /* White text */
      border: 1px solid black; /* Light border */
      padding: 8px 12px; /* Padding for better spacing */
      border-radius: 6px; /* Rounded corners */
      font-size: 16px; /* Adjust font size */
      appearance: none; /* Remove default select styles in some browsers */
      cursor: pointer; 
      height: 2.5rem;
    }
    .black-select1 {
      background-color: #f2f4f7; 
      color: black; /* White text */
      border: 1px solid black; /* Light border */
      padding: 8px 12px; /* Padding for better spacing */
      border-radius: 6px; /* Rounded corners */
      font-size: 16px; /* Adjust font size */
      appearance: none;
      cursor: pointer; 
      height: 2.5rem;
      margin-top: -50px;
      width: 87%;
    }

    .black-select:focus {
      outline: none; /* Remove default focus outline */
      border-color: #63e6be; /* Green border on focus */
      box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
    }

    .black-select option {
      background-color: white; /* Option background */
      color: black; /* Option text color */
    }

    .black-select option:checked {
      background-color: #ccc; /* Highlight selected option */
      color: black; /* Change text color of selected option */
    }

</style>