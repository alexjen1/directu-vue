<template>
  <div class="background">
    <div class="login-page">
      <div class="info-section">
        <img :src="logoImage" class="logo" alt="Logo" />
        <h1>Your Partner in Agricultural Success</h1>
        <p>
          At the heart of our mission is a dedication to farmers. With billions of liras invested annually in agriculture, 
          we provide the tools and support necessary to help you succeed. 
          Our Farmers Profiling Management System is here to elevate your farming experience and ensure a brighter future for all.
        </p>
      </div>

      <div class="login-section">
        <img :src="headerLogoImage" class="header-logo" alt="Logo" />
        <h1>Agriculturist Login</h1>

        <form @submit.prevent="login">
          <div class="input-icon">
            <span class="icon">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              v-model="email"
              type="email"
              placeholder="Username"
              class="form-control"
              required
            />
          </div>

          <div class="input-icon">
            <span class="icon">
              <i class="fas fa-lock"></i>
            </span>
            <input
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Password"
              class="form-control"
              required
            />
            <span class="toggle-password" @click="passwordVisible = !passwordVisible">
              <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
          <p class="forgot-password">Forgot Password?</p>
          <button type="submit" class="submit-btn">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios';

import logoImage from '@/assets/images/login-logo.jpeg';
import headerLogoImage from '@/assets/images/login-icon.png';

const authUrl = 'http://localhost:8055/auth/login'; 
const email = ref('');
const password = ref('');
const error = ref('');
const passwordVisible = ref(false); 
const router = useRouter(); 

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value; 
};

const logActivity = async (email, action) => {
 // const auth_token = 'AFw4qrw2-w0Moc4GknbzohwpjUN8YUn3'; 
  const token = localStorage.getItem('auth_token'); 
  try {
    await axios.post('http://localhost:8055/items/activity_logs', {
      admin_email: email,
      action: action,
      time: new Date().toISOString(),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Increment unread notifications
    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

const login = async () => {
  error.value = ''; 

  try {
    const response = await axios.post(authUrl, {
      email: email.value,
      password: password.value,
    });

    const accessToken = 'AFw4qrw2-w0Moc4GknbzohwpjUN8YUn3'; 
    // const accessToken = response.data.data.access_token; 
    // const refreshToken = response.data.data.refresh_token; 

    // Store both the access token and refresh token in localStorage
    localStorage.setItem('auth_token', accessToken); 
    // localStorage.setItem('refresh_token', refreshToken);  
    localStorage.setItem('email', email.value); 

    logActivity(email.value, "Login successfully");

    // Hide the background overlay and redirect to the Dashboard
    document.querySelector('.background').style.display = 'none';
    router.push({ name: 'Dashboard' });
  } catch (err) {
    alert('Login failed: ' + (err.response?.data?.errors[0]?.message || 'Unknown error'));
  }
};
</script>


<style scoped>
.input-icon {
  position: relative;
  width: 400px;
}

.input-icon .icon {
  position: absolute;
  left: 10px;
  top: 35%;
  transform: translateY(-50%);
  color: #888;
}

.input-icon .form-control {
  padding-left: 40px;
}
.toggle-password {
  position: absolute;
  right: -20px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}
.background{
  background: darkgreen;
}
h1 {
  color: black;
  margin-bottom: 20px;
}
.login-page {
  display: flex;
  height: 90vh;
  width: 95vw;  
  overflow: hidden;
  margin-left: 45px;
  margin-top: 45px;
}

.info-section {
  flex: 1;
  background-color: #f5f8f9;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
    width: 100%; /* Make sure logo is responsive */
    height: auto; /* Automatically adjust height to maintain aspect ratio */
    max-height: 550px; /* Limit the maximum height to 400px */
    border-radius: 8px; /* Optional: rounded corners for the image */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional shadow */
}

.info-section h1 {
  color: #636c72;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 30px;
}

.info-section p {
  color: #848e96;
  font-size: 18px;
  line-height: 1.6;
  max-width: 500px;
  margin-bottom: 40px;
}

.login-section {
  flex: .7;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
}

.header-logo {
  width: 80px;
  margin-top: 80px;
}

.login-section h3 {
  color: #8c7e38;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.login-section h2 {
  color: #646a1f;
  font-size: 24px;
  margin-bottom: 40px;
}

.form-control {
  border: 1px solid #57b32b;
  border-radius: 13px;
  padding: 12px;
  width: 110%;
  height: 50px;
  margin-bottom: 25px;
}

.form-control:focus {
  border-color: #57b32b;
  outline: none; 
}

.submit-btn {
  background-color: #57b32b;
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  width: 102%;
  font-weight: bold;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #469e21;
}
.forgot-password {
  color: #57b32b;
  font-size: 14px;
  cursor: pointer;
  margin-top: -10px;
  margin-bottom: 10px;
  margin-left: 320px;
  width: 100%;
}
.forgot-password:hover {
  text-decoration: underline;
}


@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
    height: 100%;
  }

  .info-section,
  .login-section {
    width: 100%;
  }

  .info-section {
    padding: 30px;
  }

  .login-section {
    padding: 30px;
  }
}

</style>