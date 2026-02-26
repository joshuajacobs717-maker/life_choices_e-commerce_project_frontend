<script setup>
import { ref, watch, defineExpose } from "vue"
import { Modal } from "bootstrap"
import { useStore } from "vuex"
// import { Modal } from "bootstrap"

const props = defineProps({
  category: Object
})

const store = useStore()
const categoryName = ref("")
const isEditMode = ref(false)

// DOM ref for modal
const modalEl = ref(null)
let modalInstance = null

watch(
  () => props.category,
  (newVal) => {
    if (newVal) {
      isEditMode.value = true
      categoryName.value = newVal.name
    } else {
      isEditMode.value = false
      categoryName.value = ""
    }
  },
  { immediate: true }
)

const submitCategory = async () => {
  if (!categoryName.value.trim()) return

  try {
    if (isEditMode.value && props.category) {
      await store.dispatch("updateCategory", {
        category_id: props.category.category_id,
        updates: { name: categoryName.value }
      })
    } else {
      await store.dispatch("createCategory", {
        name: categoryName.value
      })
    }

    const modal = Modal.getInstance(modalEl.value)
    if (modal) modal.hide()
  } catch (error) {
    console.error(error)
  }
}

// Expose show method for parent
defineExpose({
  show() {
    if (!modalInstance && modalEl.value) {
      modalInstance = new Modal(modalEl.value)
    }
    if (modalInstance) modalInstance.show()
  }
})
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addCategoryModal"
    tabindex="-1"
    ref="modalEl"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content custom-modal p-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 class="fw-bold mb-1">
              {{ isEditMode ? "Update Category" : "Create New Category" }}
            </h4>
            <p class="text-muted small mb-0">
              Keep it simple. Keep it powerful.
            </p>
          </div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <form @submit.prevent="submitCategory">
          <div class="form-floating mb-4">
            <input
              type="text"
              class="form-control custom-input"
              id="categoryName"
              placeholder="Category Name"
              v-model="categoryName"
            />
            <label for="categoryName">Category Name</label>
          </div>

          <button
            type="submit"
            class="btn btn-dark w-100 py-2 fw-semibold"
          >
            {{ isEditMode ? "Update Category" : "Create Category" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>