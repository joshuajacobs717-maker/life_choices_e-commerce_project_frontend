<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CompanyCard from "../components/CompanyCard.vue";
import CompanyForm from "../components/CompanyForm.vue";
import api from "@/services/api.js";

const store = useStore();

const companies = ref([]);
const editingCompany = ref(null);
const loading = ref(true);
const error = ref("");

const showModal = ref(false);
const saving = ref(false);
const formError = ref("");

// const form = ref({
//   name: "",
//   logo: "",
//   description: "",
//   latitude: "",
//   longitude: "",
// });

// ✅ token might be in localStorage even when store is empty after refresh
const token = computed(() => store.state?.token || localStorage.getItem("token") || "");

// ✅ robust admin check (supports common shapes)
const isAdmin = computed(() => {
  const roleFromGetter = store.getters?.userRole;
  const roleFromState = store.state?.user?.role;
  const roleNorm = String(roleFromGetter ?? roleFromState ?? "").toLowerCase();

  const u = store.state?.user || {};
  const flagAdmin =
    u.is_admin === 1 ||
    u.is_admin === true ||
    u.admin === 1 ||
    u.admin === true;

  return !!token.value && (flagAdmin || roleNorm === "admin" || roleNorm === "administrator");
});

// ✅ Normalize backend response (supports {companies:[...]} or [...])
function normalizeCompanies(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.companies)) return data.companies;
  return [];
}

async function fetchCompanies() {
  try {
    loading.value = true;
    error.value = "";

    const res = await api.get("/companies");
    companies.value = normalizeCompanies(res.data);
  } catch (e) {
    console.error("fetchCompanies error:", e);
    error.value =
      e?.response?.data?.message ||
      e?.message ||
      "Failed to load companies.";
  } finally {
    loading.value = false;
  }
}

function openModal() {
  editingCompany.value = null
  showModal.value = true
}

function closeModal() {
  showModal.value = false;
}

function toNumberOrNull(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function editCompany(company){
editingCompany.value = company
showModal.value = true
}

async function deleteCompany(company){

if(!confirm("Delete this company?")) return

try{

await api.delete(`/companies/${company.id || company.company_id}`)

fetchCompanies()

}catch(e){

console.error(e)

}

}

async function submitCompany(data){

try{

saving.value = true

if(editingCompany.value){

await api.put(`/companies/${editingCompany.value.id || editingCompany.value.company_id}`,data)

}else{

await api.post("/companies",data)

}

await fetchCompanies()

showModal.value = false
editingCompany.value = null

}catch(e){

console.error(e)
formError.value="Failed saving company"

}
finally{

saving.value=false

}

}

onMounted(async () => {
  // ✅ Always try load user when a token exists (even if store.state.token is empty)
  if (token.value && !store.state?.user) {
    try {
      await store.dispatch("fetchUser");
    } catch (e) {
      console.warn("fetchUser failed:", e);
    }
  }

  await fetchCompanies();
});
</script>

<template>
  <div class="companies-page">
    <div class="page-header">
      <div class="header-left">
        <h1>Companies</h1>
        <p>List of companies we've merged with</p>
      </div>

      <!-- ✅ Admin add button -->
      <button v-if="isAdmin" class="admin-btn" @click="openModal">
        + Add Company
      </button>
    </div>

    <div class="cards-container">
      <div v-if="loading" class="state">Loading companies...</div>
      <div v-else-if="error" class="state error">{{ error }}</div>

      <div v-else-if="companies.length === 0" class="state">
        No companies found.
      </div>

      <template v-else>
<CompanyCard
v-for="company in companies"
:key="company.company_id || company.id || company._id || company.name"
:company="company"
@edit="editCompany"
@delete="deleteCompany"
/>
      </template>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
<div class="modal">
  <div class="modal-head">
    <h2>
      {{ editingCompany ? "Edit Company" : "Add New Company" }}
    </h2>

    <button class="x" @click="closeModal">✕</button>
  </div>

  <CompanyForm
    :company="editingCompany"
    :saving="saving"
    @submit="submitCompany"
    @cancel="closeModal"
  />
</div>
    </div>
  </div>
</template>

<style scoped>
.companies-page {
  min-height: 100vh;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 30px;
  margin-top: 80px;
}

.header-left h1 {
  margin: 0;
  font-size: 2.5rem;
}

.header-left p {
  margin: 8px 0 0 0;
  color: #555;
}

.admin-btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease;
  white-space: nowrap;
}

.admin-btn:hover {
  transform: translateY(-1px);
}

.cards-container {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.state {
  color: #333;
  font-size: 1rem;
}

.state.error {
  color: #b00020;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 16px;
}

.modal {
  width: min(640px, 100%);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid #eee;
}

.modal-head h2 {
  margin: 0;
  font-size: 1.25rem;
}

.x {
  border: 0;
  background: transparent;
  font-size: 1.1rem;
  cursor: pointer;
}

.modal-body {
  padding: 18px;
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  font-size: 0.9rem;
  color: #222;
}

input,
textarea {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 10px 12px;
  outline: none;
  font-size: 0.95rem;
}

input:focus,
textarea:focus {
  border-color: #111;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-error {
  margin: 0;
  color: #b00020;
  font-size: 0.9rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #111;
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.ghost {
  background: #fff;
  color: #111;
}

@media (max-width: 900px) {
  .companies-page {
    padding: 24px 16px;
  }
  .row {
    grid-template-columns: 1fr;
  }
}
</style>