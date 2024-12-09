<template>
  <div class="report_count-container">
    <Navbar />
    <div class="content-box" id="reportContent">
      <h1>Farmer Report Search by Indigenous Group</h1>
      <div>
      </div>

      <!-- Display grouped farmers by indigenous group -->
      <div v-if="groupedFarmers.length > 0">
        <p style="color: black;">Total Count: {{ groupedFarmers.length }}</p>
        <div class="table-responsive">
          <table class="table">
            <thead class="table-primary">
              <tr>
                <th>#</th>
                <th>Indigenous Group</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(farmer, index) in groupedFarmers" :key="farmer.id">
                <td>{{ index + 1 }}</td>
                <td>{{ farmer.indigenous_group }}</td>
                <td>{{ farmer.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Message when no farmers found -->
      <div v-else>
        <p>No farmers found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import html2pdf from "html2pdf.js";

const groupedFarmers = ref([]); // To hold grouped farmers by indigenous group
const indigenousGroups = ref([]); // To hold available indigenous groups
const selectedIndigenousGroups = ref([]); // To hold selected indigenous groups
const selectedIndigenousGroup = ref(""); // Current selected group
const token = localStorage.getItem("auth_token");

// Fetch and group farmers by member_of_an_indiginous_group
const fetchFarmers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8055/items/farmers?fields=member_of_an_indiginous_group",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Group farmers by indigenous group and count occurrences
    const indigenousGroupCounts = {};
    response.data.data.forEach((farmer) => {
      const group = farmer.member_of_an_indiginous_group || "Not Specified";
      if (indigenousGroupCounts[group]) {
        indigenousGroupCounts[group]++;
      } else {
        indigenousGroupCounts[group] = 1;
      }
    });

    // Transform the object into an array for rendering
    groupedFarmers.value = Object.entries(indigenousGroupCounts).map(
      ([group, count], index) => ({
        id: index + 1, // Auto-incremented ID
        indigenous_group: group,
        count,
      })
    );

    // Populate the dropdown options
    indigenousGroups.value = Object.keys(indigenousGroupCounts);
  } catch (error) {
    console.error("Error fetching farmers:", error);
    groupedFarmers.value = [];
  }
};

// Add selected indigenous group
const addIndigenousGroup = () => {
  if (
    selectedIndigenousGroup.value &&
    !selectedIndigenousGroups.value.includes(selectedIndigenousGroup.value)
  ) {
    selectedIndigenousGroups.value.push(selectedIndigenousGroup.value);
  }
};

// Remove selected indigenous group
const removeIndigenousGroup = (group) => {
  selectedIndigenousGroups.value = selectedIndigenousGroups.value.filter(
    (g) => g !== group
  );
};

// PDF Download Function
const downloadPDF = async () => {
  const element = document.getElementById("reportContent");

  const options = {
    margin: [0.1, 0.1, 0.1, 0.1],
    filename: "farmer_report_indigenous_group.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "legal", orientation: "landscape" },
  };

  html2pdf()
    .set(options)
    .from(element)
    .save()
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

onMounted(() => {
  fetchFarmers();
});
</script>

<style scoped>
/* Reuse the styles from the initial code */
.report_count-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: #f2f4f7;
}

.content-box {
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h1 {
  color: black;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: left;
}
.table {
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: collapse;
}

.table-primary {
  background-color: #387e90;
  color: white;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.tag {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.5rem;
  background-color: #ddd;
  border-radius: 5px;
}
</style>