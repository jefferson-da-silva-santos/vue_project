<script setup lang="ts">
import Home from './pages/Home/index.vue';
import Nav from './components/Nav/index.vue';
import TabBottom from './components/TabBottom/index.vue';
import Modal from '../Modal/index.vue'
</script>

<template>
  <div class="container">
    <Modal  />
    <Nav />
    <Home />
    <TabBottom />
  </div>
</template>

