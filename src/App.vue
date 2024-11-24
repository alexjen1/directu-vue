<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html, body {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  height: 100%; /* Ensure full height */
  background:  darkgreen;
}

#app {
  height: 100vh; /* Full height of the viewport */
  margin: 0;     /* Remove any default margin */
  padding: 0;    /* Remove any default padding */
}
.input-field {
  position: relative;
  margin-bottom: 15px; /* Space between input fields */
}

.input-field input {
  width: 100%; /* Full width */
  padding: 10px; /* Padding for input */
  border: 1px solid #ddd; /* Border */
  border-radius: 4px; /* Rounded corners */
}


.input-field {
  position: relative;
  margin-left: 10px;
  margin-bottom: 40px;
}

.input-field input {
  width: 450px;
  height: 60px;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
  border: 1px solid black;
  background: transparent;
  color: black;
  outline: none;
}

/* .input-field label {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: black;
  font-size: 19px;
  pointer-events: none;
  transition: 0.3s;
} */

input:focus {
  border-color: #63e6be;
  box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
}

input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 16px;
  padding: 0 2px;
  background: #343248;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: 55px;
  gap: 10px 100px; /* Gap between the input fields: 10px vertical, 20px horizontal */
}
.input-field-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 150px; /* Gap between the input fields: 10px vertical, 20px horizontal */
}

.input-field {
    position: relative; /* Position relative to contain the icon */
}

.input-field select {
    width: 450px;
    height: 60px;
    border-radius: 6px;
    font-size: 18px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}

.input-field .icon {
    position: absolute;
    right: 20px; /* Position the icon */
    top: 50%;
    transform: translateY(-50%); /* Center the icon vertically */
    font-size: 24px; /* Size of the icon */
    pointer-events: none; /* Allow clicks on select */
}


    .input-field label {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        color: black;
        font-size: 19px;
        pointer-events: none;
        transition: 0.3s;
    }
    .black-select option {
    background-color: #343248;
    color: white;
  }

    input:focus, select:focus {
        border: 2px solid lightgreen;
    }

    
    /* Style for the "Show entries" section */
#showEntries {
  width: 100%; 
  max-width: 100px; 
  padding: 0.5rem; 
  border-radius: 6px; 
  font-size: 1rem; 
  background-color: #f2f4f7; 
  color: black; 
  outline: none; 
  transition: border 0.3s ease-in-out; 
  margin-left: 15px;
}

#showEntries:focus {
  border-color: #63e6be;
  box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
}

#showEntries:hover {
  background-color: #f2f4f7;
}

/* Style for the "Show entries" label */
.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
  display: block; /* Ensure it is above the select element */
}
/* Style for the container holding both "Show Entries" and "Add Farmers" */
.d-flex {
  display: flex;
  justify-content: space-between; /* Ensures items are spread across the row */
  align-items: center; /* Vertically center-aligns both elements */
}

/* Style for the "Show entries" dropdown */
.show-entries-dropdown {
  width: 200px; /* Control the width of the dropdown */
}

/* Style for the "Add Farmers" button */
.add-farmers-btn {
  margin-left: 10px; /* Add some space between the dropdown and button */
}
.navbar {
  display: flex; /* Aligns navbar items horizontally */
  justify-content: space-between; /* Space between items */
  align-items: center; /* Center items vertically */
  background-color: #e2e6ea; /* Navbar background color */
  padding: 10px; /* Padding around the navbar */
  width: 97%;
}

.navbar-content {
  display: flex; /* Enables flexbox for the content */
  align-items: center; /* Center items vertically */
}

.checkbox-group {
  margin: 0 20px; /* Space around the checkbox group */
  font-family: Arial, sans-serif; /* Change font style if needed */
  color: black; /* Change text color to white for contrast */
}

.checkbox-list {
  display: flex; /* Align checkboxes horizontally */
  align-items: center; /* Center items vertically */
  padding-left: 100px; /* Remove left padding */
}

.checkbox-list label {
  display: flex; /* Align label and checkbox */
  align-items: center; /* Center checkbox vertically with text */
  margin-right: 220px; /* Space between each label */
  cursor: pointer; /* Change cursor on hover */
}

.checkbox-list label:first-child {
  margin-right: 200px; /* Space between the main label and checkboxes */
  font-weight: bold; /* Make the main label bold */
}

.checkbox-list input {
  margin-right: 5px; /* Space between checkbox and label text */
}
.check-box {
  margin: 1rem 0; /* Add some margin for spacing */
  padding: 0.5rem; /* Add some padding */
  background-color: #f8f9fa; /* Light background color */
  border: 1px solid #ced4da; /* Light border */
  border-radius: 5px; /* Rounded corners */
}

.check-box label {
  display: block; /* Stack the labels vertically */
  margin: 0.5rem 0; /* Space between each label */
  cursor: pointer; /* Change cursor to pointer on hover */
  font-size: 16px; /* Font size for the label */
  color: #343a40; /* Dark text color */
}

.check-box input[type="checkbox"] {
  margin-right: 0.5rem; /* Space between checkbox and label text */
}

/* Optional: Add hover effect on labels */
.check-box label:hover {
  background-color: #e2e6ea; /* Slightly darker background on hover */
  transition: background-color 0.2s ease; /* Smooth transition */
}
.farming-activity-label {
  color: black; /* Set the label text color to black */
  font-weight: bold; /* Optional: make the label bold */
  font-size: 16px; /* Optional: adjust the font size */
  margin-bottom: 10px; /* Optional: add some space below the label */
}
.table-container {
  overflow-x: auto;            
  -webkit-overflow-scrolling: touch;
  }
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px; 
  }
th, td {
  border: 1px solid black;
  color: black;
  padding: 8px;
  text-align: left;
  }
th {
  background-color: white;
  }
  .alert-box {
  position: fixed; /* Position the alert box */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Translate to center */
  padding: 20px;
  background-color: white; /* Semi-transparent background */
  color: black; /* Text color */
  border-radius: 8px; /* Rounded corners */
  text-align: center; /* Center text */
  height: 400px;
  width: 450px;
  font-size:x-large;
}
.alert-box p{
  color: black;
  font-size: 29px;
}
.alert-box button {
  background-color: #63E6BE;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  margin-top: 40px;
}
.arrow-down {
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust as needed */
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black; /* Color of the arrow */
  transform: translateY(-50%);
  pointer-events: none; /* Makes sure the arrow doesn't interfere with the select */
}
.notification-count {
  position: absolute;
  top: -5px; /* Adjust as necessary */
  right: -10px; /* Adjust as necessary */
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem; /* Adjust size as necessary */
}
.btnpdf {
  background-color: #343248; 
  border: 1px solid white; 
  color: white;
  height: 40px;
  width: 150px;
}
.filter-dropdown {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 20%;
}

.filter-dropdown label {
  font-size: 1rem;
  font-weight: bold;
  color: black;
  margin-bottom: 0.5rem;
}

.filter-dropdown select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: black;
  background-color: white;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.filter-dropdown select:focus {
  border-color: #63e6be;
  box-shadow: 0 0 5px rgba(99, 230, 190, 0.5);
}

.filter-dropdown select option {
  background-color: white;
  color: black;
}
</style>
