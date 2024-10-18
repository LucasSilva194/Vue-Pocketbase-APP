<template>
  <div class="w-full max-w-md space-y-8">
    <h1>CREATE ACCOUNT</h1>
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
      <label
        for="password"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Password</label
      >
      <div class="mt-2">
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div class="sm:col-span-2 sm:col-start-1 mt-2">
      <label
        for="fullName"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Full Name</label
      >
      <div class="mt-2">
        <input
          v-model="fullName"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter full name"
          class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    <div class="sm:col-span-2 sm:col-start-1 mt-2">
      <button
        type="button"
        @click="doCreateAccount"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save new user
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePocketBase } from "../composables/usePocketBase";

const pb = usePocketBase();

const currentUser = ref();
const email = ref("");
const password = ref("");
const fullName = ref("");

const router = useRouter();

const doLogin = async () => {
  try {
    const authData = await pb.value
      .collection("users")
      .authWithPassword(email.value, password.value);

    pb.value.authStore.isValid && router.replace("/home");
  } catch (error) {
    alert(error.message);
  }
};

const doCreateAccount = async () => {
  try {
    const data = {
      email: `user_${self.crypto.randomUUID().split("-")[0]}`,
      email: email.value,
      emailVisibility: true,
      password: password.value,
      passwordConfirm: password.value,
      name: fullName.value,
    };

    const record = await pb.value.collection("users").create(data);

    await doLogin();
  } catch (error) {
    alert(error.message);
  }
};
</script>
