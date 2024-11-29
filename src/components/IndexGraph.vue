<template>
  <!-- Farmers Button, Show Entries Dropdown, and Search Input -->
  <div class="d-flex justify-content-between align-items-center mb-3">
    
    <!-- Search Input -->
    <div class="search">
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
    </div>
  </div>

  <!-- Farmers Table -->
  <div class="table-responsive">
    <table class="table">
      <thead class="table-primary">
        <tr>
          <th>RSBA No.</th>
          <th>Surname</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Extension Name</th>
          <!-- <th>Action</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="farmer in paginatedFarmers" :key="farmer.id">
          <td>{{ farmer.reference_number }}</td>
          <td>{{ farmer.surname }}</td>
          <td>{{ farmer.first_name }}</td>
          <td>{{ farmer.middle_name }}</td>
          <td>{{ farmer.extension_name }}</td>
          <!-- <td>
            <button class="action-button edit" @click="editFarmer(farmer.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-button delete" @click="deleteFarmer(farmer.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button class="action-button download" @click="downloadFarmerPDF(farmer.id)">
              <i class="fas fa-download"></i>
            </button>
            <button class="action-button option" @click="(farmer.id)">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Controls -->
  <div class="pagination-controls">
    <p>Rows Per Page: </p>
        <div class="show-entries-dropdown">
          <select id="showEntries" class="form-select" v-model="entriesPerPage" @change="changePage(1)">
            <option value="4">4</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="50">50</option>
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

  <!-- Success Alert -->
  <div v-if="alertMessage" class="alert-box">
    <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
    <h1>Success</h1>
    <p>{{ alertMessage }}</p>
    <button @click="closeAlert">Ok</button>
  </div>

