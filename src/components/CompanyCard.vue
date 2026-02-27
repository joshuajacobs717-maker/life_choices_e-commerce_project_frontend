<script setup>
import { computed } from "vue"; // ✅ REQUIRED

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view-on-map","edit","delete"]);

function getLatLng(company) {
  const lat =
    company.latitude ??
    company.lat ??
    company.coordinates?.lat ??
    (Array.isArray(company.coordinates) ? company.coordinates[1] : undefined);

  const lng =
    company.longitude ??
    company.lng ??
    company.coordinates?.lng ??
    (Array.isArray(company.coordinates) ? company.coordinates[0] : undefined);

  const latNum = Number(lat);
  const lngNum = Number(lng);

  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return null;
  return { lat: latNum, lng: lngNum };
}

function openInGoogleMaps() {
  const ll = getLatLng(props.company);
  if (!ll) return;

  const url = `https://www.google.com/maps?q=${ll.lat},${ll.lng}`;
  window.open(url, "_blank", "noopener,noreferrer");

  emit("view-on-map", { ...ll, company: props.company });
}

const logoSrc = computed(() => {
  return (
    props.company.logo ||
    props.company.logoUrl ||
    props.company.image ||
    props.company.imageUrl ||
    "https://via.placeholder.com/250x180"
  );
});

const titleText = computed(
  () => props.company.name || props.company.company_name || "Company"
);

const descriptionText = computed(
  () =>
    props.company.description ||
    props.company.company_description ||
    "No description provided."
);

const hasCoords = computed(() => !!getLatLng(props.company));
</script>

<template>
  <div class="brand">
    <div class="brand-left">
      <img :src="logoSrc" :alt="titleText" />
      <h4>{{ titleText }}</h4>
    </div>

    <div class="brand-right">
      <p>{{ descriptionText }}</p>
<div class="actions">
  <button @click="openInGoogleMaps" :disabled="!hasCoords">
    {{ hasCoords ? "View On Map" : "No Location" }}
  </button>

  <button class="edit" @click="$emit('edit', company)">
    Edit
  </button>

  <button class="delete" @click="$emit('delete', company)">
    Delete
  </button>
</div>
    </div>
  </div>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);

  transition: 0.3s ease;
}

.brand:hover {
  transform: translateY(-5px);
}

.brand-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}

.brand-left img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
}

.brand-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.brand-right p {
  margin: 0;
  line-height: 1.5;
  color: #333;
}

button {
  align-self: flex-start;
  padding: 10px 18px;
  background-color: #121212;
  color: #ebebeb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  background-color: #484848;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .brand {
    flex-direction: column;
    text-align: center;
  }

  .brand-right {
    align-items: center;
  }

  button {
    align-self: center;
  }
}
.actions{
display:flex;
gap:10px;
flex-wrap:wrap;
}

.edit{
background:#1976d2;
}

.delete{
background:#c62828;
}
</style>