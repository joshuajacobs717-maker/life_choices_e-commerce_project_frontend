<script setup>
import { ref, watch, computed, onMounted } from "vue"
import { useStore } from "vuex"

const props = defineProps({
  show: Boolean,
  product: Object
})

const emit = defineEmits(["close"])

const store = useStore()
onMounted(() => {
  store.dispatch("fetchCategories")
  store.dispatch("fetchCompanies")
})

const form = ref({
  name: "",
  price: "",
  stock: "",
  category_id: "",
  company_id: "",
  photo: null
})

watch(() => props.product, (val) => {
  if (val) {
    form.value = { ...val, photo: null }
  }
})

const categories = computed(() => store.state.categories.categories)
const companies = computed(() => store.state.companies.companies)

async function submit() {
  const formData = new FormData()

  Object.keys(form.value).forEach(key => {
    if (form.value[key] !== null) {
      formData.append(key, form.value[key])
    }
  })

  if (props.product) {
    await store.dispatch("updateItem", {
      item_id: props.product.item_id,
      updates: formData
    })
  } else {
    await store.dispatch("createItem", formData)
  }

  emit("close")
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>{{ product ? "Edit Product" : "Add New Product" }}</h2>

      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.price" type="number" placeholder="Price" />
      <input v-model="form.stock" type="number" placeholder="Stock" />

      <select v-model="form.category_id">
        <option disabled value="">Select Category</option>
        <option v-for="c in categories" :key="c.category_id" :value="c.category_id">
          {{ c.name }}
        </option>
      </select>

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
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
}
.modal {
  background:white;
  padding:30px;
  border-radius:12px;
  width:400px;
  display:flex;
  flex-direction:column;
  gap:10px;
}
</style>