<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  company: Object,
  saving: Boolean
});

const emit = defineEmits(["submit","cancel"]);

const form = ref({
  name: "",
  logo: "",
  description: "",
  latitude: "",
  longitude: ""
});

watch(
  () => props.company,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = {
        name: "",
        logo: "",
        description: "",
        latitude: "",
        longitude: ""
      };
    }
  },
  { immediate: true }
);

function submit(){
  emit("submit", form.value);
}
</script>

<template>
<form class="form" @submit.prevent="submit">

<label>
Name
<input v-model="form.name" required />
</label>

<label>
Logo URL
<input v-model="form.logo"/>
</label>

<label>
Description
<textarea v-model="form.description"/>
</label>

<div class="row">
<label>
Latitude
<input v-model="form.latitude"/>
</label>

<label>
Longitude
<input v-model="form.longitude"/>
</label>
</div>

<div class="actions">

<button type="button" class="ghost" @click="$emit('cancel')">
Cancel
</button>

<button type="submit">
{{ saving ? "Saving..." : "Save" }}
</button>

</div>

</form>
</template>