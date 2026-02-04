export interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: Date;

  categoria: string;
  subcategorias: string[];

  formaPagamento: "credito" | "debito" | "pix" | "dinheiro";
  parcelado: boolean;
  parcelas?: number;
  cartao?: string;

  fixo: boolean;
  prioridade: number;
  status: "pago" | "pendente" | "atrasado";

  observacoes?: string;
  tags: string[];

  comprovante?: File;
}
