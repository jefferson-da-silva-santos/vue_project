<script setup lang="ts">
import Nav from '../components/Nav/index.vue'
import TabBottom from '../components/TabBottom/index.vue'
import Modal from '../components/Modal/index.vue'
</script>

<template>
  <div class="container">
    <Modal />
    <Nav />

    <!-- páginas privadas -->
    <router-view />

    <TabBottom />
  </div>
</template>
