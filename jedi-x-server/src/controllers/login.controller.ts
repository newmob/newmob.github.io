import { LoginResponse, LoginService } from '../services/login.service';
import { Request, Response } from 'express';

export class LoginController {

  private readonly service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public doLogin(request: Request, response: Response): void {
    if (request.body.usuario && request.body.senha) {
      this.service.doLogin(request.body.usuario, request.body.senha).then((res) => {
        if (res.login) {
          request['session'].login = res;
        }
        response.send(res);
      });
    } else {
      response.send(response.send({
        login: false,
        mensagem: 'Falta Parametros',
      }));
    }

  }

  private getInformacoes(request: Request, response: Response) {
    console.log(request['session'].login);
    if (request['session'].login.login === true) {
      console.log(request['session'].metadata);
    }
  }

}
