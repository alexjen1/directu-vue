<template>
  <div class="index-container">
    <Navbar />
    <div class="mass-upload">
      <h2>Mass Upload XLSX/CSV File</h2>
      <input type="file" @change="onFileChange" accept=".xlsx, .csv" />
      <button @click="uploadFile" :disabled="!fileData.length">Upload</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import axios from 'axios';
import Navbar from './Navbar.vue';

const errorMessage = ref('');
const fileData = ref([]);

// Retrieve the token from local storage
const token = localStorage.getItem('auth_token');  // Ensure the token is stored with this key
const apiUrl = 'http://localhost:8055/items/farmers';  // Directus API URL

const router = useRouter(); // Instantiate the router

// Function to handle file selection and parsing
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        fileData.value = sheet;
        errorMessage.value = '';
      };
      reader.onerror = () => {
        errorMessage.value = 'Error parsing XLSX file';
      };
      reader.readAsArrayBuffer(file);
    } else if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          fileData.value = result.data;
          errorMessage.value = '';
        },
        error: () => {
          errorMessage.value = 'Error parsing CSV file';
        },
      });
    } else {
      errorMessage.value = 'Please upload only XLSX or CSV files.';
      event.target.value = '';  // Clear the input if not a valid file
    }
  }
};

// Function to upload file data
const uploadFile = async () => {
  try {
    // Check if the token exists
    if (!token) {
      errorMessage.value = 'No authentication token found. Please log in again.';
      return;
    }

    const existingFarmers = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const existingData = existingFarmers.data.data;

    for (const farmer of fileData.value) {
      // Check if farmer already exists to avoid duplication
      const isDuplicate = existingData.some(existingFarmer => existingFarmer.reference_number === farmer.reference_number);

      if (!isDuplicate) {
        await axios.post(apiUrl, farmer, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    }
    alert('File data uploaded successfully');
    router.push('/farmers/index'); // Redirect after upload
  } catch (error) {
    console.error('Error uploading file data:', error);
    errorMessage.value = 'Failed to upload file data. Please check your input.';
  }
};
</script>

<style scoped>
h2 {
  color: black;
}
.index-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  overflow: hidden;
}
.error {
  color: red;
}
.mass-upload {
  margin: 20px;
  color: black;
}
button {
  margin-top: 10px;
}
</style>
