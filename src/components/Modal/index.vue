<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useGastos } from "../../stores/useGastos.ts";
import { ref } from 'vue';
import Slider from 'primevue/slider';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import Knob from 'primevue/knob';
import SelectButton from 'primevue/selectbutton';
import Rating from 'primevue/rating';
import ColorPicker from 'primevue/colorpicker';
import Chips from 'primevue/chips';
import Listbox from 'primevue/listbox';
import FloatLabel from 'primevue/floatlabel'; // Opcional, mas bom para testar UI
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

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

const value = ref<number | number[] | undefined>(undefined);
const checked = ref<boolean>(false);

// Remova aquela variável 'value' genérica e use nomes específicos:
const dataMask = ref<string | undefined>(undefined); // Para o InputMask
const senha = ref<string | undefined>(undefined);    // Para o Password
const valorKnob = ref<number>(0);                    // Exemplo para um Knob ou Slider
</script>

<template>
  <Dialog v-model:visible="visible" header="Laboratório de Testes PrimeVue" modal class="w-[50rem]">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6 p-2">
      
      <div class="grid grid-cols-2 gap-4">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText v-model="descricao" placeholder="Busca interna (IconField)" class="w-full" />
        </IconField>

        <InputMask v-model="dataMask" mask="99/99/9999" placeholder="Data com Máscara" class="w-full" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <FloatLabel>
          <InputText id="username" v-model="descricao" class="w-full" />
          <label for="username">Float Label Test</label>
        </FloatLabel>

        <Password v-model="senha" placeholder="Campo Senha" toggleMask class="w-full" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-bold">Tags (Chips):</label>
        <Chips v-model="tags" placeholder="Digite e dê enter" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label class="font-bold">Avaliação (Rating):</label>
          <Rating v-model="prioridade" :stars="5" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="font-bold">Cor do Item:</label>
          <ColorPicker v-model="value" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-bold">Prioridade (SelectButton):</label>
        <SelectButton 
          v-model="prioridade" 
          :options="[{label: 'Baixa', value: 1}, {label: 'Média', value: 2}, {label: 'Alta', value: 3}]" 
          optionLabel="label" 
          optionValue="value" 
        />
      </div>

      <div class="grid grid-cols-2 gap-8 items-center">
        <div class="flex flex-col gap-4">
          <label class="font-bold">Volume (Slider: {{prioridade}})</label>
          <Slider v-model="prioridade" :min="0" :max="100" />
        </div>
        
        <div class="flex flex-col items-center gap-2">
          <label class="font-bold">Progresso (Knob):</label>
          <Knob v-model="prioridade" :size="80" />
        </div>
      </div>

      <hr class="border-t border-gray-200 my-2" />

      <div class="grid grid-cols-2 gap-4">
        <Listbox v-model="categoria" :options="['Opção A', 'Opção B', 'Opção C']" class="w-full" />
        
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <ToggleSwitch v-model="checked" />
            <span>Ativar Notificações</span>
          </div>
          
          <div class="flex items-center gap-3">
            <Checkbox v-model="parcelado" binary />
            <span>Confirmar Termos</span>
          </div>

          <div class="flex flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <RadioButton v-model="status" value="pago" />
              <label>Pago</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton v-model="status" value="pendente" />
              <label>Pendente</label>
            </div>
          </div>
        </div>
      </div>

      <Textarea v-model="observacoes" rows="3" placeholder="Observações detalhadas..." autoResize />

      <FileUpload 
        mode="advanced" 
        name="demo[]" 
        url="/api/upload" 
        accept="image/*" 
        :maxFileSize="1000000"
        label="Upload Avançado"
        chooseLabel="Escolher"
        uploadLabel="Enviar"
        cancelLabel="Cancelar"
      />
      
      <InputText v-model="descricao" placeholder="Descrição" />

      <InputNumber v-model="valor" mode="currency" currency="BRL" />

      <Calendar v-model="data" showTime />

      <Dropdown v-model="categoria" :options="['Alimentação', 'Moradia', 'Lazer', 'Saúde', 'Transporte']"
        placeholder="Categoria" />

      <MultiSelect v-model="subcategorias" :options="['Mensal', 'Supermercado', 'Conta fixa', 'Emergência']"
        placeholder="Subcategorias" />

      <Dropdown v-model="formaPagamento" :options="['credito', 'debito', 'pix', 'dinheiro']"
        placeholder="Forma de pagamento" />

      <div class="flex gap-6 items-center">
        <Checkbox v-model="parcelado" binary />
        <span>Parcelado</span>

        <Checkbox v-model="fixo" binary />
        <span>Gasto fixo</span>
      </div>

      <InputNumber v-if="parcelado" v-model="parcelas" :min="1" placeholder="Parcelas" />

      <InputText v-if="formaPagamento === 'credito'" v-model="cartao" placeholder="Cartão" />

      <div class="flex gap-6 items-center">
        <RadioButton v-model="prioridade" :value="1" /> Alta
        <RadioButton v-model="prioridade" :value="2" /> Média
        <RadioButton v-model="prioridade" :value="3" /> Baixa
      </div>

      <Dropdown v-model="status" :options="['pago', 'pendente', 'atrasado']" placeholder="Status" />

      <MultiSelect v-model="tags" :options="['fixo', 'lazer', 'essencial', 'emergencia']" placeholder="Tags" />

      <Textarea v-model="observacoes" rows="3" />

      <FileUpload mode="basic" chooseLabel="Comprovante" @select="(e) => (comprovante = e.files[0])" />



      <Slider v-model="value" class="w-56" />

      <ToggleSwitch v-model="checked" />
      <Button label="Salvar Gasto" type="submit" />
    </form>
      <div class="flex justify-end gap-3 mt-4">
        <Button label="Cancelar" icon="pi pi-times" severity="danger" variant="text" @click="visible = false" />
        <Button label="Salvar Gasto" icon="pi pi-check" type="submit" severity="success" raised />
      </div>
  </Dialog>
</template>
