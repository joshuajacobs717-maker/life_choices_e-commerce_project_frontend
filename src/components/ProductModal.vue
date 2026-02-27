<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  show: Boolean,
  product: Object
});

const emit = defineEmits(["close"]);

const store = useStore();

onMounted(() => {
  store.dispatch("fetchCategories");
  store.dispatch("fetchCompanies");
});

const form = ref({
  name: "",
  price: "",
  stock: "",
  category_id: "",
  company_id: "",
  photo: null
});

watch(
  () => props.product,
  (val) => {
    if (val) {
      form.value = { ...val, photo: null };
    } else {
      form.value = {
        name: "",
        price: "",
        stock: "",
        category_id: "",
        company_id: "",
        photo: null
      };
    }
  },
  { immediate: true }
);

const categories = computed(() => store.state.categories.categories);
const companies = computed(() => store.state.companies.companies);

async function submit() {
  const formData = new FormData();

  Object.keys(form.value).forEach((key) => {
    if (form.value[key] !== null && form.value[key] !== "") {
      formData.append(key, form.value[key]);
    }
  });

  if (props.product) {
    await store.dispatch("updateItem", {
      item_id: props.product.item_id,
      updates: formData
    });
  } else {
    await store.dispatch("createItem", formData);
  }

  emit("close");
}
</script>
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>{{ product ? "Edit Product" : "Add New Product" }}</h2>

<label>Product Name</label>
<input v-model="form.name" placeholder="Enter product name" />

<label>Price</label>
<input v-model="form.price" type="number" placeholder="Enter price" />

<label>Stock</label>
<input v-model="form.stock" type="number" placeholder="Stock quantity" />
<label>Category</label>
      <select v-model="form.category_id">
        <option disabled value="">Select Category</option>
        <option v-for="c in categories" :key="c.category_id" :value="c.category_id">
          {{ c.name }}
        </option>
      </select>
<label>Company</label>
      <select v-model="form.company_id">
        <option disabled value="">Select Company</option>
        <option v-for="c in companies" :key="c.company_id" :value="c.company_id">
          {{ c.name }}
        </option>
      </select>

      <input type="file" @change="e => form.photo = e.target.files[0]" />

      <div class="buttons">
        <button @click="submit">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 2000;
}

/* MODAL CARD */
.modal {
  background:white;
  padding:32px;
  border-radius:16px;
  width:420px;

  display:flex;
  flex-direction:column;
  gap:16px;

  box-shadow:0 25px 60px rgba(0,0,0,0.25);

  animation: modalPop 0.25s ease;
}

/* Animation */
@keyframes modalPop {
  from {
    opacity:0;
    transform:scale(0.92);
  }
  to {
    opacity:1;
    transform:scale(1);
  }
}

/* Title */
.modal h2{
  text-align:center;
  margin-bottom:10px;
  font-size:22px;
  font-weight:600;
  color:#1a1a1a;
}

/* Inputs */
.modal input,
.modal select{
  padding:10px 12px;
  border-radius:8px;
  border:1px solid #DCDCDC;
  font-size:14px;
  transition:all 0.2s;
}

/* Input focus */
.modal input:focus,
.modal select:focus{
  outline:none;
  border-color:#0d6efd;
  box-shadow:0 0 0 3px rgba(13,110,253,0.1);
}

/* File input */
.modal input[type="file"]{
  border:none;
  background:#f6f6f6;
  padding:10px;
  cursor:pointer;
}

/* Buttons container */
.buttons{
  display:flex;
  gap:12px;
  margin-top:10px;
}

/* Save button */
.buttons button:first-child{
  flex:1;
  background:#171717;
  color:white;
  border:none;
  padding:10px;
  border-radius:8px;
  font-weight:500;
  cursor:pointer;
  transition:0.2s;
}

.buttons button:first-child:hover{
  background:#8f8f8f;
}

/* Cancel button */
.buttons button:last-child{
  flex:1;
  background:#f1f1f1;
  border:none;
  padding:10px;
  border-radius:8px;
  cursor:pointer;
  transition:0.2s;
}

.buttons button:last-child:hover{
  background:#e5e5e5;
}
</style>