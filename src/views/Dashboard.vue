<template>
  <div class="dashboard-container">
    <Navbar />
    <div class="content">
      <br />
      <div class="total-farmers-box">
          <h1>Total Farmers: {{ farmersCount }}</h1>
        </div>
      <br />
      <br />
      <div class="charts-container">
      <div class="chart-box">
        <div class="icon-container" onclick="window.location.href='/farming-activity-report'">
          <i class="fas fa-ellipsis-v"></i>
        </div>
        <h1>Farming Activities</h1>
        <FarmingActivityGraph />
      </div>
    </div>
      <br />
      <br />
      <div class="charts-container">
        <div class="chart-box">
          <div class="icon-container" onclick="window.location.href='/per-brgy-report'">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <h1>Count Per Barangay</h1>
          <BarangayBarGraph />
        </div>
        <div class="chart-box">
          <div class="icon-container" onclick="window.location.href='/per-educational-level-report'">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <h1>Highest Formal Education</h1>
          <HighesFormalEduc />
        </div>
      </div>
      <br />
      <br />
      <div class="charts-container">
        <div class="chart-box">
          <div class="icon-container" onclick="window.location.href='/per-gender-report'">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <h1>Gender</h1>
          <SexBarGraph />
        </div>
        <div class="chart-box">
          <div class="icon-container" onclick="window.location.href='/per-religion-report'">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <h1>Religion</h1>
          <ReligionBarGraph />
        </div>
        <div class="chart-box">
          <div class="icon-container" onclick="window.location.href='/per-civil-status-report'">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
          <h1>Civil Status</h1>
          <CivilStatusBarGraph />
        </div>
      </div>
      <br />
      <br />
      <div class="charts-container">
        <div class="chart-box1">
          <IndexGraph />
        </div>
        <div class="chart-box">
          <h1>Farmers Date Created</h1>
          <DateCreatedGraph/>
        </div>
      </div>
    </div>
    <a href="/farmers/create">
      <i class="fa-solid fa-circle-plus"></i>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import BarangayBarGraph from '@/components/BarangayBarGraph.vue';
import FarmingActivityGraph from '@/components/FarmingActivityGraph.vue';
import SexBarGraph from '@/components/SexBarGraph.vue';
import ReligionBarGraph from '@/components/ReligionBarGraph.vue';
import CivilStatusBarGraph from '@/components/CivilStatusBarGraph.vue';
import HighesFormalEduc from '@/components/HighesFormalEduc.vue';
import IndexGraph from '@/components/IndexGraph.vue';
import DateCreatedGraph from '@/components/DateCreatedGraph.vue';

const router = useRouter();
const farmersCount = ref(0);

const fetchFarmersData = async () => {
  const token = localStorage.getItem('auth_token');
  const refreshToken = localStorage.getItem('refresh_token');

  try {
    // First attempt to fetch data with the current access token
    let response = await fetch('http://localhost:8055/items/farmers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Token expired, attempt to refresh
      const refreshResponse = await fetch('http://localhost:8055/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,  // Use refresh token to get a new access token
        }),
      });

      if (refreshResponse.status === 200) {
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.data.access_token;
        const newRefreshToken = refreshData.data.refresh_token;  // New refresh token issued by the server

        // Store the new tokens
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
      } else {
        // Refresh token also failed
        alert('Session expired. Please log in again.');
        return;
      }
    }

    if (!response.ok) {
      throw new Error(`Error fetching farmers: ${response.statusText}`);
    }

    const data = await response.json();
    farmersCount.value = data.data.length;
    console.log('Farmers data fetched successfully:', data);
  } catch (error) {
    console.error('Error fetching farmers data:', error);
  }
};

onMounted(fetchFarmersData);
</script>

<style scoped>
/* Styling remains the same as provided */
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f2f4f7;
  overflow: hidden;
}

.content {
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.total-farmers-box {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-content: center;
}

h1, h2 {
  color: black;
}

.charts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.chart-box {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.chart-box1 {
  flex: 2.4;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fa-circle-plus {
  position: fixed; 
  right: 4%; 
  bottom: 6%; 
  color: black;
  font-size: 55px;
  transition: transform 0.2s ease-in-out;
  z-index: 1000; 
}

.fa-circle-plus:hover {
  color: black;
  transform: scale(1.2);
  cursor: pointer;
}
.icon-container {
    font-size: 20px; 
    display: flex;
    justify-content: flex-end; 
    align-items: center; 
    width: 100%; 
    color: black; 
    cursor: pointer;
}


@media (max-width: 768px) {
  .charts-container {
    flex-direction: column;
  }

  .content {
    padding: 1rem;
  }

  .chart-box {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  h1, h2 {
    font-size: 1.2rem;
  }

  .chart-box {
    padding: 0.5rem;
  }
}
</style>
