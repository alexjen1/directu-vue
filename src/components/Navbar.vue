<template>
  <nav :class="navClass">
    <div class="title-container">
      <h1>PRO-FARMER</h1>
      <hr :class="hrClass" />
      <div class="nav-buttons">
        <router-link to="/dashboard" class="nav-link">
          <span class="nav-text">
            <i class="fas fa-home"></i> Dashboard
          </span>
        </router-link>

        <router-link to="/farmers/index" class="nav-link">
          <span class="nav-text">
            <i style="margin-right: 5px;" class="fa-solid fa-users"></i>Farmers Info
          </span>
        </router-link>

        <div class="nav-dropdown">
          <span class="nav-text">
            <i class="fas fa-file-alt"></i> Reports
            <i class="fas fa-caret-down dropdown-indicator"></i> <!-- Dropdown indicator -->
          </span>
          <div class="dropdown-content" id="dropdownMenu">
            <router-link to="/table-filtering">Table Filtering</router-link>
            <!-- <div class="dropdown-item">
              <router-link to="/per-brgy-report">Count Barangay Report</router-link>
              <a href="/per-household-heads-report" class="extra-link">Count Household Head Report</a>
              <a href="/table-filtering" class="extra-link">Table Filtering</a>
            </div>
            <div class="dropdown-item">
            <router-link to="/farming-activity-report" class="dropdown-item">Farming Activity Report</router-link>
            <a href="/per-pwd-report" class="extra-link">Count Of PWD Report</a>
            </div>
            <div class="dropdown-item">
            <router-link to="/per-gender-report" class="dropdown-item">Count Gender Report</router-link>
            <a href="/per-IVpsBeneficiary-report" class="extra-link">Count IVps Beneficiary Report</a>
          </div>
          <div class="dropdown-item">
            <router-link to="/per-sitio-report" class="dropdown-item">Count Sitio Report</router-link>
            <a href="/per-indi-group-report" class="extra-link">Count Indigenous Group Report</a>
          </div>
          <div class="dropdown-item">
            <router-link to="/per-educational-level-report" class="dropdown-item">Count Educational Level Report</router-link>
            <a href="/per-gov-id-report" class="extra-link">Count Government ID Report</a>
          </div>
          <div class="dropdown-item">
            <router-link to="/per-religion-report" class="dropdown-item">Count Religion Report</router-link>
            <a href="/per-member-farmers-association-report" class="extra-link">Count Farmers Association Report</a>
          </div>
            <div class="dropdown-item">
            <router-link to="/per-civil-status-report" class="dropdown-item">Count Civil Status Report</router-link>
            <a href="/per-emergency-contact-report" class="extra-link">Count Emergency Contact Report</a>
          </div> -->
          </div>
        </div>
        <div class="nav-dropdown">
          <span class="nav-text">
            <i class="fas fa-cog"></i> Settings
            <i class="fas fa-caret-down dropdown-indicator"></i> 
          </span>
          <div class="dropdown-content" id="dropdownMenu">
            <router-link to="/mass-upload" class="dropdown-item">Mass Uploads</router-link>
          </div>
        </div>

      </div>
    </div>
      <div class="profile-container">
        <!-- <i class="fas fa-sun light-mode-icon"></i> -->
        <!-- <label class="light-mode-icon">
          <input type="checkbox" v-model="isChecked" @change="toggleTheme" />
          <span class="slider round"></span>
        </label> -->

        <router-link to="/activity" class="notification-bell" @click="markAsRead" :class="notificationClass">
        <i class="fas fa-bell"></i>
        <span v-if="unreadCount > 0" class="notification-count">{{ unreadCount }}</span>
      </router-link>

        <img class="img-profile rounded-circle"
          :src="AdminIcon"
          @click="toggleDropdown"
          alt="Profile Image"
        />
        <div class="status-indicator"></div>

        <div v-if="showDropdown" class="dropdown">
          <div class="logout-box"> <!-- New div for the logout button -->
        <div class="admin-info">
          <img class="admin-image" :src="AdminIcon" alt="Admin Image" />
          <span class="admin-email">{{ email }}</span>
        </div>
        <hr class="custom-hr" />
        <a href="http://localhost:8055/admin/users" target="_blank" class="profile">
          <i class="fas fa-user"></i>&nbsp;&nbsp; Profile
        </a>
      <br>
      <router-link to="#" class="settings">
          <i class="fas fa-cog"></i>&nbsp;&nbsp; Settings
        </router-link>
      <hr class="custom-hr" />
        <button @click="logout" class="btn-logout">
          Logout
          <i class="fas fa-sign-out-alt"></i> <!-- Add icon here -->
        </button>
      </div>
    </div>
  </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';

import AdminIcon from '@/assets/images/admin-icon.png';

const router = useRouter();
const showDropdown = ref(false);
const isChecked = ref(false);
const navClass = ref('dark-mode');
const hrClass = ref('dark-hr');
const notificationClass = ref('dark-notification');

