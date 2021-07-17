import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepostory: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepostory = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepostory,
    );
  });

  it('should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'john@exemplo.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@exemplo.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token.', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepostory, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'john@exemplo.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@exemplo.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
