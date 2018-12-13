import { NextFunction, Request, Response } from 'express';
import { Server } from './server';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const id = req['session'].id;
  if (id === undefined) {
    next();
  }
  if (Server.DATAGRID.has(id)) {
    req['session'].login = Server.DATAGRID.get(id);
  }
}

export function enableCORS(req, res, next) {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "https://trix-server.herokuapp.com/, http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}


