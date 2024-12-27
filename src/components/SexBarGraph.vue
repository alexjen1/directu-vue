<template>
  <div>
    <canvas id="sexDonutChart" width="1200" height="400"></canvas> <!-- Sex distribution donut chart -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register all Chart.js components

const sexData = ref([]); // Reactive variable to hold sex data
const sexLabels = ref([]); // Labels for the sex chart

// Function to fetch sex data
const fetchSexData = async () => {
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

    // Grouping by sex
    const sexCount = {};
    farmers.forEach(farmer => {
      const sex = farmer.sex || "Not Specified";
      sexCount[sex] = (sexCount[sex] || 0) + 1;
    });

    sexLabels.value = Object.keys(sexCount);
    sexData.value = Object.values(sexCount);

    createSexDonutChart(); // Create the donut chart
  } catch (error) {
    console.error('Error fetching sex data:', error);
  }
};

// Function to create the sex distribution donut chart
const createSexDonutChart = () => {
  const ctx = document.getElementById('sexDonutChart').getContext('2d');
  const totalCount = sexData.value.reduce((a, b) => a + b, 0); // Calculate total count

  new Chart(ctx, {
    type: 'doughnut', // Change type to 'doughnut'
    data: {
      labels: sexLabels.value,
      datasets: [{
        label: 'Sex Distribution',
        data: sexData.value,
        backgroundColor: [
          '#46cab6', 
          '#e88955', 
          '#387e90', 
          'red', 
        ],
        borderColor: 'black', 
        borderWidth: .3,
      }],
    },
    options: {
      responsive: true, // Make the chart responsive
      maintainAspectRatio: false, // Allow height to change
      layout: {
        padding: {
          right: 10, // Adjust this value as needed for spacing
        },
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'black', // Set legend text color to white
          }
        },
        // Custom plugin to draw the total count inside the doughnut
        tooltip: {
          enabled: true // Disable tooltips for cleaner appearance
        },
        customText: {
          beforeDraw(chart) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = 'bold 24px Arial'; // Font styling
            ctx.fillStyle = '#FFFFFF'; // Color of the text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const x = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
            const y = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
            ctx.fillText(totalCount, x, y); // Draw total count in the center
            ctx.restore();
          },
        },
      },
    },
    plugins: [{
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const totalCount = sexData.value.reduce((a, b) => a + b, 0);
        const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
        const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
        // Draw "Total Gender" label
        ctx.fillText("Total Gender", centerX, centerY - 30); // Adjust vertical position
        ctx.fillText(totalCount, centerX, centerY); // Draw total count in the center
        ctx.restore();
      },
    }],
  });
};

// Fetch sex data when the component is mounted
onMounted(fetchSexData);
</script>

<style scoped>
#sexDonutChart {
  width: 100%; /* Full width */
  max-width: 900px; /* Set a max width for the chart */
  height: 400px; /* Set a fixed height for the chart */
}
</style>
