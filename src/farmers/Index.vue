<template>
  <div class="index-container">
    <Navbar />
    <div class="content-box">
      <h1>Farmers List</h1>
      <br>

      <!-- Search Input -->
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-between mb-3">
        <div class="input-field1 search-box">
          <input
            type="text"
            v-model="searchQuery" 
            name="search"
            id="search"  
            required
            spellcheck="false"
          />
          <label for="search">Search:</label>
        </div>

        <div class="filter-dropdown">
          <select id="farmingActivityFilter" class="form-select" v-model="selectedMainLivelihood" @change="changePage(1)">
            <option disabled value="">Select Main Livelihood</option>
            <option value="">All</option>
            <option v-for="activity in uniqueActivities" :key="activity" :value="activity">
              {{ activity }}
            </option>
          </select>
        </div>
        <div class="filter-dropdown">
          <select id="farmingActivityFilter" class="form-select" v-model="selectedbarangay" @change="changePage(1)">
            <option disabled value="">Select Barangay</option>
            <option value="">All</option>
            <option v-for="activity in uniquebarangay" :key="activity" :value="activity">
              {{ activity }}
            </option>
          </select>
        </div>
        <div class="filter-dropdown">
          <select id="farmingActivityFilter" class="form-select" v-model="selectedGender" @change="changePage(1)">
            <option disabled value="">Select Gender</option>
            <option value="">All</option>
            <option v-for="activity in uniqueGender" :key="activity" :value="activity">
              {{ activity }}
            </option>
          </select>
        </div>
        <div class="filter-dropdown">
          <select id="farmingActivityFilter" class="form-select" v-model="selectedFarmingActivity" @change="changePage(1)">
            <option disabled value="">Select Farming Activity</option>
            <option value="">All</option>
            <option v-for="activity in uniqueFarmingActivity" :key="activity" :value="activity">
              {{ activity }}
            </option>
          </select>
        </div>
      </div>

      <!-- Farmers Button -->
      <div class="d-flex justify-content-end align-items-center mb-3">
        <div class="add-farmers-btn">
          <router-link to="/farmers/create" class="btn">
          <i class="fas fa-plus"></i> Add Farmers
        </router-link>
        </div>
      </div>

      <!-- Farmers Table -->
      <div class="table-responsive">
        <table class="table">
          <thead class="table-primary">
            <tr>
              <th><input type="checkbox" @change="toggleSelectAll" :checked="isAllSelected" /></th>
              <th>RSBSA No.</th>
              <th>Surname</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Extension Name</th>
              <th>Contact No.</th>
              <th>BRGY.</th>
              <th>Farming Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="farmer in paginatedFarmers" :key="farmer.id">
              <td><input type="checkbox" :value="farmer.id" v-model="selectedFarmers" /></td>
              <td>{{ farmer.reference_number }}</td>
              <td>{{ farmer.surname }}</td>
              <td>{{ farmer.first_name }}</td>
              <td>{{ farmer.middle_name }}</td>
              <td>{{ farmer.extension_name }}</td>
              <td>{{ farmer.mobile_number }}</td>
              <td>{{ farmer.barangay }}</td>
              <td>{{ farmer.type_of_farming_activity.join(', ') }}</td> 
              <td>
                <button class="action-button edit" @click="editFarmer(farmer.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-button delete" @click="deleteFarmer(farmer.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button class="action-button download" @click="downloadFarmerPDF(farmer.id)">
                  <i class="fas fa-download"></i>
                </button>
                <!-- <button class="action-button option" @click="(farmer.id)">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end">
        <button v-if="selectedFarmers.length > 0" @click="deleteSelectedFarmers" class=" btn-danger">
          Delete Selected Farmers
        </button>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <p>Rows Per Page: </p>
        <div class="show-entries-dropdown">
          <select id="showEntries" class="form-select" v-model="entriesPerPage" @change="changePage(1)">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="-1">All</option>
          </select>
        </div>
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="pagination-btn">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages"
          class="pagination-btn">
          Next
        </button>
      </div>

      <!-- Undo Alert -->
      <div v-if="showUndo" class="undo-alert">
        <p>Farmer deleted! <button @click="restoreDeletedFarmer">Undo</button></p>
      </div>
      <br>
      <div v-if="showUndo" class="undo-alert">
        <p>Farmer deleted! <button @click="restoreDeletedFarmersSelected">Undo multiple</button></p>
      </div>

      <!-- Success Alert -->
      <div v-if="alertMessage" class="alert-box">
        <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
        <h1>Success</h1>
        <p>{{ alertMessage }}</p>
        <button @click="closeAlert">Ok</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
