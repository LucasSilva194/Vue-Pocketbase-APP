<template>
  <div class="w-full max-w-md space-y-8">
    <h1>REQUEST PASSWORD CHANGE</h1>
    <div class="sm:col-span-2 sm:col-start-1 mt-4">
      <label
        for="email"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Email Address</label
      >
      <div class="mt-2">
        <input
          v-model="email"
          type="text"
          name="email"
          id="email"
          placeholder="Enter email address"
          class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div class="sm:col-span-2 sm:col-start-1 mt-2">
      <button
        type="button"
        @click="doRequest"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send Request
      </button>
      <button
        type="button"
        @click="($event) => router.back()"
        class="ml-3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePocketBase } from "../composables/usePocketBase";

const pb = usePocketBase();

const email = ref("");

const router = useRouter();

const doRequest = async () => {
  if (!email.value) {
    alert("Please enter an email address.");
    return;
  }
  try {
    await pb.value.collection("users").requestPasswordReset(email.value);
    alert("Password reset request sent.");

    pb.value.authStore.isValid && router.replace("/login");
  } catch (error) {
    alert(error.message);
  }
};
</script>
