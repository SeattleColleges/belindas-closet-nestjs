import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { Role } from '../../user/schemas/user.schema';

describe('Tests AuthController signup, login, changePassword, and forgot password', () => {
  let controller: AuthController;
  let service: AuthService;
  let mockAuthService:any;

  beforeEach(async () => {
    mockAuthService = {
      signUp: jest.fn((dto) =>
        Promise.resolve({ token: 'jwtTokenTest', ...dto }),
      ),
      login: jest.fn(() => Promise.resolve({ token: 'jwtTokenTest' })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a new user and return a token', async () => {
    const signUpDto = {
      firstName: 'Testy',
      lastName: 'McTesterson',
      email: 'test@example.com',
      password: 'password',
      role: Role.ADMIN,
    };
    const response = await controller.signUp(signUpDto);
    expect(response).toEqual({ token: 'jwtTokenTest', ...signUpDto });
    expect(service.signUp).toHaveBeenCalledWith(signUpDto);
  });

  it('should login and return a token', async () => {
    const loginDto = {
      email: 'testuser@example.com',
      password: 'testuser@example.com',
    };
    await controller.login(loginDto);
    expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    expect(mockAuthService.login).toHaveBeenCalledTimes(1);
  });
});