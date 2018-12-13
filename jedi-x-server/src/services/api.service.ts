import axios from 'axios';
const API = 'https://api.caixa.gov.br:8443/sandbox/servicos-sociais/v1/consulta';

const getInfoFromAPI = nis => axios.get(`${API}?NIS=${nis}`);

export const getInformacaoBeneficio = (nis) => {
  getInfoFromAPI(nis).then((res) => {
    if (res.data.dados_consulta_servicos_sociais
      && res.data.dados_consulta_servicos_sociais.dados_seguro_desemprego) {
      return {
        temBeneficio: true,
        parcelas: res.data.dados_consulta_servicos_sociais.dados_seguro_desemprego.beneficios,
      };
    }
    return {
      temBeneficio: false,
    };
  });
};

/**
 },
 "dados_seguro_desemprego": {
      "beneficios": {
        "beneficio": [
          {
            "parcela": {
              "numero": "1",
              "situacao": "DISPONIVEL",
              "valor": "35.00"
            },
            "situacao_cvc": "DISPONIVEL",
            "data_valida_inicio": "2018-02-01",
            "data_valida_fim": "2018-12-30"
          },
          {
            "parcela": {
              "numero": "2",
              "situacao": "DISPONIVEL",
              "valor": "35.00"
            },
            "situacao_cvc": "DISPONIVEL",
            "data_valida_inicio": "2018-02-01",
            "data_valida_fim": "2018-12-30"
          }
        ]
      }
 **/
//# sourceMappingURL=apiService.js.map
