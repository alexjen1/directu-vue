<template>
    <div>
      <canvas id="religionBarChart" width="1200" height="400"></canvas> <!-- Religion chart -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables); // Register all Chart.js components
  
  const religionData = ref([]); // Reactive variable to hold religion data
  const religionLabels = ref([]); // Labels for the religion chart
  
  // Function to fetch religion data
  const fetchReligionData = async () => {
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
  
      // Grouping religions
      const religionCount = {};
      farmers.forEach(farmer => {
        const religion = farmer.religion; // Adjust to match your field name
        religionCount[religion] = (religionCount[religion] || 0) + 1;
      });
  
      religionLabels.value = Object.keys(religionCount);
      religionData.value = Object.values(religionCount);
      
      createReligionBarChart();
    } catch (error) {
      console.error('Error fetching religion data:', error);
    }
  };
  
  // Function to create the religion bar chart
  const createReligionBarChart = () => {
    const ctx = document.getElementById('religionBarChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: religionLabels.value,
        datasets: [{
          label: 'Religions',
          data: religionData.value,
          backgroundColor: '#46cab6', 
          borderColor: '#387e90',       
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
  
  // Fetch religion data when the component is mounted
  onMounted(fetchReligionData);
  </script>
  
  <style scoped>
  #religionBarChart {
    width: 100%; /* Full width */
    max-width: 900px; /* Set a max width for the chart */
    height: 350px; /* Set a fixed height for the chart */
  }
  </style>
  