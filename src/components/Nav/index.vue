<script setup lang="ts">
import logo from '../../assets/image/logo.png'
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  router.push('/login')
}
</script>
<template>
  <nav class="nav">
    <img :src="logo" alt="logo" class="logo" />
    <ul>
      <li>Inicio</li>
      <li>Configs</li>
      <li>Fale conosco</li>
      <li @click="logout">Sair</li>
    </ul>
  </nav>
</template>