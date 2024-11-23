<template>
    <div>
      <canvas id="dateCreatedLineChart" width="1200" height="400"></canvas> <!-- Date Created line chart -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables); // Register all Chart.js components
  
  const dateCreatedData = ref([]); // Reactive variable to hold counts of dates
  const dateLabels = ref([]); // Labels for the months (X-axis)
  
  // Function to fetch farmer data by date_created
  const fetchDateCreatedData = async () => {
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

    // Grouping by month and year
    const dateCount = {};
    farmers.forEach(farmer => {
      const dateObj = new Date(farmer.date_created);
      const monthYear = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' }); // Format as "Month Year"
      
      dateCount[monthYear] = (dateCount[monthYear] || 0) + 1;
    });

    dateLabels.value = Object.keys(dateCount); // Set months and years as labels
    dateCreatedData.value = Object.values(dateCount); // Set counts as data

    createDateCreatedLineChart();
  } catch (error) {
    console.error('Error fetching date created data:', error);
  }
};

  
  // Function to create the date created line chart
  const createDateCreatedLineChart = () => {
    const ctx = document.getElementById('dateCreatedLineChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateLabels.value,
        datasets: [{
          label: 'Farmers Created Per Month',
          data: dateCreatedData.value,
          backgroundColor: '#46cab6',
          borderColor: '#387e90',      
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
  
  // Fetch date created data when the component is mounted
  onMounted(fetchDateCreatedData);
  </script>
  
  <style scoped>
  #dateCreatedLineChart {
    width: 100%; /* Full width */
    max-width: 900px; /* Set a max width for the chart */
    height: 350px; /* Set a fixed height for the chart */
  }
  </style>
  