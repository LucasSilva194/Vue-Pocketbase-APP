<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px6 lg:px-8"
  >
    <router-view> </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import PocketBase from "pocketbase";
</script>
