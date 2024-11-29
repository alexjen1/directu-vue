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
                <!-- <button class="action-button download" @click="downloadFarmerPDF(farmer.id)">
                  <i class="fas fa-download"></i>
                </button> -->
                <!-- <button class="action-button edit" @click="showFarmer(farmer.id)">
                  <i class="fas fa-eye"></i>
                </button> -->
                <!-- Option Button -->
                <button class="action-button option" @click="toggleOptions(farmer.id)">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

                <!-- Option Text that will appear below -->
                <div v-if="showOptions[farmer.id]" class="option-text">
                  <button1 @click="downloadFarmerPDF(farmer.id)"><i class="fas fa-download"></i> Download</button1>
                  <br>
                  <!-- <button1 @click="showFarmer(farmer.id)"><i class="fas fa-book"></i> Show</button1> -->
                  <button1 @click="showMaintenance">
                    <i class="fas fa-book"></i> Show
                  </button1>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="d-flex justify-content-end">
        <button v-if="selectedFarmers.length > 0" @click="deleteSelectedFarmers" class=" btn-danger">
          <i class="fas fa-trash-alt selecteddelete"></i> Delete Selected Farmers
        </button>
        <button v-if="selectedFarmers.length > 0" @click="downloadSelectedFarmersPDF" class="btn-warning">
          <i class="fas fa-download"></i> Download Selected Farmers
        </button>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <p>Rows Per Page: </p>
        <div class="show-entries-dropdown">
          <select id="showEntries" class="form-select" v-model="entriesPerPage" @change="changePage(1)">
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
      <br>
      <div v-if="showUndoSelected" class="undo-alert">
        <p>Farmer deleted! <button @click="restoreDeletedFarmersSelected">Undo Selected</button></p>
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';
// import html2pdf from 'html2pdf.js';

const router = useRouter();
const farmers = ref([]);
const entriesPerPage = ref(10);
const currentPage = ref(1);
const searchQuery = ref('');
const token = localStorage.getItem('auth_token');
const alertMessage = ref('');
const showUndo = ref(false);
const showUndoSelected = ref(false);
let deletedFarmerId = ref(null);
const selectedMainLivelihood = ref(''); 
const selectedbarangay = ref(''); 
const selectedGender = ref(''); 
const selectedFarmingActivity = ref(''); 
const selectedFarmers = ref([]);

const showOptions = ref({}); 

// Method to toggle options dropdown for a specific farmer
const toggleOptions = (farmerId) => {
  // Check if the current farmer's dropdown is already open
  const isCurrentlyVisible = showOptions.value[farmerId];

  // Close all dropdowns
  Object.keys(showOptions.value).forEach((key) => {
    showOptions.value[key] = false;
  });

  // Toggle the current farmer's dropdown based on its previous state
  showOptions.value[farmerId] = !isCurrentlyVisible;
};
const showMaintenance = () => {
  alert('This feature is currently under maintenance. Please try again later.');
};

// Method to hide all options when clicking outside
const hideAllOptions = () => {
  Object.keys(showOptions.value).forEach((key) => {
    showOptions.value[key] = false;
  });
};

