export interface DadosBeneficio {
  temBeneficio: boolean;
  beneficios: {
    beneficio: Beneficio[];
  };
}

export interface Beneficio {
  parcela: {
    numero: string;
    situacao: string;
    valor: string;
  };
  situacao_cvc: string;
  data_valida_inicio: string;
  data_valida_fim: string;
}
