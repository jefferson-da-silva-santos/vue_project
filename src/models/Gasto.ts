export interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: string | null;

  categoria?: string;
  formaPagamento?: string;
  prioridade?: number;
  status?: string;

  parcelado: boolean;
  parcelas?: number;

  fixo: boolean;
  cartao?: string;

  subcategorias: string[];
  tags: string[];

  observacoes?: string;
  comprovante?: string | null;
}
