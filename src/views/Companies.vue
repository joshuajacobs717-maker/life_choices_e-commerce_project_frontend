<script setup>
import { ref, onMounted } from "vue";
import CompanyCard from "../components/CompanyCard.vue";

const companies = ref([]);
const loading = ref(true);
const error = ref("");

// ✅ replace with your real backend endpoint
const API_URL = "http://localhost:3000/api/companies";

async function fetchCompanies() {
  try {
    loading.value = true;
    error.value = "";

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();

    // supports either: [{...}, {...}] OR { companies: [...] }
    companies.value = Array.isArray(data) ? data : (data.companies || []);
  } catch (e) {
    error.value = e?.message || "Failed to load companies.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCompanies);
</script>

<template>
  <div class="companies-page">
    <!-- Top Left Header -->
    <div class="page-header">
      <h1>Companies</h1>
      <p>List of companies we've partnered with</p>
    </div>

    <!-- Cards Area fills the rest -->
    <div class="cards-container">
      <div v-if="loading" class="state">Loading companies...</div>
      <div v-else-if="error" class="state error">{{ error }}</div>

      <template v-else>
        <CompanyCard
          v-for="company in companies"
          :key="company.id || company._id || company.name"
          :company="company"
        />
      </template>
    </div>
  </div>
</template>

<style>
.companies-page {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

/* Header stays top-left */
.page-header {
  align-self: flex-start;
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.page-header p {
  margin: 8px 0 0 0;
  color: #555;
}

/* Cards fill remaining space */
.cards-container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 24px;
  align-content: start;
}

.state {
  color: #333;
  font-size: 1rem;
}

.state.error {
  color: #b00020;
}
</style>