const toggleTheme = () => {
  if (isChecked.value) {
    navClass.value = 'light-mode';
    hrClass.value = 'light-hr';
    notificationClass.value = 'light-notification';
    localStorage.setItem('theme', 'light');
  } else {
    navClass.value = 'dark-mode';
    hrClass.value = 'dark-hr';
    notificationClass.value = 'dark-notification';
    localStorage.setItem('theme', 'dark');
  }
};

const unreadCount = computed(() => {
  return parseInt(localStorage.getItem('unread_notifications')) || 0;
});
const markAsRead = () => {
  // Reset unread notifications count when the bell is clicked
  localStorage.setItem('unread_notifications', 0);
};

const email = computed(() => {
  return localStorage.getItem('email') || 'No email available';
});


const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('email'); 
  router.push('/');
  showDropdown.value = false;
};

// Click outside to close dropdown
const handleClickOutside = (event) => {
  const profileContainer = document.querySelector('.profile-container');
  if (showDropdown.value && !profileContainer.contains(event.target)) {
    showDropdown.value = false;
  }
};


onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isChecked.value = savedTheme === 'light';
    toggleTheme();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>



<style scoped>
.dropdown-item {
  display: flex;
  justify-content: space-between; /* Places items on left and right */
  align-items: center;
  padding: 8px 16px;
}

.dropdown-content .extra-link {
  color: black; /* Customize the link color */
  text-decoration: none;
}

.custom-hr {
  background-color: white; 
  height: 0.5px;
}
.admin-email{
  color: black;
}
.admin-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.admin-image {
  width: 34px; 
  height: 34px; 
  border-radius: 50%; 
  margin-right: 8px; 
}

.logout-box {
  padding: 10px; 
  background-color: white;
  border: 1px solid white; 
  border-radius: 5px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  width: 300px;
}
.btn-logout i {
  padding-left: 100px;
}

.notification-bell {
  margin-right: 40px;
  font-size: 1.3rem;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 5px;  
  right: 60px; 
  font-size: 1.3rem; 
  cursor: pointer;
}

.notification-bell:hover {
  color: black; 
  background-color: white;
}
.notification-count {
  position: absolute;
  top: - 10px;
  right: -10px;
  background-color: red;
  color: white;
  padding: 3px 8px;
  border-radius: 50%;
  font-size: 12px;
}
nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: white;
  color: black;
  flex-wrap: wrap;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

h1 {
  font-size: 2rem;
  color: green;
  margin: 0;
}

hr {
  border: 0;
  height: 2px;
  background-color: black;
  margin: 10px 0;
  width: 100%;
}

.profile-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
.status-indicator {
    position: absolute;
    bottom: 11px;
    left: 32px;
    width: 12px; /* Adjust the size as needed */
    height: 12px;
    background-color: green;
    border: 1px solid white;
    border-radius: 50%;
  }

.img-profile {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  right: 0;
  z-index: 10;
}

.btn-logout {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid red;
  width: 280px;
  align-items: center; /* Center icon vertically with text */
}

.nav-link,
.nav-text {
  text-decoration: none; /* Remove underline from links */
  color: inherit; /* Use the current text color */
  cursor: pointer; /* Change cursor to pointer for better UX */
  padding: 10px 20px;
}

.nav-link:hover,
.nav-text:hover {
  color: inherit; /* Maintain the original color on hover */
  background-color: transparent; /* Remove any background color */
}

.nav-dropdown {
  position: relative;
  display: inline-block; /* Allow the dropdown to be inline with others */
}
.nav-dropdown:hover .dropdown-indicator {
  transform: rotate(180deg); /* Rotate the indicator when the dropdown is open */
}

.dropdown-content {
  display: none; /* Hide the dropdown by default */
  position: absolute;
  background-color: white;
  min-width: 300px; /* Minimum width */
  z-index: 1; /* Make sure it appears above other content */
}

.dropdown-content a {
  color: black; /* Text color for links */
  padding: 12px 16px; /* Padding for links */
  text-decoration: none; /* No underline */
  display: block; /* Each link as a block */
}

.dropdown-content a:hover {
  background-color: white; /* Background on hover */
}

.nav-dropdown:hover .dropdown-content {
  display: block; /* Show the dropdown on hover */
}
.profile{
  background-color: white;
  color: black;
  cursor: pointer;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 15px;
}
.settings{
  background-color: white;
  color: black;
  cursor: pointer;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: 15px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: lightgreen;
}

input:focus + .slider {
  box-shadow: 0 0 1px lightgreen;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.light-mode-icon {
  margin-right: 100px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 8px;  
  right: 80px; 
  font-size: 1.3rem; 
  cursor: pointer;
  width: 65px;
}
/* lightmode */
.light-mode {
  background-color: white;
  color: black;
}

.light-hr {
  background-color: black;
}
.light-notification{
  color: black;
}
.light-notification:hover{
  color: black;
  background-color: white;
}
/* Responsive Styles */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .nav-button {
    padding: 8px 12px;
  }

  .img-profile {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.25rem;
  }

  .nav-button {
    padding: 6px 10px;
  }

  .nav-buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
