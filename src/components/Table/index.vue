<script setup lang="ts">
import { ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import { VPdfViewer } from "@vue-pdf-viewer/viewer";
import pdf from "../../../JavaScript.pdf";


const src = ref(pdf);

defineProps<{
  gastos: any;
}>();

const mostrarPdf = ref(false);
</script>

<template>
  <DataTable :value="gastos" tableStyle="min-width: 80rem; height: 20rem; font-size: .8rem" stripedRows>
    <Column field="id" header="ID" />

    <Column field="data" header="Data">
      <template #body="{ data }">
        {{ new Date(data.data).toLocaleDateString("pt-BR") }}
      </template>
    </Column>

    <Column field="descricao" header="Descrição" />
    <Column field="categoria" header="Categoria" />

    <Column field="subcategorias" header="Subcategorias">
      <template #body="{ data }">
        {{ data.subcategorias.join(", ") }}
      </template>
    </Column>

    <Column field="valor" header="Valor">
      <template #body="{ data }">
        R$ {{ data.valor.toFixed(2) }}
      </template>
    </Column>

    <Column field="formaPagamento" header="Pagamento" />

    <Column field="parcelado" header="Parcelado">
      <template #body="{ data }">
        {{ data.parcelado ? "Sim" : "Não" }}
      </template>
    </Column>

    <Column field="parcelas" header="Parcelas">
      <template #body="{ data }">
        {{ data.parcelado ? data.parcelas : "-" }}
      </template>
    </Column>

    <Column field="cartao" header="Cartão">
      <template #body="{ data }">
        {{ data.cartao ?? "-" }}
      </template>
    </Column>

    <Column field="fixo" header="Fixo">
      <template #body="{ data }">
        {{ data.fixo ? "Sim" : "Não" }}
      </template>
    </Column>

    <Column field="prioridade" header="Prioridade" />

    <Column field="status" header="Status">
      <template #body="{ data }">
        <span :class="`status status-${data.status}`">
          {{ data.status }}
        </span>
      </template>
    </Column>

    <Column field="observacoes" header="Observações">
      <template #body="{ data }">
        {{ data.observacoes ?? "-" }}
      </template>
    </Column>

    <Column field="tags" header="Tags">
      <template #body="{ data }">
        {{ data.tags.join(", ") }}
      </template>
    </Column>

    <Column field="comprovante" header="Comprovante">
      <template #body="{ data }">
        <span v-if="data.comprovante">📎 {{ data.comprovante }}</span>
        <span v-else>-</span>
      </template>
    </Column>

    <!-- 🔥 NOVA COLUNA PDF -->
    <Column header="PDF">
      <template #body>
        <Button icon="pi pi-file-pdf" severity="danger" size="small" label="Abrir" @click="mostrarPdf = true" />
      </template>
    </Column>
  </DataTable>

  <!-- 📄 MODAL COM PDF -->
  <Dialog v-model:visible="mostrarPdf" modal header="Comprovante em PDF" style="width: 80vw">
    <VPdfViewer :src="src" />
  </Dialog>
</template>
