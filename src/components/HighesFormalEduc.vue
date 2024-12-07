<template>
    <div>
      <canvas id="educationPieChart" width="1200" height="400"></canvas> <!-- Adjusted size -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables); // Register all Chart.js components
  
  const educationData = ref([]); // Reactive variable to hold education data
  const educationLabels = ref([]); // Labels for the pie chart
  
  // Function to fetch education data
  const fetchEducationData = async () => {
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
  
      // Grouping farmers by highest formal education
      const educationCount = {};
      farmers.forEach(farmer => {
        const education = farmer.highest_formal_education || "Not Specified";
        educationCount[education] = (educationCount[education] || 0) + 1;
      });
  
      educationLabels.value = Object.keys(educationCount);
      educationData.value = Object.values(educationCount);
      
      createPieChart();
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };
  
  // Function to create the pie chart
  const createPieChart = () => {
    const ctx = document.getElementById('educationPieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie', // Change the chart type to 'pie'
      data: {
        labels: educationLabels.value,
        datasets: [{
          label: 'Farmers by Highest Formal Education',
          data: educationData.value,
          backgroundColor: [
            '#355265',
            '#6a8d92',
            '#92c5da',
            '#f0f8ff',
            '#ff7f50',
            '#ff6347',
            '#ffd700',
          ], // Add more colors as needed
          borderWidth: .3,
          borderColor: 'black', 
        }],
      },
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow height to change
        layout: {
        padding: {
        right: 150, // Adjust this value as needed for spacing
        },
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: 'black', // Set legend text color to white
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  };
  
  // Fetch education data when the component is mounted
  onMounted(fetchEducationData);
  </script>
  
  <style scoped>
  #educationPieChart {
    width: 100%; /* Full width */
    max-width: 900px; /* Set a max width for the chart */
    height: 400px; /* Set a fixed height for the chart */
  }
  </style>
  