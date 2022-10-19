import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  public autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction) {
    const token = req.query.token || req.headers['x-acess-token']

    if(!token) {
      return res.status(401).send({ mensage: 'Acesso restrito 🚫' })
    }

    return next();
  }
}

export default new AuthMiddleware();
