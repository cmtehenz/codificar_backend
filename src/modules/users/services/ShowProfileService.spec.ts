import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: 'secret',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@exemple.com');
  });

  it('should not be able to show profile with invalid id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@exemple.com',
      password: 'secret',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('john@exemple.com');
  });
  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'not-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
