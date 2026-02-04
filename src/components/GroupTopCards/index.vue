<script setup lang="ts">
import TopCard from "../TopCard/index.vue"
import { useGastos } from "../../stores/useGastos"

// 🔥 agora vem tudo pronto
const {
  totalGasto,
  mediaDiaria,
  maiorGasto,
  porcentagemGastosPagos
} = useGastos()

// Formatação BR 🇧🇷 (UI é responsabilidade do componente)
const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

const formatarPorcentagem = (valor: number) =>
  `${valor.toFixed(0)}%`
</script>

<template>
  <div class="group-top-cards">
    <TopCard
      title="Total gasto no mês"
      :value="formatarMoeda(totalGasto)"
    />

    <TopCard
      title="Média diária de gastos"
      :value="formatarMoeda(mediaDiaria)"
    />

    <TopCard
      title="Maior gasto do período"
      :value="formatarMoeda(maiorGasto)"
    />

    <TopCard
      title="% de gastos pagos"
      :value="formatarPorcentagem(porcentagemGastosPagos)"
    />
  </div>
</template>
