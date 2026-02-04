<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useGastos } from "../../stores/useGastos.ts";

export interface FormGasto {
  descricao: string;
  valor: number | null;
  data: Date | null;
  categoria: string;
  formaPagamento: string;
  prioridade: number;
  status: string;
  parcelado: boolean;
  fixo: boolean;
  parcelas: number;
  cartao?: string;
  subcategorias: string[];
  tags: string[];
  observacoes?: string;
  comprovante?: File | null;
}

// PrimeVue
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

// =====================
// Modal
// =====================
const visible = defineModel<boolean>("visible", { default: false });

// =====================
// Store
// =====================
const { adicionarGasto } = useGastos();

// =====================
// Schema
// =====================
const schema = yup.object({
  descricao: yup.string().required("Descrição obrigatória"),
  valor: yup.number().nullable().required("Valor obrigatório").positive(),
  data: yup.date().required("Data obrigatória"),
  categoria: yup.string().required("Categoria obrigatória"),
  formaPagamento: yup.string().required("Forma de pagamento obrigatória"),
  prioridade: yup.number().required(),
  status: yup.string().required(),
});

// =====================
// Form
// =====================
const { handleSubmit, resetForm } = useForm<FormGasto>({
  validationSchema: schema,
  initialValues: {
    prioridade: 2,
    status: "pago",
    parcelado: false,
    fixo: false,
    parcelas: 1,
    subcategorias: [],
    tags: [],
  },
});

// =====================
// Fields
// =====================
const { value: descricao } = useField<string>("descricao");
const { value: valor } = useField<number | null>("valor");
const { value: data } = useField<Date | null>("data");
const { value: categoria } = useField<string>("categoria");
const { value: formaPagamento } = useField<string>("formaPagamento");
const { value: prioridade } = useField<number>("prioridade");
const { value: status } = useField<string>("status");
const { value: parcelado } = useField<boolean>("parcelado");
const { value: fixo } = useField<boolean>("fixo");
const { value: parcelas } = useField<number>("parcelas");
const { value: cartao } = useField<string>("cartao");
const { value: subcategorias } = useField<string[]>("subcategorias");
const { value: tags } = useField<string[]>("tags");
const { value: observacoes } = useField<string>("observacoes");
const { value: comprovante } = useField<File | null>("comprovante");

// =====================
// Submit
// =====================
const onSubmit = handleSubmit((form) => {
  const gasto = {
    id: Date.now(),
    ...form,
    valor: form.valor!, // 👈 confia no schema
    data: form.data ? form.data.toISOString() : null,
    comprovante: form.comprovante?.name || null,
  };

  adicionarGasto(gasto);

  resetForm();
  visible.value = false;

  console.log("💸 Gasto salvo:", gasto);
});
</script>

<template>
  <Dialog v-model:visible="visible" header="Novo Gasto" modal class="w-[40rem]">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <InputText v-model="descricao" placeholder="Descrição" />

      <InputNumber v-model="valor" mode="currency" currency="BRL" />

      <Calendar v-model="data" showTime />

      <Dropdown
        v-model="categoria"
        :options="['Alimentação', 'Moradia', 'Lazer', 'Saúde', 'Transporte']"
        placeholder="Categoria"
      />

      <MultiSelect
        v-model="subcategorias"
        :options="['Mensal', 'Supermercado', 'Conta fixa', 'Emergência']"
        placeholder="Subcategorias"
      />

      <Dropdown
        v-model="formaPagamento"
        :options="['credito', 'debito', 'pix', 'dinheiro']"
        placeholder="Forma de pagamento"
      />

      <div class="flex gap-6 items-center">
        <Checkbox v-model="parcelado" binary />
        <span>Parcelado</span>

        <Checkbox v-model="fixo" binary />
        <span>Gasto fixo</span>
      </div>

      <InputNumber
        v-if="parcelado"
        v-model="parcelas"
        :min="1"
        placeholder="Parcelas"
      />

      <InputText
        v-if="formaPagamento === 'credito'"
        v-model="cartao"
        placeholder="Cartão"
      />

      <div class="flex gap-6 items-center">
        <RadioButton v-model="prioridade" :value="1" /> Alta
        <RadioButton v-model="prioridade" :value="2" /> Média
        <RadioButton v-model="prioridade" :value="3" /> Baixa
      </div>

      <Dropdown
        v-model="status"
        :options="['pago', 'pendente', 'atrasado']"
        placeholder="Status"
      />

      <MultiSelect
        v-model="tags"
        :options="['fixo', 'lazer', 'essencial', 'emergencia']"
        placeholder="Tags"
      />

      <Textarea v-model="observacoes" rows="3" />

      <FileUpload
        mode="basic"
        chooseLabel="Comprovante"
        @select="(e) => (comprovante = e.files[0])"
      />

      <Button label="Salvar Gasto" type="submit" />
    </form>
  </Dialog>
</template>
