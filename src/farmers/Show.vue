<template>
    <div class="index-container">
      <Navbar />
      <div class="content-box">
        <h1>sdjgk</h1>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  
</script>
  
  
    <style scoped>
    .index-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100vw;
      background-color: #f2f4f7;
      overflow: hidden;
    }
    
    .content-box {
      position: relative;
      padding: 2rem;
      background-color: #f2f4f7;
      margin-top: 2rem;
      border-radius: 8px;
      max-height: 80vh; /* Set a max height for the content box */
      overflow-y: auto; /* Enable vertical scrolling */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
h1 {
    color: black;
}
   
    </style>
    