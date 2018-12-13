import axios, { AxiosError, AxiosInstance } from 'axios';
import { Mensagem } from '../interfaces/AccessInterface';

export class QueryService {

  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.dialogflow.com/v1',
      headers: {
        Authorization: 'Bearer 1558fb72d3014751a03cddda9fe5d839',
        'Content-Type': 'application/json',
      },
    });
    this.http.interceptors.request.use((request) => {
      console.log('Starting Request', request);
      return request;
    });

  }

  public postMessage(query: string, sessionId: string, contextos: any[]): Promise<Mensagem> {
    return this.http.post('/query?v=20150910', {
      sessionId,
      query,
      contexts: contextos,
      lang: 'pt-br',
    }).then((res) => {
      console.info(`Recebida a mensagem do endpoint: ${JSON.stringify(res.data)}`);
      if (this.loginNecessario(res.data.result.metadata) === true) {
        return {
          mensagem: ['LOGIN_NECESSARIO'],
          contextos: res.data.result.contexts,
          metadata: res.data.result.metadata,
        };
      }
      return {
        mensagem: res.data.result.fulfillment.messages.map((message) => {
          return message.speech;
        }),
        contextos: res.data.result.contexts,
        metadata: res.data.result.metadata,
      };
    }).catch((err: AxiosError) => {
      console.error(err);
      return {
        mensagem: ['Ops, houve um erro com a requisição.'],
        contextos: [],
      };
    });
  }

  public loginNecessario(metadata): boolean {
    return (metadata.intentName.toLowerCase().includes('consulta'));
  }
}
