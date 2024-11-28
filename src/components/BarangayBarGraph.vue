<template>
  <div>
    <canvas id="barangayBarChart" width="1200" height="300"></canvas> <!-- Adjusted size -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all Chart.js components

const barangayData = ref([]); // Reactive variable to hold barangay data
const barangayLabels = ref([]); // Labels for the bar chart

// Function to fetch barangay data
const fetchBarangayData = async () => {
  const token = localStorage.getItem('auth_token'); // Get auth token from local storage
  try {
    const response = await fetch('http://localhost:8055/items/farmers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token for authorization
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching farmers: ${response.statusText}`);
    }

    const data = await response.json();
    const farmers = data.data;

    // Grouping farmers by barangay
    const barangayCount = {};
    farmers.forEach(farmer => {
      const barangay = farmer.barangay; // Adjust this to your actual field name
      barangayCount[barangay] = (barangayCount[barangay] || 0) + 1;
    });

    barangayLabels.value = Object.keys(barangayCount);
    barangayData.value = Object.values(barangayCount);
    
    createBarChart();
  } catch (error) {
    console.error('Error fetching barangay data:', error);
  }
};

// Function to create the bar chart
const createBarChart = () => {
  const ctx = document.getElementById('barangayBarChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barangayLabels.value,
      datasets: [{
        label: 'Farmers per Barangay',
        data: barangayData.value,
        backgroundColor: '#355265',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true, // Make the chart responsive
      maintainAspectRatio: false, // Allow height to change
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'black', // Set Y-axis label color to white
          }
        },
        x: {
          ticks: {
            color: 'black', // Set X-axis label color to white
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'black', // Set legend text color to white
          }
        }
      }
    },
  });
};

// Fetch barangay data when the component is mounted
onMounted(fetchBarangayData);
</script>

<style scoped>
#barangayBarChart {
  width: 100%; /* Full width */
  max-width: 900px; /* Set a max width for the chart */
  height: 400px; /* Set a fixed height for the chart */
}
</style>
