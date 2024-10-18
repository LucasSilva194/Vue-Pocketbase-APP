<template>
  <div class="w-full max-w-md space-y-8">
    HOME PAGE
    <h2>
      Welcome,
      {{ (currentUser && currentUser?.name) || currentUser?.email }}
    </h2>
    <div class="sm:col-span-2 sm:col-start-1 mt-2">
      <button
        type="button"
        @click="doLogout"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePocketBase } from "../composables/usePocketBase";

const pb = usePocketBase();

const currentUser = ref();
const router = useRouter();

onMounted(async () => {
  currentUser.value = pb.value.authStore.isValid
    ? pb.value.authStore.model
    : null;
});

const doLogout = () => {
  pb.value.authStore.clear();
  currentUser.value = null;
  router.replace("/login");
};
</script>
