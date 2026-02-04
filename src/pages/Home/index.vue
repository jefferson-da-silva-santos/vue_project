<script setup lang="ts">
import GroupTopCards from "../../components/GroupTopCards/index.vue";
import Table from "../../components/Table/index.vue";
import Chart from "../../components/Chart/index.vue";
import { useGastos } from "../../stores/useGastos";

const { gastos } = useGastos();

</script>

<template>
  <GroupTopCards />
  <div class="home">
    <Table :gastos="gastos" />
  </div>
  <Chart />
</template>
