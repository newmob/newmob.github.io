import { QueryService } from '../services/query.service';
import { Request, Response } from 'express';

export class MensagemController {

  private readonly service: QueryService = new QueryService();

  public postMessage(request: Request, response: Response) {
    console.info(`Recebida a mensagem: ${request.body.mensagem}`);
    console.log(request['session'].metadata);
    this.service
      .postMessage(
        request.body.mensagem, request['session'].id,
        this.getContexts(request, request.body.contextos),
      ).then((res) => {
        console.log(res.metadata);
        response.send(res);
        request['session'].metadata = res.metadata;
      });
  }

  private getContexts(request: Request, contexto: []): any[] {
    // console.log(request['session'].isLogged);
    // if (
    //   request['session'].isLogged &&
    //   request['session'].isLogged.login === true
    // ) {
    //   console.info('Usuario Logado detectado');
    //   contexto.push();
    // }
    return contexto;
  }
}
