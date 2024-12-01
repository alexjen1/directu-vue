<template>
  <div class="chart-container">
    <div class="chart pie-chart">
      <canvas id="farmingActivityPieChart" width="600" height="400"></canvas> 
    </div>
    <div class="chart">
      <canvas id="farmingActivityBarChart" width="600" height="300"></canvas> 
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); 

const farmingActivityData = ref([]); 
const farmingActivityLabels = ref([]); 

const fetchFarmingActivityData = async () => {
  const token = localStorage.getItem('auth_token'); 
  try {
    const response = await fetch('http://localhost:8055/items/farmers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching farmers: ${response.statusText}`);
    }

    const data = await response.json();
    const farmers = data.data;

    // Grouping farming activities
    const farmingActivityCount = {};

    farmers.forEach(farmer => {
      const farmingActivity = farmer.type_of_farming_activity; 
      farmingActivityCount[farmingActivity] = (farmingActivityCount[farmingActivity] || 0) + 1;

      if (farmer.other_crop_specify) {
        const otherCrop = farmer.other_crop_specify;
        farmingActivityCount[otherCrop] = (farmingActivityCount[otherCrop] || 0) + 1;
      }
      if (farmer.livestock_specify) {
        const livestock = farmer.livestock_specify;
        farmingActivityCount[livestock] = (farmingActivityCount[livestock] || 0) + 1;
      }
      if (farmer.poultry_specify) {
        const poultry = farmer.poultry_specify;
        farmingActivityCount[poultry] = (farmingActivityCount[poultry] || 0) + 1;
      }
      if (farmer.type_of_farming_activities_other) {
        const otherActivity = farmer.type_of_farming_activities_other;
        farmingActivityCount[otherActivity] = (farmingActivityCount[otherActivity] || 0) + 1;
      }
    });

    farmingActivityLabels.value = Object.keys(farmingActivityCount);
    farmingActivityData.value = Object.values(farmingActivityCount);
    
    createFarmingActivityCharts();
  } catch (error) {
    console.error('Error fetching farming activity data:', error);
  }
};

// Function to create the pie and bar charts
const createFarmingActivityCharts = () => {
  const pieCtx = document.getElementById('farmingActivityPieChart').getContext('2d');
  const barCtx = document.getElementById('farmingActivityBarChart').getContext('2d');

  const totalCount = farmingActivityData.value.reduce((a, b) => a + b, 0); // Calculate total count

  const chartColors = [
    '#355265',
    '#6a8d92',
    '#92c5da',
    '#f0f8ff',
    '#ff7f50',
    '#ff6347',
    '#ffd700',
  ];

  // Create Pie Chart
  new Chart(pieCtx, {
    type: 'pie', 
    data: {
      labels: farmingActivityLabels.value,
      datasets: [{
        label: 'Farming Activities',
        data: farmingActivityData.value,
        backgroundColor: chartColors,
        borderColor: 'black',
        borderWidth: .3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: 100,
        },
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'black',
          },
        },
      },
    },
  });

  // Create Bar Chart
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: farmingActivityLabels.value,
      datasets: [{
        label: 'Farming Activities Count',
        data: farmingActivityData.value,
        backgroundColor: chartColors, // Multiple colors for bars
        borderColor: 'black',
        borderWidth: .3,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'black',
          }
        },
        x: {
          ticks: {
            color: 'black',
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'black',
          },
        },
      },
    },
  });
};

onMounted(fetchFarmingActivityData);
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.chart {
  flex: 1;
  margin: 10px;
}

.pie-chart {
  width: 100%;
  max-width: 900px;
  height: 400px;
}

#farmingActivityPieChart {
  width: 100%;
  height: 400px;
}

#farmingActivityBarChart {
  width: 100%;
  max-width: 790px;
  height: 300px;
  margin-left: 0;
  margin-right: auto;
}
</style>
