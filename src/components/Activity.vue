<template>
  <div class="index-container">
    <Navbar />
    <div class="content-box">
      <h1>User Activity Log</h1>
      <div v-if="isAdmin" class="admin-actions mb-3">
        <button @click="performAdminAction" class="admin-action-btn">Admin Action</button>
      </div>
      <div class="search">
        <div class="input-field1 search-box">
          <input type="date" v-model="searchFrom" name="searchFrom" id="searchFrom" />
          <label for="searchFrom">From Date:</label>
        </div>
        <div class="input-field1 search-box">
          <input type="date" v-model="searchTo" name="searchTo" id="searchTo" />
          <label for="searchTo">To Date:</label>
        </div>
      </div>
      <div class="pagination-controls mb-3">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-btn">
          Previous
        </button>
        <span style="color: black;">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-btn">
          Next
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead class="table-primary">
            <tr>
              <th>Email</th>
              <th>Action</th>
              <th>Activity Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(activity, index) in paginatedActivities" :key="index">
              <td>{{ activity.admin_email }}</td>
              <td>{{ activity.action }}</td>
              <td>{{ new Date(activity.time).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'; // Ensure you have axios imported
import Navbar from './Navbar.vue';

const activities = ref([]);
const searchFrom = ref('');
const searchTo = ref('');
const alertMessage = ref('');
const currentPage = ref(1);
const entriesPerPage = ref(100);
const isAdmin = ref(false);

const fetchActivities = async () => {
  try {
    const token = localStorage.getItem('auth_token'); // Retrieve token
    const response = await axios.get('http://localhost:8055/items/activity_logs', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: Number.MAX_SAFE_INTEGER
      }
    });
    activities.value = response.data.data; // Populate activities
  } catch (error) {
    console.error('Failed to fetch activities:', error);
  }
};


onMounted(() => {
  fetchActivities(); // Fetch activities when the component is mounted

  const userRole = localStorage.getItem('userRole'); 
  isAdmin.value = userRole === 'admin';
});

// Computed property for filtered activities based on date range
const filteredActivities = computed(() => {
  let filtered = activities.value;

  if (searchFrom.value && searchTo.value) {
    const fromDate = new Date(searchFrom.value).setHours(0, 0, 0, 0);
    const toDate = new Date(searchTo.value).setHours(23, 59, 59, 999);

    filtered = filtered.filter(activity => {
      const activityDate = new Date(activity.time).getTime();
      return activityDate >= fromDate && activityDate <= toDate;
    });
  }

  return filtered;
});

// Pagination logic
const totalPages = computed(() => Math.ceil(filteredActivities.value.length / entriesPerPage.value));
const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value;
  const end = start + entriesPerPage.value;
  return filteredActivities.value.slice(start, end);
});

// Change page function
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Admin action
const performAdminAction = () => {
  alertMessage.value = "Admin action performed!";
};


// Success alert functionality
const closeAlert = () => {
  alertMessage.value = '';
};
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
  border: 1px solid #f2f4f7;
  border-radius: 8px;
  max-height: 80vh; /* Set a max height for the content box */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 26px;
  margin-bottom: 20px;
  color: black; /* Title color */
}

/* Style the admin action button */
.admin-actions {
  margin-bottom: 1.5rem;
}

.admin-action-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

/* Search Input */
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
  border: 2px solid #f2f4f7;
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

.table th,
.table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid black;
}

.table th {
  font-weight: bold;
}

/* New style for table data text */
.table td {
  color: black; /* Set text color to white */
}

/* Pagination controls */
.pagination-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  color: white;
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

/* Success alert */
.alert-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.alert-box h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.alert-box p {
  font-size: 18px;
}

.alert-box button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action-button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.5rem; /* Increase icon size */
    margin-right: 0.5rem; /* Space between icons */
  }
  
  .delete {
    color: #e88955; /* Red color for delete icon */
  }
  .search {
    display: flex;
  }
  .search-box
 {
  padding-left: 10px;
 }
 </style>