// Listen for outside clicks
const handleClickOutside = (event) => {
  const dropdowns = document.querySelectorAll('.option-text, .action-button.option');
  let clickedInside = false;

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      clickedInside = true;
    }
  });

  if (!clickedInside) {
    hideAllOptions(); // Hide all options if clicked outside
  }
};

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
    for (const farmer of farmersToDelete) {
      await axios.patch(`http://localhost:8055/items/farmers/${farmer.id}`, {
        deleted: true,  
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      logActivity(email, `Temporary Deleted farmer with reference number: ${farmer.reference_number}`);
    }

    farmers.value = farmers.value.filter(farmer => !selectedFarmers.value.includes(farmer.id));
    alertMessage.value = 'Selected farmers have been deleted!';

    showUndoSelected.value = true;
    deletedFarmerId.value = farmersToDelete.map(farmer => farmer.id); 

    setTimeout(async () => {
      if (showUndoSelected.value) {
        for (const id of deletedFarmerId.value) {
          const farmerToPermanentlyDelete = farmersToDelete.find(farmer => farmer.id === id);
          await permanentlyDeleteFarmerSelected(id, farmerToPermanentlyDelete);
        }
      }
    }, 10000); 

    selectedFarmers.value = [];
  } catch (err) {
    console.error('Error deleting selected farmers:', err);
    alertMessage.value = 'Error occurred while deleting selected farmers.';
  }
};
// Permanent Deletion of Farmer
const permanentlyDeleteFarmerSelected = async (id, deletedFarmer) => {
  try {
    await axios.delete(`http://localhost:8055/items/farmers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Log activity for permanent deletion using the reference number
    const email = localStorage.getItem('email');
    logActivity(email, `Permanently deleted farmer with reference number: ${deletedFarmer?.reference_number}`);

    farmers.value = farmers.value.filter(farmer => farmer.id !== id);
    alertMessage.value = 'Farmer Permanently Deleted!';

    showUndoSelected.value = false;
  } catch (err) {
    alert('Error permanently deleting farmer: ' + err);
  }
};

const restoreDeletedFarmersSelected = async () => {
  for (const id of deletedFarmerId.value) {
    try {
      await axios.patch(`http://localhost:8055/items/farmers/${id}`, {
        deleted: false,  // Restore the record
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFarmers();
      const restoredFarmer = farmers.value.find(farmer => farmer.id === id);
      if (restoredFarmer && restoredFarmer.reference_number) {
        const email = localStorage.getItem('email');
        logActivity(email, `Restored farmer with reference number: ${restoredFarmer.reference_number}`);
      }
    } catch (err) {
      alert('Error restoring farmer: ' + err);
    }
  }

  showUndoSelected.value = false;
};

const downloadSelectedFarmersPDF = async () => {
  const confirmDelete = confirm('Are you sure you want to download the selected farmers?');
  if (!confirmDelete) return;
  if (selectedFarmers.value.length === 0) {
    alert('No farmers selected for download!');
    return;
  }
  for (const farmerId of selectedFarmers.value) {
    await downloadFarmerPDF(farmerId);
  }
  
};

// Fetch Farmers Data
const fetchFarmers = async () => {
  let token = localStorage.getItem('auth_token');
  let refreshToken = localStorage.getItem('refresh_token');

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
      } else if (refreshResponse.status === 401) {
        // If the refresh token is also expired, request new tokens
        const newTokenResponse = await axios.post('http://localhost:8055/auth/request-new-tokens');

        if (newTokenResponse.status === 200) {
          const { access_token: latestAccessToken, refresh_token: latestRefreshToken } = newTokenResponse.data.data;

          // Store the new tokens in localStorage
          localStorage.setItem('auth_token', latestAccessToken);
          localStorage.setItem('refresh_token', latestRefreshToken);

          // Retry the original request with the latest access token
          response = await axios.get('http://localhost:8055/items/farmers', {
            headers: { Authorization: `Bearer ${latestAccessToken}` },
          });
        } else {
          alert('Session expired. Please log in again.');
          return;
        }
      } else {
        alert('Session expired. Please log in again.');
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

    // Match the selected main livelihood
    const matchesActivity = selectedMainLivelihood.value
      ? farmer.main_livelihood.includes(selectedMainLivelihood.value)
      : true;

    // Match the selected barangay
    const matchesBarangay = selectedbarangay.value
      ? farmer.barangay === selectedbarangay.value
      : true;

    // Match the selected gender
    const matchesGender = selectedGender.value
      ? farmer.sex === selectedGender.value
      : true;

    // Match the selected farming activity
    const matchesFarmingActivity = selectedFarmingActivity.value
      ? farmer.type_of_farming_activity.join(', ').toLowerCase().includes(selectedFarmingActivity.value.toLowerCase())
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
const showFarmer = (id) => {
  router.push(`/show-farmer/${id}`);
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
    }, 10000); 

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

