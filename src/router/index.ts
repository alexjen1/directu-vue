import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Navbar from '@/components/Navbar.vue';
import Create from '@/farmers/Create.vue';
import Edit from '@/farmers/Edit.vue';
import Index from '@/farmers/Index.vue';
import Show from '@/farmers/Show.vue';
import CountPerGender from '@/report/CountPerGender.vue';
import CountPerBarangay from '@/report/CountPerBarangay.vue';
import CountOfFarmingActivity from '@/report/CountOfFarmingActivity.vue';
import CountPerSitio from '@/report/CountPerSitio.vue';
import CountPerHighestFormalEduc from '@/report/CountPerHighestFormalEduc.vue';
import CountPerReligion from '@/report/CountPerReligion.vue';
import CountPerCivilStatus from '@/report/CountPerCivilStatus.vue';
import CountPerHouseHoldHeads from '@/report/CountPerHouseHoldHeads.vue';
import CountPwd from '@/report/CountPwd.vue';
import CountIVpsBeneficiary from '@/report/CountIVpsBeneficiary.vue';
import CountIndiGroup from '@/report/CountIndiGroup.vue';
import CountGovernmentID from '@/report/CountGovernmentID.vue';
import CountMemberOfAnyFarmersAssociationCooperative from '@/report/CountMemberOfAnyFarmersAssociationCooperative.vue';
import CountEmergencyContact from '@/report/CountEmergencyContact.vue';
import TableFiltering from '@/report/TableFiltering.vue';
import Activity from '@/components/Activity.vue';
import MassUpload from '@/components/MassUpload.vue';


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/navbar',
    name: 'navbar',
    component: Navbar,
  },
  {
    path: '/farmers/create',
    name: 'CreateFarmers',
    component: Create,
  },
  {
    path: '/edit-farmer/:id',
    name: 'FarmersEdit',
    component: Edit,
  },
  {
    path: '/farmers/index',
    name: 'FarmersIndex',
    component: Index,
  },
  {
    path: '/show-farmer/:id',
    name: 'Show',
    component: Show,
  },
  {
    path: '/per-gender',
    name: 'CountPerGender',
    component: CountPerGender,
  },
  {
    path: '/per-brgy',
    name: 'CountPerBarangay',
    component: CountPerBarangay,
  },
  {
    path: '/farming-activity',
    name: 'CountOfFarmingActivity',
    component: CountOfFarmingActivity,
  },
  {
    path: '/per-sitio',
    name: 'CountPerSitio',
    component: CountPerSitio,
  },
  {
    path: '/per-educational-level',
    name: 'CountPerHighestFormalEduc',
    component: CountPerHighestFormalEduc,
  },
  {
    path: '/per-religion',
    name: 'CountPerReligion',
    component: CountPerReligion,
  },
  {
    path: '/per-civil-status',
    name: 'CountPerCivilStatus',
    component: CountPerCivilStatus,
  },
  {
    path: '/per-household-heads',
    name: 'CountPerHouseHoldHeads',
    component: CountPerHouseHoldHeads,
  },
  {
    path: '/per-pwd',
    name: 'CountPwd',
    component: CountPwd,
  },
  {
    path: '/per-IVpsBeneficiary',
    name: 'CountIVpsBeneficiary',
    component: CountIVpsBeneficiary,
  },
  {
    path: '/per-indi-group',
    name: 'CountIndiGroup',
    component: CountIndiGroup,
  },
  {
    path: '/per-gov-id',
    name: 'CountGovernmentID',
    component: CountGovernmentID,
  },
  {
    path: '/per-member-farmers-association',
    name: 'CountMemberOfAnyFarmersAssociationCooperative',
    component: CountMemberOfAnyFarmersAssociationCooperative,
  },
  {
    path: '/per-emergency-contact',
    name: 'CountEmergencyContact',
    component: CountEmergencyContact,
  },
  {
    path: '/table-filtering',
    name: 'TableFiltering',
    component: TableFiltering,
  },
  {
  path: '/activity', // Add a route for the activity log
  name: 'Activity',
  component: Activity,
  },
  {
    path: '/mass-upload', // Add a route for the activity log
    name: 'MassUpload',
    component: MassUpload,
    },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to protect the dashboard route
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed if authenticated
  }
});

export default router;
