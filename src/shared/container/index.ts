import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UserTokensRepository',
  UsersTokensRepository,
);
