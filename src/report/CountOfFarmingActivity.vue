<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <div>
      </div>

      <!-- Display farmers for the selected activities -->
      <div v-if="filteredFarmers.length > 0">
        <p style="color: black;">Total Count: {{ totalFarmersCount }}</p>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-primary">
              <tr>
                <th>Farming Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="farmer in filteredFarmers" :key="farmer.id">
                <td>{{ formatFarmingActivities(farmer) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="farmingActivities.length > 0">
        <p>No farmers found engaged in these farming activities.</p>
      </div>
      <button class="btnpdf" @click="downloadPDF">Download PDF</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const farmingActivities = ref([]);
const farmers = ref([]);

// Computed property to filter farmers based on farming activities
const filteredFarmers = computed(() => {
  return farmers.value.filter(farmer =>
    farmer.type_of_farming_activity.some(activity =>
      farmingActivities.value.includes(activity)
    )
  );
});

// Computed property to count the number of farmers in filteredFarmers
const totalFarmersCount = computed(() => filteredFarmers.value.length);

const token = localStorage.getItem('auth_token');

// Fetch all farming activities from the backend
const fetchFarmingActivities = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8055/items/farmers?fields=type_of_farming_activity',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const activityList = response.data.data
      .flatMap(farmer => farmer.type_of_farming_activity)
      .filter((activity, index, self) => self.indexOf(activity) === index);
    
    farmingActivities.value = activityList;
  } catch (error) {
    console.error('Error fetching farming activities:', error);
  }
};

// Fetch all farmers from the backend
const fetchFarmers = async () => {
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

const formatFarmingActivities = (farmer) => {
  let activities = farmer.type_of_farming_activity.join(', ');
  if (farmer.other_crop_specify) activities += `, | Other Crop: ${farmer.other_crop_specify}`;
  if (farmer.livestock_specify) activities += `, | Livestock: ${farmer.livestock_specify}`;
  if (farmer.poultry_specify) activities += `, | Poultry: ${farmer.poultry_specify}`;
  return activities;
};

onMounted(() => {
  fetchFarmingActivities();
  fetchFarmers();
});

// PDF Download Function
const downloadPDF = async () => {
  const filteredFarmersList = filteredFarmers.value;

  if (filteredFarmersList.length === 0) {
    alert('No farmers found for the selected farming activities.');
    return;
  }

  const pageContent = document.createElement('div');
  pageContent.innerHTML = `
    <h1 style="color: black;">Farmer Report by Activity</h1>
    <table class="table" style="border-collapse: collapse; width: 100%;">
    <thead class="table-primary" style="background-color: #007bff; color: black;">
      <tr>
        <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">Farming Activity</th>
      </tr>
    </thead>
    <tbody>
      ${filteredFarmersList.map(farmer => `
        <tr>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${formatFarmingActivities(farmer)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
  `;

  const options = {
    margin: [0.1, 0.1, 0.1, 0.1],
    filename: 'farmer_report_by_farming_activity.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true 
    },
    jsPDF: { unit: 'in', format: 'legal', orientation: 'landscape' }
  };

  await html2pdf()
    .set(options)
    .from(pageContent)
    .save()
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
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
.selected-activities-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusts space between elements */
}

.selected-activities {
  display: flex;
  flex-wrap: wrap; /* Allows tags to wrap to the next line if needed */
}

.btn {
  margin-left: 10px; /* Adds space between the tags and the button */
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
.farming-activities-list{
  color: black;
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
  