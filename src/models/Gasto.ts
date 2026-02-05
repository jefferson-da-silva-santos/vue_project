export interface Gasto {
  id: number;
  descricao: string;
  valor: number;
  data: string | null;
  parcelado: boolean;
  parcelas?: number;
  cartao?: string;
  fixo?: boolean;
  prioridade?: number;
  status?: string;
  observacoes?: string;
  tags?: string[];
  comprovante?: string | null;
}