const downloadFarmerPDF = async (id) => {
  // Find the farmer using their ID
  const farmer = farmers.value.find(farmer => farmer.id === id);
  if (!farmer) {
    alert('Farmer not found!');
    return;
  }
  const {
  enrollment_type,
  reference_number,
  surname,
  first_name,
  middle_name,
  extension_name,
  sex,
  house_lot_bldg_no_purok,
  street_sitio_subdv,
  barangay,
  municipality_city,
  province,
  region,
  mobile_number,
  place_of_birth,
  place_of_birth_province_state,
  place_of_birth_country,
  religion,
  civil_status,
  name_of_spouse_if_married,
  mothers_maiden_name,
  household_heads,
  if_no_name_of_household_heads,
  relationship,
  no_of_living_household_members,
  no_of_male,
  no_of_female,
  highest_formal_education,
  person_with_disability,
  IVps_beneficiary,
  member_of_an_indiginous_group,
  member_of_an_indiginous_group_if_yes_specify,
  with_government_id,
  if_yes_specify_id_type,
  id_number,
  member_of_any_farmers_association_cooperative,
  if_yes_spefify_farmers_association,
  person_to_notify_in_case_of_emergency,
  main_livelihood,
  type_of_farming_activity,
  farmworkers_kind_of_work,
  for_fisherfolk,
  for_agri_youth,
  other_crop_specify,
  livestock_specify,
  poultry_specify,
  for_farmworkers_other,
  for_fishfolk_other,
  farm_location_brgy1,
  farm_location_city_muni1,
  ownership_document_no_1,
  tenant_1,
  lessee_1,
  ancestral_domain_1,
  agrarian_reform_1,
  registered_owner_1,
  crop_commodity1_1,
  crop_commodity1_2,
  crop_commodity1_3,
  crop_commodity1_4,
  crop_commodity1_5,
  sizeHa1_1,
  sizeHa1_2,
  sizeHa1_3,
  sizeHa1_4,
  sizeHa1_5,
  no_of_head1_1,
  no_of_head1_2,
  no_of_head1_3,
  no_of_head1_4,
  no_of_head1_5,
  farm_type1,
  organic_practitioner1,
  farm_location_brgy2,
  farm_location_city_muni2,
  ownership_document_no_2,
  tenant_2,
  lessee_2,
  ancestral_domain_2,
  agrarian_reform_2,
  registered_owner_2,
  crop_commodity2_1,
  crop_commodity2_2,
  crop_commodity2_3,
  crop_commodity2_4,
  crop_commodity2_5,
  sizeHa2_1,
  sizeHa2_2,
  sizeHa2_3,
  sizeHa2_4,
  sizeHa2_5,
  no_of_head2_1,
  no_of_head2_2,
  no_of_head2_3,
  no_of_head2_4,
  no_of_head2_5,
  farm_type2,
  organic_practitioner2,
  farm_location_brgy3,
  farm_location_city_muni3,
  ownership_document_no_3,
  tenant_3,
  lessee_3,
  ancestral_domain_3,
  agrarian_reform_3,
  registered_owner_3,
  crop_commodity3_1,
  crop_commodity3_2,
  crop_commodity3_3,
  crop_commodity3_4,
  crop_commodity3_5,
  sizeHa3_1,
  sizeHa3_2,
  sizeHa3_3,
  sizeHa3_4,
  sizeHa3_5,
  no_of_head3_1,
  no_of_head3_2,
  no_of_head3_3,
  no_of_head3_4,
  no_of_head3_5,
  farm_type3,
  organic_practitioner3,
} = farmer;

  // Path to the existing PDF
  const filePath = '/src/assets/file/RSBSA_Enrollment-Form_032021.pdf';

  // Fetch the existing PDF
  const existingPdfBytes = await fetch(filePath).then(res => res.arrayBuffer());

  // Load the PDF into PDF-lib
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Get the first page of the PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const secondPage = pages[1];
  
  const totalSize = 
  (parseFloat(sizeHa1_1) || 0) + 
  (parseFloat(sizeHa1_2) || 0) + 
  (parseFloat(sizeHa1_3) || 0) + 
  (parseFloat(sizeHa1_4) || 0) + 
  (parseFloat(sizeHa1_5) || 0);

const totalSize2 = 
  (parseFloat(sizeHa2_1) || 0) + 
  (parseFloat(sizeHa2_2) || 0) + 
  (parseFloat(sizeHa2_3) || 0) + 
  (parseFloat(sizeHa2_4) || 0) + 
  (parseFloat(sizeHa2_5) || 0);

const totalSize3 = 
  (parseFloat(sizeHa3_1) || 0) + 
  (parseFloat(sizeHa3_2) || 0) + 
  (parseFloat(sizeHa3_3) || 0) + 
  (parseFloat(sizeHa3_4) || 0) + 
  (parseFloat(sizeHa3_5) || 0);


  // Add the farmer's surname to the PDF
if (enrollment_type === "New") {
    firstPage.drawText("/", {
    x: 110, 
    y: 771, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (enrollment_type === "Updating") {
    firstPage.drawText("/", {
    x: 154, 
    y: 771, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${surname}`, {
    x: 110, // (width)
    y: 715, //  (height)
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${first_name}`, {
    x: 300, 
    y: 715, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${middle_name}`, {
    x: 110, 
    y: 687, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${extension_name}`, {
    x: 300, 
    y: 687, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
if (sex === "male") {
    firstPage.drawText("/", {
    x: 457, 
    y: 676,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sex === "female") {
    firstPage.drawText("/", {
    x: 506, 
    y: 676,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${house_lot_bldg_no_purok}`, {
    x: 72, 
    y: 655, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${street_sitio_subdv}`, {
    x: 242, 
    y: 655, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${barangay}`, {
    x: 412, 
    y: 655, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${municipality_city}`, {
    x: 72, 
    y: 625, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${province}`, {
    x: 242, 
    y: 625, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${region}`, {
    x: 412, 
    y: 625, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${mobile_number}`, {
    x: 35, 
    y: 591, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${place_of_birth}`, {
    x: 205, 
    y: 568,  
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${place_of_birth_province_state}`, {
    x: 155, 
    y: 556,  
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${place_of_birth_country}`, {
    x: 240, 
    y: 556,  
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
if (religion === "christianity") {
    firstPage.drawText("/", {
    x: 79,  
    y: 525,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (religion === "islam") {
    firstPage.drawText("/", {
    x: 139,  
    y: 525,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (civil_status === "single") {
    firstPage.drawText("/", {
    x: 95,   
    y: 506,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (civil_status === "married") {
    firstPage.drawText("/", {
    x: 140,   
    y: 506,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (civil_status === "widowed") {
    firstPage.drawText("/", {
    x: 189,   
    y: 506,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (civil_status === "separated") {
    firstPage.drawText("/", {
    x: 243,   
    y: 506,
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${name_of_spouse_if_married}`, {
    x: 110, 
    y: 485, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${mothers_maiden_name}`, {
    x: 110, 
    y: 455, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
if (household_heads === "yes") {
    firstPage.drawText("/", {
    x: 136, 
    y: 435, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (household_heads === "no") {
    firstPage.drawText("/", {
    x: 179, 
    y: 435, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${if_no_name_of_household_heads}`, {
    x: 155, 
    y: 420, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${relationship}`, {
    x: 155, 
    y: 403, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${no_of_living_household_members}`, {
    x: 155, 
    y: 385, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${no_of_male}`, {
    x: 100, 
    y: 368, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${no_of_female}`, {
    x: 245, 
    y: 368, 
    size: 10,
    color: rgb(0, 0, 0), // Black color
  });
if (highest_formal_education === "pre-school") {
    firstPage.drawText("/", {
    x: 317, 
    y: 586, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "junior high school (K-12)") {
    firstPage.drawText("/", {
    x: 405, 
    y: 586, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "vocational") {
    firstPage.drawText("/", {
    x: 501, 
    y: 586, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "elementary") {
    firstPage.drawText("/", {
    x: 317, 
    y: 574, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "senior high school (K-12)") {
    firstPage.drawText("/", {
    x: 405, 
    y: 574, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "post-graduate") {
    firstPage.drawText("/", {
    x: 501, 
    y: 574, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "high school (non K-12)") {
    firstPage.drawText("/", {
    x: 317, 
    y: 562, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "college") {
    firstPage.drawText("/", {
    x: 405, 
    y: 562, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (highest_formal_education === "none") {
    firstPage.drawText("/", {
    x: 501, 
    y: 562, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (person_with_disability === "yes") {
    firstPage.drawText("/", {
    x: 454, 
    y: 541, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (person_with_disability === "no") {
    firstPage.drawText("/", {
    x: 496, 
    y: 541, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (IVps_beneficiary === "yes") {
    firstPage.drawText("/", {
    x: 452, 
    y: 518, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (IVps_beneficiary === "no") {
    firstPage.drawText("/", {
    x: 494, 
    y: 518, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (member_of_an_indiginous_group === "yes") {
    firstPage.drawText("/", {
    x: 452, 
    y: 504, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (member_of_an_indiginous_group_if_yes_specify) {
  firstPage.drawText(` ${member_of_an_indiginous_group_if_yes_specify}`, {
    x: 380, 
    y: 490,
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (member_of_an_indiginous_group === "no") {
    firstPage.drawText("/", {
    x: 494, 
    y: 504, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (with_government_id === "yes") {
    firstPage.drawText("/", {
    x: 400, 
    y: 469, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (with_government_id === "no") {
    firstPage.drawText("/", {
    x: 441, 
    y: 469, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${if_yes_specify_id_type}`, {
    x: 400, 
    y: 460, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${id_number}`, {
    x: 400, 
    y: 448, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
if (member_of_any_farmers_association_cooperative === "yes") {
    firstPage.drawText("/", {
    x: 504, 
    y: 430, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (member_of_any_farmers_association_cooperative === "no") {
    firstPage.drawText("/", {
    x: 539, 
    y: 430, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${if_yes_spefify_farmers_association}`, {
    x: 370, 
    y: 415, 
    size: 10,
    color: rgb(0, 0, 0), 
  });
  firstPage.drawText(` ${person_to_notify_in_case_of_emergency}`, {
    x: 400, 
    y: 390, 
    size: 10,
    color: rgb(0, 0, 0), 
  });
if (Array.isArray(main_livelihood) && main_livelihood.includes("farmer")) {
  firstPage.drawText("/", {
    x: 124, 
    y: 332, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(main_livelihood) && main_livelihood.includes("farmworker/laborer")) {
  firstPage.drawText("/", {
    x: 212, 
    y: 332, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(main_livelihood) && main_livelihood.includes("fisherfolk")) {
  firstPage.drawText("/", {
    x: 361, 
    y: 332, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(main_livelihood) && main_livelihood.includes("agri youth")) {
  firstPage.drawText("/", {
    x: 481, 
    y: 332, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(type_of_farming_activity) && type_of_farming_activity.includes("rice")) {
  firstPage.drawText("/", {
    x: 35, 
    y: 285, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(type_of_farming_activity) && type_of_farming_activity.includes("corn")) {
  firstPage.drawText("/", {
    x: 35, 
    y: 268, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(type_of_farming_activity) && type_of_farming_activity.includes("other_crop")) {
  firstPage.drawText("/", {
    x: 35, 
    y: 251, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(type_of_farming_activity) && type_of_farming_activity.includes("livestock")) {
  firstPage.drawText("/", {
    x: 35, 
    y: 225, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(type_of_farming_activity) && type_of_farming_activity.includes("poultry")) {
  firstPage.drawText("/", {
    x: 35, 
    y: 202, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(farmworkers_kind_of_work) && farmworkers_kind_of_work.includes("land preparation")) {
  firstPage.drawText("/", {
    x: 216, 
    y: 283, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(farmworkers_kind_of_work) && farmworkers_kind_of_work.includes("planting / transplanting")) {
  firstPage.drawText("/", {
    x: 216, 
    y: 265, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(farmworkers_kind_of_work) && farmworkers_kind_of_work.includes("cultivation")) {
  firstPage.drawText("/", {
    x: 216, 
    y: 250, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(farmworkers_kind_of_work) && farmworkers_kind_of_work.includes("harvesting")) {
  firstPage.drawText("/", {
    x: 216, 
    y: 233, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${other_crop_specify}`, {
    x: 100, 
    y: 245, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${livestock_specify}`, {
    x: 100, 
    y: 220, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${poultry_specify}`, {
    x: 100, 
    y: 195, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
if (Array.isArray(for_fisherfolk) && for_fisherfolk.includes("fish capture")) {
  firstPage.drawText("/", {
    x: 333, 
    y: 240, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_fisherfolk) && for_fisherfolk.includes("aquaculture")) {
  firstPage.drawText("/", {
    x: 333, 
    y: 229, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_fisherfolk) && for_fisherfolk.includes("gleaning")) {
  firstPage.drawText("/", {
    x: 333, 
    y: 218, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_fisherfolk) && for_fisherfolk.includes("fish processing")) {
  firstPage.drawText("/", {
    x: 399, 
    y: 240, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_fisherfolk) && for_fisherfolk.includes("fish vending")) {
  firstPage.drawText("/", {
    x: 399, 
    y: 229, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_agri_youth) && for_agri_youth.includes("part of a farming household")) {
  firstPage.drawText("/", {
    x: 474, 
    y: 257, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_agri_youth) && for_agri_youth.includes("attending attended formal agri fishery related course")) {
  firstPage.drawText("/", {
    x: 474, 
    y: 248, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_agri_youth) && for_agri_youth.includes("attending attended non formal agri fishery related course")) {
  firstPage.drawText("/", {
    x: 474, 
    y: 231, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (Array.isArray(for_agri_youth) && for_agri_youth.includes("participated in any agricultural activity program")) {
  firstPage.drawText("/", {
    x: 474, 
    y: 214, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
  firstPage.drawText(` ${surname}`, {
    x: 110, // (width)
    y: 75, //  (height)
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${first_name}`, {
    x: 300, 
    y: 75, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${middle_name}`, {
    x: 110, 
    y: 46, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${extension_name}`, {
    x: 300, 
    y: 46, 
    size: 12,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${for_farmworkers_other}`, {
    x: 220, 
    y: 195, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });
  firstPage.drawText(` ${for_fishfolk_other}`, {
    x: 330, 
    y: 195, 
    size: 8,
    color: rgb(0, 0, 0), // Black color
  });

  if (farm_location_brgy1) {
  secondPage.drawText(` ${farm_location_brgy1}`, {
    x: 140,
    y: 788,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (farm_location_city_muni1) {
  secondPage.drawText(` ${farm_location_city_muni1}`, {
    x: 140,
    y: 777,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (ownership_document_no_1) {
  secondPage.drawText(` ${ownership_document_no_1}`, {
    x: 135,
    y: 742,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (totalSize) {
  secondPage.drawText(` ${totalSize}`, {
    x: 145,
    y: 760,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (tenant_1) {
  secondPage.drawText(` ${tenant_1}`, {
    x: 160,
    y: 707,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (lessee_1) {
  secondPage.drawText(` ${lessee_1}`, {
    x: 160,
    y: 697,
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_1 === "yes") {
  secondPage.drawText("/", {
    x: 180,
    y: 750, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_1 === "no") {
  secondPage.drawText("/", {
    x: 222,
    y: 750, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (agrarian_reform_1 === "yes") {
  secondPage.drawText("/", {
    x: 180,
    y: 730, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (agrarian_reform_1 === "no") {
  secondPage.drawText("/", {
    x: 222,
    y: 730, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (registered_owner_1 === "Register Owner") {
  secondPage.drawText("/", {
    x: 63,
    y: 715, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity1_1) {
  secondPage.drawText(` ${crop_commodity1_1}`, {
    x: 275,
    y: 783,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity1_2) {
  secondPage.drawText(` ${crop_commodity1_2}`, {
    x: 275,
    y: 760,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity1_3) {
  secondPage.drawText(` ${crop_commodity1_3}`, {
    x: 275,
    y: 737,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity1_4) {
  secondPage.drawText(` ${crop_commodity1_4}`, {
    x: 275,
    y: 717,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity1_5) {
  secondPage.drawText(` ${crop_commodity1_5}`, {
    x: 275,
    y: 695,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa1_1) {
  secondPage.drawText(` ${sizeHa1_1}`, {
    x: 360,
    y: 783,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa1_2) {
  secondPage.drawText(` ${sizeHa1_2}`, {
    x: 360,
    y: 760,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa1_3) {
  secondPage.drawText(` ${sizeHa1_3}`, {
    x: 360,
    y: 737,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa1_4) {
  secondPage.drawText(` ${sizeHa1_4}`, {
    x: 360,
    y: 717,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa1_5) {
  secondPage.drawText(` ${sizeHa1_5}`, {
    x: 360,
    y: 695,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head1_1) {
  secondPage.drawText(` ${no_of_head1_1}`, {
    x: 400,
    y: 783,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head1_2) {
  secondPage.drawText(` ${no_of_head1_2}`, {
    x: 400,
    y: 760,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head1_3) {
  secondPage.drawText(` ${no_of_head1_3}`, {
    x: 400,
    y: 737,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head1_4) {
  secondPage.drawText(` ${no_of_head1_4}`, {
    x: 400,
    y: 717,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head1_5) {
  secondPage.drawText(` ${no_of_head1_5}`, {
    x: 400,
    y: 695,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (farm_type1) {
  secondPage.drawText(` ${farm_type1}`, {
    x: 440,
    y: 783,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (organic_practitioner1) {
  secondPage.drawText(` ${organic_practitioner1}`, {
    x: 480,
    y: 783,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (farm_location_brgy2) {
  secondPage.drawText(` ${farm_location_brgy2}`, {
    x: 140, // (width)
    y: 682, // (height)
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (farm_location_city_muni2) {
  secondPage.drawText(` ${farm_location_city_muni2}`, {
    x: 140, 
    y: 670, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (ownership_document_no_2) {
  secondPage.drawText(` ${ownership_document_no_2}`, {
    x: 135, 
    y: 635, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}

if (totalSize2) {
  secondPage.drawText(` ${totalSize2}`, {
    x: 145, 
    y: 653, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (tenant_2) {
  secondPage.drawText(` ${tenant_2}`, {
    x: 160, 
    y: 600, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (lessee_2) {
  secondPage.drawText(` ${lessee_2}`, {
    x: 160, 
    y: 590, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_2 === "yes") {
  secondPage.drawText("/", {
    x: 180,
    y: 643, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_2 === "no") {
  secondPage.drawText("/", {
    x: 222,
    y: 643, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (agrarian_reform_2 === "yes") {
  secondPage.drawText("/", {
    x: 180,
    y: 623, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}if (agrarian_reform_2 === "no") {
  secondPage.drawText("/", {
    x: 222,
    y: 623, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (registered_owner_2 === "Register Owner") {
  secondPage.drawText("/", {
    x: 63,
    y: 609, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity2_1) {
  secondPage.drawText(` ${crop_commodity2_1}`, {
    x: 275, // (width)
    y: 677, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity2_2) {
  secondPage.drawText(` ${crop_commodity2_2}`, {
    x: 275, // (width)
    y: 654, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity2_3) {
  secondPage.drawText(` ${crop_commodity2_3}`, {
    x: 275, // (width)
    y: 631, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity2_4) {
  secondPage.drawText(` ${crop_commodity2_4}`, {
    x: 275, // (width)
    y: 610, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity2_5) {
  secondPage.drawText(` ${crop_commodity2_5}`, {
    x: 275, // (width)
    y: 588, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa2_1) {
  secondPage.drawText(` ${sizeHa2_1}`, {
    x: 360,
    y: 677, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa2_2) {
  secondPage.drawText(` ${sizeHa2_2}`, {
    x: 360,
    y: 654,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa2_3) {
  secondPage.drawText(` ${sizeHa2_3}`, {
    x: 360,
    y: 633,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (sizeHa2_4) {
  secondPage.drawText(` ${sizeHa2_4}`, {
    x: 360,
    y: 612,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa2_5) {
  secondPage.drawText(` ${sizeHa2_5}`, {
    x: 360,
    y: 590,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (no_of_head2_1 > 0) {
  secondPage.drawText(` ${no_of_head2_1}`, {
    x: 400,
    y: 677,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head2_2 > 0) {
  secondPage.drawText(` ${no_of_head2_2}`, {
    x: 400,
    y: 654,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head2_3 > 0) {
  secondPage.drawText(` ${no_of_head2_3}`, {
    x: 400,
    y: 633,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head2_4 > 0) {
  secondPage.drawText(` ${no_of_head2_4}`, {
    x: 400,
    y: 612, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head2_5 > 0) {
  secondPage.drawText(` ${no_of_head2_5}`, {
    x: 400,
    y: 590, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (farm_type2) {
  secondPage.drawText(` ${farm_type2}`, {
    x: 440,
    y: 677,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (organic_practitioner2) {
  secondPage.drawText(` ${organic_practitioner2}`, {
    x: 480,
    y: 677,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (farm_location_brgy3) {
  secondPage.drawText(` ${farm_location_brgy3}`, {
    x: 140, // (width)
    y: 576, // (height)
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (farm_location_city_muni3) {
  secondPage.drawText(` ${farm_location_city_muni3}`, {
    x: 140, 
    y: 565, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ownership_document_no_3) {
  secondPage.drawText(` ${ownership_document_no_3}`, {
    x: 137, 
    y: 530, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (totalSize3) {
  secondPage.drawText(` ${totalSize3}`, {
    x: 146, 
    y: 548, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (tenant_3) {
  secondPage.drawText(` ${tenant_3}`, {
    x: 160, 
    y: 495, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (lessee_3) {
  secondPage.drawText(` ${lessee_3}`, {
    x: 160, 
    y: 485, 
    size: 5,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_3 === "yes") {
  secondPage.drawText("/", {
    x: 183,
    y: 539, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (ancestral_domain_3 === "no") {
  secondPage.drawText("/", {
    x: 225,
    y: 539, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (agrarian_reform_3 === "yes") {
  secondPage.drawText("/", {
    x: 183,
    y: 519, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (agrarian_reform_3 === "no") {
  secondPage.drawText("/", {
    x: 225,
    y: 519, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}
if (registered_owner_3 === "Register Owner") {
  secondPage.drawText("/", {
    x: 66,
    y: 503, 
    size: 9,
    color: rgb(0, 0, 0), // Black color
  });
}

if (crop_commodity3_1) {
  secondPage.drawText(` ${crop_commodity3_1}`, {
    x: 275, // (width)
    y: 571, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity3_2) {
  secondPage.drawText(` ${crop_commodity3_2}`, {
    x: 275, // (width)
    y: 548, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity3_3) {
  secondPage.drawText(` ${crop_commodity3_3}`, {
    x: 275, // (width)
    y: 525, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity3_4) {
  secondPage.drawText(` ${crop_commodity3_4}`, {
    x: 275, // (width)
    y: 504, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (crop_commodity3_5) {
  secondPage.drawText(` ${crop_commodity3_5}`, {
    x: 275, // (width)
    y: 483, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa3_1) {
  secondPage.drawText(` ${sizeHa3_1}`, {
    x: 360,
    y: 571, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa3_2) {
  secondPage.drawText(` ${sizeHa3_2}`, {
    x: 360,
    y: 548, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa3_3) {
  secondPage.drawText(` ${sizeHa3_3}`, {
    x: 360,
    y: 525, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa3_4) {
  secondPage.drawText(` ${sizeHa3_4}`, {
    x: 360,
    y: 504, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (sizeHa3_5) {
  secondPage.drawText(` ${sizeHa3_5}`, {
    x: 360,
    y: 483, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (no_of_head3_1 > 0) {
  secondPage.drawText(` ${no_of_head3_1}`, {
    x: 400,
    y: 571,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head3_2 > 0) {
  secondPage.drawText(` ${no_of_head3_2}`, {
    x: 400,
    y: 548,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head3_3 > 0) {
  secondPage.drawText(` ${no_of_head3_3}`, {
    x: 400,
    y: 525,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head3_4 > 0) {
  secondPage.drawText(` ${no_of_head3_4}`, {
    x: 400,
    y: 504, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

if (no_of_head3_5 > 0) {
  secondPage.drawText(` ${no_of_head3_5}`, {
    x: 400,
    y: 483, 
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (farm_type3) {
  secondPage.drawText(` ${farm_type3}`, {
    x: 440,
    y: 570,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}
if (organic_practitioner3) {
  secondPage.drawText(` ${organic_practitioner3}`, {
    x: 480,
    y: 570,
    size: 6,
    color: rgb(0, 0, 0), // Black color
  });
}

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `RSBSA_Enrollment-Form_${reference_number}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchFarmers(); 
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
  
  .action-button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.4rem; 
    margin-right: 0.5rem; 
  }
  
  .edit {
    color: #387e90; 
  }
  
  .delete {
    color: #e88955; 
  }
  .selecteddelete {
    color: white;
  }
  .btn-danger {
    color: white;
    background: #e88955;
    border: none;
    width: 10%;
    height: 35px;
    border-radius: 5px;
  }
  .btn-warning {
    color: white;
    background: #46cab6;
    border: none;
    width: 10%;
    height: 35px;
    border-radius: 5px;
    margin-right: 79%;
  }
  .download{
    color: #46cab6;
  }
  .option{
    color: #46cab6;
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
    background-color: #7e4ee6;
    transition: background-color 0.3s;
    position: absolute;
    right: 34px; 
    top: 195px; 
}
  .btn:hover {
    background-color: #7e4ee6; 
  }
  h1 {
    color: black;
  }
  .option-text {
    background-color: white;
    padding: 8px;
    margin-top: 10px;
    margin-left: -25px;
    position: absolute;
    cursor: pointer;
    width: 120px;
    border-radius: 7px;
  }
  button {
  background: #63e6be;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
}
button1:hover {
  color: #7e4ee6;
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
  