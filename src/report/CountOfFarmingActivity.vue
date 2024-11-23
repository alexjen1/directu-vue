<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <h1>Farmer Report Search by Farming Activity</h1>
      <div>
        <div class="filter-dropdown">
          <label for="farmingActivity">Select Farming Activity:</label>
          <div class="selected-activities-container">
            <div class="selected-activities">
              <span v-for="activity in selectedActivities" :key="activity" class="tag">
                {{ activity }}
                <button @click="removeActivity(activity)">x</button>
              </span>
            </div>
            
          </div>
          <select v-model="selectedActivity" @change="addActivity" required spellcheck="false" class="black-select">
            <option disabled value="">Select Farming Activity</option>
            <option v-for="activity in farmingActivities" :key="activity" :value="activity">
              {{ activity }}
            </option>
          </select>
        </div>
      </div>
      <button class="btnpdf" @click="downloadPDF">Download PDF</button>

      <!-- Display farmers for the selected activities -->
      <div v-if="filteredFarmers.length > 0">
        <h2>Farmers engaged in {{ selectedActivities.join(', ') }}:</h2>
        <p>Total Count: {{ totalFarmersCount }}</p> <!-- Total count display -->
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
                <th>Farming Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="farmer in filteredFarmers" :key="farmer.id">
                <td>{{ farmer.reference_number }}</td>
                <td>{{ farmer.surname }}</td>
                <td>{{ farmer.first_name }}</td>
                <td>{{ farmer.middle_name }}</td>
                <td>{{ farmer.extension_name }}</td>
                <td>{{ farmer.mobile_number }}</td>
                <td>{{ formatFarmingActivities(farmer) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="selectedActivities.length > 0">
        <p>No farmers found engaged in {{ selectedActivities.join(', ') }}.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const selectedActivities = ref([]);
const selectedActivity = ref('');
const farmingActivities = ref([]);
const farmers = ref([]);

// Computed property to filter farmers based on selected activities
const filteredFarmers = computed(() => {
  if (selectedActivities.value.length === 0) return [];
  return farmers.value.filter(farmer =>
    selectedActivities.value.some(activity =>
      farmer.type_of_farming_activity.includes(activity)
    )
  );
});

// Computed property to count the number of farmers in filteredFarmers
const totalFarmersCount = computed(() => filteredFarmers.value.length);

const token = localStorage.getItem('auth_token');

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

const addActivity = () => {
  if (selectedActivity.value && !selectedActivities.value.includes(selectedActivity.value)) {
    selectedActivities.value.push(selectedActivity.value);
    selectedActivity.value = ''; // Clear selection after adding
    fetchFarmersByActivity();
  }
};

const removeActivity = (activity) => {
  const index = selectedActivities.value.indexOf(activity);
  if (index > -1) {
    selectedActivities.value.splice(index, 1);
    fetchFarmersByActivity(); // Refetch farmers after removal
  }
};

const fetchFarmersByActivity = async () => {
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
        <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">RSBA No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Surname</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">First Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Middle Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Extension Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Contact No.</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid black; color: white;">Farming Activity</th>
      </tr>
    </thead>
    <tbody>
      ${filteredFarmersList.map(farmer => `
        <tr>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.reference_number}</td>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.surname}</td>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.first_name}</td>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.middle_name}</td>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.extension_name}</td>
          <td style="padding: 0.75rem; text-align: left; border: 1px solid black; color: black;">${farmer.mobile_number}</td>
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
  