// import html2pdf from 'html2pdf.js';

const router = useRouter();
const farmers = ref([]);
const entriesPerPage = ref(10);
const currentPage = ref(1);
const searchQuery = ref('');
const token = localStorage.getItem('auth_token');
const alertMessage = ref('');
const showUndo = ref(false);
let deletedFarmerId = ref(null);
const selectedMainLivelihood = ref(''); 
const selectedbarangay = ref(''); 
const selectedGender = ref(''); 
const selectedFarmingActivity = ref(''); 
const selectedFarmers = ref([]);

const isAllSelected = computed(() => {
  return selectedFarmers.value.length === paginatedFarmers.value.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedFarmers.value = [];
  } else {
    selectedFarmers.value = paginatedFarmers.value.map(farmer => farmer.id);
  }
};

// Delete Selected Farmers with Undo
const deleteSelectedFarmers = async () => {
  const confirmDelete = confirm('Are you sure you want to delete the selected farmers?');
  if (!confirmDelete) return;

  const email = localStorage.getItem('email'); // Get the email from localStorage
  const farmersToDelete = selectedFarmers.value.map(id => farmers.value.find(farmer => farmer.id === id));

  try {
    // Mark each selected farmer as deleted (soft delete)
    for (const farmer of farmersToDelete) {
      await axios.patch(`http://localhost:8055/items/farmers/${farmer.id}`, {
        deleted: true,  // Soft delete
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Log activity for each deleted farmer
      logActivity(email, `Temporary Deleted farmer with reference number: ${farmer.reference_number}`);
    }

    // Update farmers list to reflect the deletion
    farmers.value = farmers.value.filter(farmer => !selectedFarmers.value.includes(farmer.id));
    alertMessage.value = 'Selected farmers have been deleted!';

    // Show Undo option
    showUndo.value = true;
    deletedFarmerId.value = farmersToDelete.map(farmer => farmer.id); // Store deleted farmer IDs

    setTimeout(async () => {
      if (showUndo.value) {
        for (const id of deletedFarmerId.value) {
          const farmerToPermanentlyDelete = farmersToDelete.find(farmer => farmer.id === id);
          await permanentlyDeleteFarmerSelected(id, farmerToPermanentlyDelete);
        }
      }
    }, 200000); // Adjust the timeout duration as needed

    // Reset selected farmers after deletion
    selectedFarmers.value = [];
  } catch (err) {
    console.error('Error deleting selected farmers:', err);
    alertMessage.value = 'Error occurred while deleting selected farmers.';
  }
};
// Permanent Deletion of Farmer
const permanentlyDeleteFarmerSelected = async (id, deletedFarmer) => {
  try {
    // Permanently delete the farmer from the database
    await axios.delete(`http://localhost:8055/items/farmers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log activity for permanent deletion using the reference number
    const email = localStorage.getItem('email');
    logActivity(email, `Permanently deleted farmer with reference number: ${deletedFarmer?.reference_number}`);

    // Update farmers list to reflect the permanent deletion
    farmers.value = farmers.value.filter(farmer => farmer.id !== id);
    alertMessage.value = 'Farmer Permanently Deleted!';

    showUndo.value = false;
  } catch (err) {
    alert('Error permanently deleting farmer: ' + err);
  }
};

// Restore the deleted farmers
const restoreDeletedFarmersSelected = async () => {
  for (const id of deletedFarmerId.value) {
    try {
      // Restore the farmer by setting 'deleted' to false
      await axios.patch(`http://localhost:8055/items/farmers/${id}`, {
        deleted: false,  // Restore the record
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch the updated list of farmers after restoration
      await fetchFarmers();

      // Log activity for the restoration
      const restoredFarmer = farmers.value.find(farmer => farmer.id === id);
      if (restoredFarmer && restoredFarmer.reference_number) {
        const email = localStorage.getItem('email');
        logActivity(email, `Restored farmer with reference number: ${restoredFarmer.reference_number}`);
      }
    } catch (err) {
      alert('Error restoring farmer: ' + err);
    }
  }

  showUndo.value = false;
};

// Fetch Farmers Data
const fetchFarmers = async () => {
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('refresh_token');

  try {
    // First attempt to fetch farmers data using the current access token
    let response = await axios.get('http://localhost:8055/items/farmers', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // If the response status is 401 (Unauthorized), the token might be expired
    if (response.status === 401) {
      // Try refreshing the token
      const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
        refresh_token: refreshToken, // Send the refresh token to get a new access token
      });

      if (refreshResponse.status === 200) {
        // If refresh token is successful, get the new access token and refresh token
        const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshResponse.data.data;

        // Store the new tokens in localStorage
        localStorage.setItem('auth_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        // Retry the original request with the new access token
        response = await axios.get('http://localhost:8055/items/farmers', {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });
      } else {
        alert('Session expired. Please log in again or Refresh to Restore the Token.');
        return;
      }
    }

    // If the response is successful, update the farmers data
    farmers.value = response.data.data;

  } catch (err) {
    console.error('Error fetching farmers:', err);
  }
};

// Watch the searchQuery and reset the page to 1 when it changes
watch(searchQuery, () => {
  currentPage.value = 1;
});
// Get unique farming activities for the filter dropdown
const uniqueActivities = computed(() => {
  const activities = farmers.value.flatMap(farmer => farmer.main_livelihood);
  return [...new Set(activities)];
});
const uniquebarangay = computed(() => {
  const activities = farmers.value.flatMap(farmer => farmer.barangay);
  return [...new Set(activities)];
});
const uniqueGender = computed(() => {
  const activities = farmers.value.flatMap(farmer => farmer.sex);
  return [...new Set(activities)];
});
const uniqueFarmingActivity = computed(() => {
  const activities = farmers.value.flatMap(farmer => farmer.type_of_farming_activity.join(', '));
  return [...new Set(activities)];
});

// Paginate Farmers Data
const filteredFarmers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return farmers.value.filter(farmer => {
    const matchesSearch =
      farmer.reference_number?.toString().includes(query) ||
      farmer.surname?.toLowerCase().includes(query) ||
      farmer.first_name?.toLowerCase().includes(query) ||
      farmer.extension_name?.toLowerCase().includes(query);

    const matchesActivity = selectedMainLivelihood.value
      ? farmer.main_livelihood.includes(selectedMainLivelihood.value)
      : true;

    // Match the selected barangay
    const matchesBarangay = selectedbarangay.value
      ? farmer.barangay === selectedbarangay.value
      : true;
    const matchesGender = selectedGender.value
      ? farmer.sex === selectedGender.value
      : true;
      const matchesFarmingActivity = selectedFarmingActivity.value
      ? farmer.type_of_farming_activity.join(', ') === selectedFarmingActivity.value
      : true;

    return matchesSearch && matchesActivity && matchesBarangay && matchesGender && matchesFarmingActivity;
  });
});


