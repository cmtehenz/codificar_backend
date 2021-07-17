/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import uploadConfig from '@config/upload';

import AppError from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import '../typeorm';
import '../../container';

import 'express-async-errors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    // eslint-disable-next-line no-console
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('⛵️ Server started on port 3333');
});
