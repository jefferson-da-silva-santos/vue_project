import { ref, computed, watch } from "vue";
import gastosIniciais from "../../gastos.json";

const STORAGE_KEY = "gastos";

type Gasto = {
  id: number;
  descricao: string;
  valor: number;
  data: string | null;
  categoria?: string;
  formaPagamento?: string;
  prioridade?: number;
  status?: string;
  parcelado?: boolean;
  parcelas?: number;
  fixo?: boolean;
  cartao?: string;
  observacoes?: string;
  tags?: string[];
  subcategorias?: string[];
  comprovante?: string | null;
};

const gastos = ref<Gasto[]>([]);

// =====================
// Carregar
// =====================
function carregarGastos() {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);

    gastos.value = salvo ? JSON.parse(salvo) : gastosIniciais;

    console.log("📦 Gastos carregados:", gastos.value);
  } catch (error) {
    console.error("❌ Erro ao carregar gastos:", error);
    gastos.value = [];
  }
}

// =====================
// Normalização
// =====================
const gastosNormalizados = computed<Gasto[]>(() =>
  Array.isArray(gastos.value)
    ? gastos.value.map((g) => ({
        ...g,
        valor: Number(g.valor) || 0,
        status: g.status || "pendente",
        data: g.data || null,
      }))
    : [],
);

// =====================
// CÁLCULOS (CARDS)
// =====================

// 💰 Total gasto
const totalGasto = computed(() =>
  gastosNormalizados.value.reduce((total, gasto) => total + gasto.valor, 0),
);

// 🔥 Maior gasto
const maiorGasto = computed(() => {
  if (!gastosNormalizados.value.length) return 0;
  return Math.max(...gastosNormalizados.value.map((g) => g.valor));
});

// 📅 Média diária
const mediaDiaria = computed(() => {
  if (!gastosNormalizados.value.length) return 0;

  const diasUnicos = new Set(
    gastosNormalizados.value
      .filter((g) => g.data)
      .map((g) => new Date(g.data as string).toDateString()),
  );

  return diasUnicos.size ? totalGasto.value / diasUnicos.size : 0;
});

// ✅ % gastos pagos
const porcentagemGastosPagos = computed(() => {
  if (!gastosNormalizados.value.length) return 0;

  const pagos = gastosNormalizados.value.filter(
    (g) => g.status === "pago",
  ).length;

  return (pagos / gastosNormalizados.value.length) * 100;
});

// =====================
// Ações
// =====================
function adicionarGasto(gasto: Gasto) {
  console.log("➕ Adicionando gasto:", gasto);
  gastos.value.push(gasto);
}

// =====================
// Persistência automática
// =====================
watch(
  gastos,
  (novoValor) => {
    console.log("💾 Salvando gastos no localStorage");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novoValor));
  },
  { deep: true },
);

// inicialização
carregarGastos();

// =====================
// Export
// =====================
export function useGastos() {
  return {
    // estado
    gastos,
    gastosNormalizados,

    // cálculos
    totalGasto,
    maiorGasto,
    mediaDiaria,
    porcentagemGastosPagos,

    // ações
    adicionarGasto,
  };
}
