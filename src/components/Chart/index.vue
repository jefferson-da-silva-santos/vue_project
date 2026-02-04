<script setup>
import { ref, onMounted } from "vue";
import PrimeChart from "primevue/chart";
import gastos from '../../../gastos.json';

const chartData = ref();
const chartOptions = ref();

onMounted(() => {
  chartData.value = montarDadosGrafico(gastos);
  chartOptions.value = montarOpcoesGrafico();
});

/* 🔹 FUNÇÃO PRINCIPAL */
function montarDadosGrafico(lista) {
  const documentStyle = getComputedStyle(document.documentElement);

  const meses = {};

  lista.forEach((gasto) => {
    const mes = new Date(gasto.data).toLocaleString("pt-BR", {
      month: "short",
      year: "numeric",
    });

    if (!meses[mes]) {
      meses[mes] = { fixo: 0, variavel: 0 };
    }

    gasto.fixo
      ? (meses[mes].fixo += gasto.valor)
      : (meses[mes].variavel += gasto.valor);
  });

  const labels = Object.keys(meses);

  const fixos = labels.map((m) => meses[m].fixo);
  const variaveis = labels.map((m) => meses[m].variavel);
  const total = labels.map((_, i) => fixos[i] + variaveis[i]);

  return {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Gastos Fixos",
        backgroundColor: "#2563EB",
        borderColor: "#1E40AF",
        borderWidth: 1,
        data: fixos,
      },
      {
        type: "bar",
        label: "Gastos Variáveis",
        backgroundColor: "#60A5FA",
        borderColor: "#2563EB",
        borderWidth: 1,
        data: variaveis,
      },

      {
        type: "line",
        label: "Total Mensal",
        borderColor: "#1E40AF",
        backgroundColor: "rgba(37, 99, 235, 0.4)",
        pointBackgroundColor: "#1E40AF",
        pointBorderColor: "#ffffff",
        borderWidth: 3,
        tension: 0.4,
        data: total,
      },
    ],
  };
}

/* 🔹 OPÇÕES */
function montarOpcoesGrafico() {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: documentStyle.getPropertyValue("--p-text-color"),
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#64748B", // cinza azulado
        },
        grid: {
          color: "#E2E8F0",
        },
      },
      y: {
        ticks: {
          color: "#64748B",
        },
        grid: {
          color: "#E2E8F0",
        },
      },
    },
  };
}
</script>

<template>
  <div class="card">
    <PrimeChart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      class="w-full"
    />
  </div>
</template>
