<template>
  <div class="index-container">
    <Navbar />
    <div class="content-box">
      <div class="centered-box">
        <ul>
          <li v-if="farmer" class="text">
            <div>Surname: {{ farmer.surname }}</div>
            <div>First name: {{ farmer.first_name }}</div>
            <div>Middle name: {{ farmer.middle_name }}</div>
            <div>Extension name: {{ farmer.extension_name }}</div>
            <div>Gender: {{ farmer.sex }}</div>
            <div>House Lot Bldg No. Purok: {{ farmer.house_lot_bldg_no_purok }}</div>
            <div>Street Sitio Subdv: {{ farmer.street_sitio_subdv }}</div>
            <div>Barangay: {{ farmer.barangay }}</div>
            <div>Municipality City: {{ farmer.municipality_city }}</div>
            <div>Province: {{ farmer.province }}</div>
            <div>Region: {{ farmer.region }}</div>
          </li>
        </ul>
      </div>
      <div class="centered-box2">
        <div class="table-responsive">
        <table class="table">
          <thead class="table-primary">
            <tr>
              <th>Mobile No.</th>
              <th>Landline No.</th>
              <th>Date of Birth</th>
              <th>Place of Birth</th>
              <th>province/State.</th>
              <th>Country</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="farmer">
              <td>{{ farmer.mobile_number }}</td>
              <td>{{ farmer.landline_number }}</td>
              <td>{{ farmer.date_of_birth }}</td>
              <td>{{ farmer.place_of_birth }}</td>
              <td>{{ farmer.place_of_birth_province_state }}</td>
              <td>{{ farmer.place_of_birth_country }}</td>
              <td>{{ farmer.religion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead class="table-primary">
            <tr>
              <th>Highest Formal Education</th>
              <th>Person With Disability</th>
              <th>IVps Beneficiary</th>
              <th>Member of an Indiginous Group</th>
              <th>With Government ID</th>
              <th>Member of any Farmers Association Cooperative</th>
              <th>Emergency Contact</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="farmer">
              <td>{{ farmer.highest_formal_education }}</td>
              <td>{{ farmer.person_with_disability }}</td>
              <td>{{ farmer.IVps_beneficiary }}</td>
              <td>{{ farmer.member_of_an_indiginous_group }}</td>
              <td>{{ farmer.with_government_id }}</td>
              <td>{{ farmer.member_of_any_farmers_association_cooperative }}</td>
              <td>{{ farmer.person_to_notify_in_case_of_emergency }}</td>
              <td>{{ farmer.contact_number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // To get route params
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';

const farmers = ref([]); // Reactive variable for storing farmers' data
const farmer = ref(null); // To store the farmer that matches the ID

// Fetch Farmers Data
const fetchFarmers = async () => {
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const route = useRoute();
  const farmerId = route.params.id; // Get the ID from the route params

  try {
    // Attempt to fetch data with the token
    let response = await axios.get('http://localhost:8055/items/farmers', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Find the farmer that matches the ID
    farmer.value = response.data.data.find(f => f.id == farmerId);

    if (!farmer.value) {
      console.error('Farmer not found');
    }
  } catch (err) {
    console.error('Error fetching farmers:', err);
  }
};

// Fetch data when the component is mounted
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
  display: flex;
  align-items: left;
  justify-content: left;
}

.centered-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-right: 2%;
}
.centered-box2 {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 1100px;
  height: 100%;
  width: 100%;
  text-align: center;
  margin-right: 2%;
}

h1 {
  color: black;
}

.text {
  color: black;
  text-align: left;
}

ul {
  list-style-type: none; /* Removes bullets from the list */
  padding: 0; /* Removes default padding */
  margin: 0; /* Removes default margin */
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