</template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import html2pdf from 'html2pdf.js';
  
  const router = useRouter();
  const farmers = ref([]);
  const entriesPerPage = ref(4);
  const currentPage = ref(1);
  const searchQuery = ref('');
  const token = localStorage.getItem('auth_token');
  const alertMessage = ref('');
  const showUndo = ref(false);
  let deletedFarmerId = ref(null);
  
  // Fetch Farmers Data
  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:8055/items/farmers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      farmers.value = response.data.data;
    } catch (err) {
      console.error('Error fetching farmers:', err);
    }
  };
  
  // Watch the searchQuery and reset the page to 1 when it changes
  watch(searchQuery, () => {
    currentPage.value = 1;
  });
  
  const filteredFarmers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return farmers.value.filter(farmer => {
    // Check if the query matches any property of the farmer object
    const matchesSearch = Object.values(farmer).some(value => {
      if (value && typeof value === 'string') {
        return value.toLowerCase().includes(query);
      }
      if (value && typeof value === 'number') {
        return value.toString().includes(query);
      }
      return false;
    });

    return matchesSearch;
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
      // Mark as deleted in the database (soft delete)
      await axios.patch(`http://localhost:8055/items/farmers/${id}`, {
        deleted: true,  // Add a 'deleted' field or use soft delete mechanism in your database
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Log activity with email and reference number
      const deletedFarmer = farmers.value.find(farmer => farmer.id === id);
      logActivity(email, `Deleted farmer with reference number: ${deletedFarmer?.reference_number}`);
  
      // Update farmers list to reflect the deletion
      farmers.value = farmers.value.filter(farmer => farmer.id !== id);
      alertMessage.value = 'Farmer Deleted Successfully!';
  
      showUndo.value = true;
      deletedFarmerId.value = id;
      setTimeout(() => {
        showUndo.value = false;
      }, 20000);
    } catch (err) {
      alert('Error deleting farmer: ' + err);
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
  
  const downloadFarmerPDF = (id) => {
    const farmer = farmers.value.find(farmer => farmer.id === id);
    if (!farmer) {
      alert('Farmer not found!');
      return;
    }
  
    const element = document.createElement('div');
    element.innerHTML = `
      <div id="farmer-form">
    <div class="text-center">
      <h2>ANI AT KITA <br> RSBSA ENROLLMENT FORM </h2>
      <div class="id-box">
        </div>
      <p style="font-size: 12px; margin: 5px 0;">Registry System for Basic Sectors in Agriculture (RSBSA)</p>
    </div>
    <br>
    <div class="form-section">
      <strong>Enrollment Type & <br> Date of Administered :</strong> <span id="enrollment_type">${farmer.enrollment_type}</span></p>
      <p><strong>Reference Number:</strong> <span id="reference_number">${farmer.reference_number}</span></p>
    </div>
  
    <h3 class="section-title">PART I: PERSONAL INFORMATION</h3>
    <div class="flex-container">
      <div>
        <p><strong>Surname:</strong> <span id="surname">${farmer.surname}</span></p>
        <p><strong>Middle Name:</strong> <span id="middleName">${farmer.middle_name}</span></p>
      </div>
      <div>
        <p><strong>First Name:</strong> <span id="firstName">${farmer.first_name}</span></p>
        <p><strong>Extension Name:</strong> <span id="extension_name">${farmer.extension_name}</span><strong> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        Sex :</strong> <span id="sex">${farmer.sex}</span></p>
      </div>
    </div>
    <br>
    <hr />
    <div class="form-section">
      <p><strong>ADDRESS:&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        House/Lot/BLDG/No.Purok :</strong> <span id="house_lot_bldg_no_purok">${farmer.house_lot_bldg_no_purok}</span>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        Street/Sitio/Subdv :</strong> <span id="street_sitio_subdv">${farmer.street_sitio_subdv}</span>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        Barangay :</strong> <span id="barangay">${farmer.barangay}</span></p></strong></p>
  
      <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        Municipality/City :</strong> <span id="municipality_city">${farmer.municipality_city}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        Province :</strong> <span id="province">${farmer.province}</span>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Region :</strong> <span id="region">${farmer.region}</span></p></strong></p>
    </div>
    <br>
    <hr />
  <hr class="vertical-line">
    <div class="vertical-hr-left">
      <p><strong>Mobile Number:</strong> <span id="mobile_number">${farmer.mobile_number}</span>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Landline Number:</strong> <span id="landline_number">${farmer.landline_number}</span></p>
      <br>
      <p><strong>Date Of Birth:</strong> <span id="date_of_birth">${farmer.date_of_birth}</span>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Place Of Birth:</strong> <span id="place_of_birth">${farmer.place_of_birth}</span></p>
      <br>
      <p><strong>Religion:</strong> <span id="religion">${farmer.religion}</span></p>
      <br>
      <p><strong>Civil Status:</strong> <span id="civil_status">${farmer.civil_status}</span></p>
      <br>
      <p><strong>Name Of Spouse If Married:</strong> <span id="name_of_spouse_if_married">${farmer.name_of_spouse_if_married}</span></p>
  
      </div>
  
    <h3 class="section-title">PART II: FARM PROFILE</h3>
    <div class="form-section">
      <p><strong>Main Livelihood:</strong> Farmer / Farmworker / Laborer / Fisherfolk / Agri Youth</p>
      <p><strong>Type of Farming Activity:</strong> ${farmer.type_of_farming_activity.join(', ')}</p>
    </div>
  
    <p class="form-footer">This form is not for sale</p>
  
  <style scoped>
  /* farmer-form.css */
  #farmer-form {
    font-family: Arial, sans-serif;
    color: black;
    max-width: 800px; /* Set max width */
    height: auto; /* Let height adjust based on content */
    border: 1px solid #000;
    padding: 10px; /* Reduced padding */
    margin: 10px auto; /* Smaller margin around the box */
    box-sizing: border-box;
    overflow: auto;
  }
  
  
  #farmer-form .text-center {
    margin-left: 100px;
    font-weight: bold;
  }
  
  #farmer-form h2 {
    margin: 0;
    margin-bottom: -10px; 
    font-size: 24px;  
    font-weight: bold; 
    color: #333;    
  }
  
  #farmer-form .form-header {
    font-size: 12px;
    margin: 5px 0;
  }
  
  #farmer-form .section-title {
    background: black;
    padding: .5px;
    margin-top: 20px;
    color: white;
    font-size: 12px;
    margin-bottom: 10px; 
  }
  
  #farmer-form .form-section {
    margin-top: 10px;
    font-size: 12px;
  }
  
  #farmer-form .flex-container {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  
  #farmer-form .flex-container div {
    width: 48%;
  }
  
  #farmer-form .form-section p {
    margin: 5px 0;
  }
  
  #farmer-form .form-footer {
    font-size: 10px;
    margin-top: 20px;
    text-align: center;
  }
  .vertical-line {
    border: none;
    border-left: 2px solid #000; /* Adjust thickness and color */
    height: 200px; /* Adjust the height of the vertical line */
    width: 0; /* Set width to 0 to make it vertical */
    margin: 0; /* Optional: Adjust margin if needed */
    margin-left: 400px;
  }
  .vertical-hr-left {
    color: black;
    font-size: 12px; 
    margin-top: -195px;
  }
    .id-box {
    width: 200px; /* Adjust size as needed */
    height: 200px;
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    margin-left: 470px;
    margin-top: -70px;
  }
  <style>
    `;
  
    const options = {
      filename: `farmer_${farmer.reference_number}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'legal', orientation: 'portrait' },
    };
  
    html2pdf().from(element).set(options).save();
  };
  onMounted(fetchFarmers);
  </script>
  
  
    <style scoped>
    
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
      background: #F8F9FA;
      padding: 0 2px;
    }
    
    .search-box {
      display: flex;
      top: 2rem;
      right: 0rem;
      width: 200px;
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
    background-color: #F8F9FA;
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
  border-top: 1px solid #F8F9FA;
  border-bottom: 1px solid #F8F9FA; 
}
    
    .table th {
      font-weight: bold;
    }
    
    /* New style for table data text */
    .table td {
      color: black; /* Set text color to black */
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
  #showEntries {
  width: 100%; 
  max-width: 100px; 
  padding: 0.5rem; 
  border-radius: 6px; 
  font-size: 1rem; 
  background-color: white; 
  color: black; 
  outline: none; 
  transition: border 0.3s ease-in-out; 
  margin-left: 15px;
}

#showEntries:focus {
  border-color: #63e6be;
  box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
}

#showEntries:hover {
  background-color: white;
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
    
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      color: white;
      background-color: #343248; /* Bootstrap primary color */
      border: 1px solid white; /* Light border */
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: #343248; /* Darker shade for hover effect */
    }
    </style>
    