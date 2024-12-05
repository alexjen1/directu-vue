<template>
  <div>
    <canvas id="indigenousGroupLineChart" width="1200" height="400"></canvas> <!-- Indigenous Group line chart -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all Chart.js components

const indigenousGroupData = ref([]); // Reactive variable to hold counts of indigenous group memberships
const groupLabels = ref([]); // Labels for the indigenous groups (X-axis)

// Function to fetch farmer data based on member_of_an_indigenous_group
const fetchIndigenousGroupData = async () => {
  const token = localStorage.getItem('auth_token'); // Get auth token from local storage
  const refreshToken = localStorage.getItem('refresh_token'); // Get refresh token from local storage

  try {
    // First attempt to fetch data with the current access token
    let response = await fetch('http://localhost:8055/items/farmers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token for authorization
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // If the token is expired (401), attempt to refresh the token using the refresh token
      const refreshResponse = await fetch('http://localhost:8055/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,  // Send the refresh token to get a new access token
        }),
      });

      if (refreshResponse.status === 200) {
        // If refresh token request is successful, get the new access token
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.data.access_token;
        const newRefreshToken = refreshData.data.refresh_token;  // New refresh token (if provided)

        // Store the new tokens in localStorage
        localStorage.setItem('auth_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);

        // Retry the original request with the new access token
        response = await fetch('http://localhost:8055/items/farmers', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${newAccessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    }

    if (!response.ok) {
      throw new Error(`Error fetching farmers: ${response.statusText}`);
    }

    const data = await response.json();
    const farmers = data.data;

    // Grouping by indigenous group
    const groupCount = {};
    farmers.forEach(farmer => {
      const group = farmer.member_of_an_indiginous_group || "Not Specified"; // Fallback for undefined values

      groupCount[group] = (groupCount[group] || 0) + 1;
    });

    groupLabels.value = Object.keys(groupCount); // Set indigenous group names as labels
    indigenousGroupData.value = Object.values(groupCount); // Set counts as data

    createIndigenousGroupLineChart();
  } catch (error) {
    console.error('Error fetching indigenous group data:', error);
  }
};

// Function to create the indigenous group line chart
const createIndigenousGroupLineChart = () => {
  const ctx = document.getElementById('indigenousGroupLineChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: groupLabels.value,
      datasets: [{
        label: 'Farmers by Indigenous Group',
        data: indigenousGroupData.value,
        backgroundColor: '#FFB6C1',
        borderColor: '#FFB6C1',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'black', // Set Y-axis label color to black
          }
        },
        x: {
          ticks: {
            color: 'black', // Set X-axis label color to black
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'black', // Set legend text color to black
          }
        }
      }
    },
  });
};

// Fetch indigenous group data when the component is mounted
onMounted(fetchIndigenousGroupData);
</script>

<style scoped>
#indigenousGroupLineChart {
  width: 100%; /* Full width */
  max-width: 900px; /* Set a max width for the chart */
  height: 350px; /* Set a fixed height for the chart */
}
</style>
