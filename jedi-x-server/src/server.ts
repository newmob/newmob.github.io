import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import { WebhookClient } from 'dialogflow-fulfillment';
import * as moment from 'moment';
import { LoginController } from './controllers/login.controller';
import { MensagemController } from './controllers/mensagem.controller';
import { AccessInterface } from './interfaces/AccessInterface';
import * as cors from 'cors'
import { enableCORS } from './middlewares';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const nedbsession = require('nedb-session-store')(session);

export class Server {
  private readonly app: express.Application;
  private readonly loginController = new LoginController();
  private readonly menasagemController = new MensagemController();
  public static readonly DATAGRID = new Map<String, AccessInterface>();

  constructor() {
    this.app = express();
    this.app.listen(process.env['PORT'] || 9091);
    this.configure();
    this.routes();
    console.log('Ready to action');
  }

  private routes(): void {
    this.app.post('/auth', (req, res) => this.loginController.doLogin(req, res));
    this.app.post('/mensagem', (req, res) => this.menasagemController.postMessage(req, res));
  }

  private configure() {
    const corsOptions = {
      origin: true,
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 204
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(enableCORS);
    this.app.use(session({
      secret: 'notsosecret',
      resave: false,
      name: 'hackcaixa',

      saveUninitialized: true,
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: '/',
      },
      store: new nedbsession({
        filename: 'sessions.db',
      }),
    }));
    // Habilitamos CORS
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // Verificamos se o usuario esta logado, se estiver e o ultimo login for superior a 4 minutos
    // Requisitamos um novo Access Token
    this.app.use((req, res, next) => {
      console.log(req['session']);
      if (req['session'].count === undefined) {
        req['session'].count = 0;
      } else {
        req['session'].count += 1;
      }
      console.log(req['session'].count);
      console.log(req['session'].id);
      if (
        (req['session'].isLogged)
        && (req['session'].isLogged.login === true)
        && (moment().add(4, 'minutes').isBefore(req['session'].isLogged.loginTime))
      ) {
      }
      req['session'].save();
      next();
    });
  }

  private getContexts(request: express.Request, contexto: []): any[] {
    console.log(request['session'].isLogged);
    if (
      request['session'].isLogged &&
      request['session'].isLogged.login === true
    ) {
      console.info('Usuario Logado detectado');
      contexto.push();
    }
    return contexto;
  }
}

new Server();
