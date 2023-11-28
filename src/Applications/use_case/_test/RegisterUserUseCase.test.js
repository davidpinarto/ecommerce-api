const RegisterUserUseCase = require('../RegisterUserUseCase');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UsersRepository = require('../../../Domains/users/UsersRepository');
const PasswordHash = require('../../security/PasswordHash');

describe('RegisterUserUseCase', () => {
  it('should orchestrating RegisterUserUseCase correctly', async () => {
    const useCasePayload = {
      username: 'david',
      password: 'david',
      fullname: 'david pinarto',
    };

    const mockRegisteredUser = new RegisteredUser({
      id: 'user-123',
      username: 'david',
      fullname: 'david pinarto',
    });

    const mockUsersRepository = new UsersRepository();
    const mockPasswordHash = new PasswordHash();

    mockUsersRepository.verifyAvailableUsername = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockPasswordHash.hash = jest.fn().mockImplementation(() => Promise.resolve('encrypted-password'));
    mockUsersRepository.addRegisterUser = jest.fn()
      .mockImplementation(() => Promise.resolve(mockRegisteredUser));

    const registerUserUseCase = new RegisterUserUseCase({
      usersRepository: mockUsersRepository,
      passwordHash: mockPasswordHash,
    });

    const registeredUser = await registerUserUseCase.execute(useCasePayload);

    expect(registeredUser).toEqual(new RegisteredUser({
      id: 'user-123',
      username: 'david',
      fullname: 'david pinarto',
    }));
    expect(mockUsersRepository.verifyAvailableUsername)
      .toHaveBeenCalledWith(useCasePayload.username);
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(useCasePayload.password);
    expect(mockUsersRepository.addRegisterUser).toHaveBeenCalledWith(new RegisterUser({
      username: 'david',
      password: 'encrypted-password',
      fullname: 'david pinarto',
    }));
  });
});
