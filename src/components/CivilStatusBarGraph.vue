<template>
    <div>
      <canvas id="civilStatusBarChart" width="1200" height="400"></canvas> <!-- Civil Status chart -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables); // Register all Chart.js components
  
  const civilStatusData = ref([]); // Reactive variable to hold civil status data
  const civilStatusLabels = ref([]); // Labels for the civil status chart
  
  // Function to fetch civil status data
  const fetchCivilStatusData = async () => {
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
  
      // Grouping civil status
      const civilStatusCount = {};
      farmers.forEach(farmer => {
        const civilStatus = farmer.civil_status || "Not Specified";
        civilStatusCount[civilStatus] = (civilStatusCount[civilStatus] || 0) + 1;
      });
  
      civilStatusLabels.value = Object.keys(civilStatusCount);
      civilStatusData.value = Object.values(civilStatusCount);
      
      createCivilStatusBarChart();
    } catch (error) {
      console.error('Error fetching civil status data:', error);
    }
  };
  
  const chartColors = [
    '#92c5da',
    '#f0f8ff',
    '#ff7f50',
    '#ff6347',
    '#ffd700',
  ];
  // Function to create the civil status bar chart
  const createCivilStatusBarChart = () => {
    const ctx = document.getElementById('civilStatusBarChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: civilStatusLabels.value,
        datasets: [{
          label: 'Civil Status',
          data: civilStatusData.value,
          backgroundColor: '#ff7f50', 
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
  
  // Fetch civil status data when the component is mounted
  onMounted(fetchCivilStatusData);
  </script>
  
  <style scoped>
  #civilStatusBarChart {
    width: 100%; /* Full width */
    height: 350px; /* Set a fixed height for the chart */
  }
  </style>
  