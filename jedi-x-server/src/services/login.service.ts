
import axios, { AxiosError, AxiosInstance } from 'axios';
import * as qs from 'qs';
import { WebhookClient } from 'dialogflow-fulfillment';
import * as moment from 'moment';

export class LoginService {
  private readonly http: AxiosInstance;
  private static APIKEY = 'l7xx3e4479b454a04307acc6ee5e1258f9e6';

  constructor() {
    this.http = axios.create({
      baseURL: 'https://logindes.caixa.gov.br/auth/realms/internet/protocol/openid-connect',
      headers: {
        apikey: LoginService.APIKEY,
      },
    });
    this.http.interceptors.request.use((request) => {
      console.log('Starting Request', request);
      return request;
    });
  }

  public getAccessToken(refreshToken: String): Promise<LoginResponse> {
    return this.http.post('/token', qs.stringify({
      grant_type: 'refresh_token',
      client_id: 'cli-web-hackcaixa',
      client_secret: 'd677675f-4b68-4561-8d75-4f139caa6cf7',
      refresh_token: refreshToken,
    })).then((res) => {
      return {
        login: true,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        loginTime: moment(),
      };
    });
  }

  public doLogin(username: String, password: String): Promise<any> {
    console.log(`Efetuando login do usuario ${username}`);
    return this.http.post('/token', qs.stringify({
      username,
      password,
      client_id: 'cli-web-hackcaixa',
      client_secret: 'd677675f-4b68-4561-8d75-4f139caa6cf7',
      grant_type: 'password',
    })).then((res) => {
      return {
        login: true,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        loginTime: moment(),
      };
    }).catch((err: AxiosError) => {
      console.error(
        `Falha ao efetuar o login do usuario ${username} - Codigo ${err.response.status}`,
      );
      return {
        login: false,
      };
    });
  }
}

export interface LoginResponse {
  login: boolean;
  accessToken?: String;
  refreshToken?: String;
  loginTime?: moment.Moment;
}
