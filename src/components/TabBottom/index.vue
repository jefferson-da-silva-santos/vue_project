<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../Modal/index.vue'

const modalVisible = ref(false)
</script>

<template>
  <div class="tab-bottom">
    <div class="tab-bottom-content">
      <div class="group-button">
        <button
          class="button-center"
          @click="modalVisible = true"
        >
          <i class="bx bx-dollar"></i>
        </button>
      </div>
    </div>

    <!-- controle via v-model -->
    <Modal v-model:visible="modalVisible" />
  </div>
</template>