const totalPages = computed(() => {
  return Math.ceil(filteredFarmers.value.length / entriesPerPage.value);
});

const paginatedFarmers = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value;
  const end = currentPage.value * entriesPerPage.value;
  return filteredFarmers.value.slice(start, end);
});

// Change Page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const editFarmer = (id) => {
  router.push(`/edit-farmer/${id}`);
};
// Function to log activity (email, time, and action) to localStorage
const logActivity = async (email, action) => {
  const token = localStorage.getItem('auth_token'); 
  try {
    await axios.post('http://localhost:8055/items/activity_logs', {
      admin_email: email,
      action: action,
      time: new Date().toISOString(),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Increment unread notifications
    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Delete Farmer with Undo
const deleteFarmer = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this farmer?');
  if (!confirmDelete) return;

  const email = localStorage.getItem('email'); // Get the email from localStorage

  try {
    // Fetch the farmer data before deletion
    const deletedFarmer = farmers.value.find(farmer => farmer.id === id);

    // Mark as deleted in the database (soft delete)
    await axios.patch(`http://localhost:8055/items/farmers/${id}`, {
      deleted: true,  // Add a 'deleted' field or use soft delete mechanism in your database
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log activity with email and reference number (before the deletion)
    logActivity(email, `Temporary Deleted farmer with reference number: ${deletedFarmer?.reference_number}`);

    // Update farmers list to reflect the deletion
    farmers.value = farmers.value.filter(farmer => farmer.id !== id);
    alertMessage.value = 'Farmer Deleted Successfully!';

    // Show Undo option
    showUndo.value = true;
    deletedFarmerId.value = id;

    setTimeout(async () => {
      if (showUndo.value) {
        await permanentlyDeleteFarmer(deletedFarmerId.value, deletedFarmer); 
      }
    }, 200000); 

  } catch (err) {
    alert('Error deleting farmer: ' + err);
  }
};

// Permanent Deletion of Farmer
const permanentlyDeleteFarmer = async (id, deletedFarmer) => {
  try {
    // Permanently delete the farmer from the database
    await axios.delete(`http://localhost:8055/items/farmers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log activity for permanent deletion using the reference number
    const email = localStorage.getItem('email');
    logActivity(email, `Permanently deleted farmer with reference number: ${deletedFarmer?.reference_number}`);

    // Update farmers list to reflect the permanent deletion
    farmers.value = farmers.value.filter(farmer => farmer.id !== id);
    alertMessage.value = 'Farmer Permanently Deleted!';

    showUndo.value = false;
  } catch (err) {
    alert('Error permanently deleting farmer: ' + err);
  }
};

// Restore the deleted farmer
const restoreDeletedFarmer = async () => {
  try {
    // Restore the farmer by setting 'deleted' to false
    await axios.patch(`http://localhost:8055/items/farmers/${deletedFarmerId.value}`, {
      deleted: false,  // Set the 'deleted' status to false to restore the record
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Fetch the updated list of farmers after restoration
    await fetchFarmers();

    // Find the restored farmer from the farmers list
    const restoredFarmer = farmers.value.find(farmer => farmer.id === deletedFarmerId.value);

    // Check if restoredFarmer is found and has reference_number
    if (restoredFarmer && restoredFarmer.reference_number) {
      // Log activity for the restoration
      const email = localStorage.getItem('email');
      logActivity(email, `Restored farmer with reference number: ${restoredFarmer.reference_number}`);

      // Show the success message
      alertMessage.value = 'Farmer Restored Successfully!';
    } else {
      console.error('Farmer not found or missing reference number');
    }

    showUndo.value = false;
  } catch (err) {
    alert('Error restoring farmer: ' + err);
  }
};

const closeAlert = () => {
  alertMessage.value = '';
};

const downloadFarmerPDF = () => {
  const filePath = '/src/assets/file/RSBSA_Enrollment-Form_032021.pdf';

  const anchor = document.createElement('a');
  anchor.href = filePath;
  anchor.download = 'RSBSA_Enrollment-Form_032021.pdf';

  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
};

onMounted(fetchFarmers);
</script>


  <style scoped>
  .index-container {
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
    max-height: 80vh;
    overflow-y: auto; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  
  .search-box {
    position: absolute;
    left: 34px; 
    top: 195px; 
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
  border-top: 1px solid white;
  border-bottom: 1px solid white; 
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
    font-size: 1.4rem; /* Increase icon size */
    margin-right: 0.5rem; /* Space between icons */
  }
  
  .edit {
    color: #387e90; /* Green color for edit icon */
  }
  
  .delete {
    color: #e88955; /* Red color for delete icon */
  }
  .btn-danger {
    color: white;
    background: red;
    border: none;
    width: 10%;
    height: 35px;
    border-radius: 5px;
  }
  .download{
    color: #46cab6;
  }
  .option{
    color: white;
  }
  .pagination-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  color: black;
}

.pagination-btn {
  background-color: #387e90;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
}

.pagination-btn:disabled {
  background-color: #888888;
  cursor: not-allowed;
}
.undo-alert button {
  background-color: rgb(206, 206, 14);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}
.undo-alert p {
  color: black;
}
.filter-dropdown {
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
}

.filter-dropdown label {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.filter-dropdown select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: black;
  background-color: #f2f4f7;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.filter-dropdown select:focus {
  border-color: #63e6be;
  box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
}

.filter-dropdown select option {
  background-color: #f2f4f7;
  color: black;
}

.filter-dropdown select option:hover {
  background-color: #44434e;
}
.btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    color: white;
    background-color: #7e4ee6; /* Bootstrap primary color */
    /* border: 1px solid white;  */
    transition: background-color 0.3s;
    position: absolute; /* Position it relative to the nearest positioned ancestor */
    right: 34px; 
    top: 195px; 
}
  .btn:hover {
    background-color: #7e4ee6; /* Darker shade for hover effect */
  }
  h1 {
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
  