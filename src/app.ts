import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import usuarioRoute from './routes/usuario.route';
import mensagemRoute from './routes/mensagem.route';

import { DB_PASS, DB_USER } from './config/db.config';

export class App {
  private express: express.Application;
  private porta = 3000;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private listen(): void {
    this.express.listen(this.porta, () => {
      console.log(`Servidor iniciado na porta ${this.porta} 🚀`);
    });
  }

  private database(): void {
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.uq5yhrt.mongodb.net/?retryWrites=true&w=majority`)
  }

  private routes(): void {
    this.express.use('/usuarios', usuarioRoute)
    this.express.use('/mensagens', mensagemRoute)
  }
}
