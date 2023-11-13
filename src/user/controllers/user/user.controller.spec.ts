import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { User } from '../../schemas/user.schema';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  let mockService = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUserByEmail: jest.fn(),
    updateUser: jest.fn()
  }

  let mockUser = {
    id: 'user.id',
    firstName: 'user.firstName',
    lastName: 'user.lastName',
    email: 'user@email.com',
    role: 'ADMIN',
  } as unknown as User

  let mockUpdateUser = {
    id: 'user.id',
    firstName: 'updated.firstName',
    lastName: 'updated.lastName',
    email: 'user@email.com',
    role: 'ADMIN',
  } as unknown as UpdateUserDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'USER_SERVICE',
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>('USER_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should call getAllUsers on the service and return a result', async () => {
      jest
        .spyOn(service, 'getAllUsers')
        .mockResolvedValue([mockUser]);
      const result = await controller.getAllUsers();
      expect(service.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('getUserById', () => {
    it('should call getUserById on the service and return a result', async () => {
      jest
        .spyOn(service, 'getUserById')
        .mockResolvedValue(mockUser);
      const result = await controller.getUserById(mockUser.id);
      expect(service.getUserById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByEmail', () => {
    it('should call getUserByEmail on the service and return a result', async () => {
      jest
        .spyOn(service, 'getUserByEmail')
        .mockResolvedValue(mockUser);
      const result = await controller.getUserByEmail(mockUser.email);
      expect(service.getUserByEmail).toHaveBeenCalledWith(mockUser.email);
      expect(result).toEqual(mockUser);
    });
  });
  
  describe('updateUser', () => {
    it('should call updateUser on the service and return a result', async () => {
      jest
        .spyOn(service, 'updateUser')
        .mockResolvedValue(mockUpdateUser as User);
      const result = await controller.updateUser(mockUser.id, mockUpdateUser);
      console.log(result)
    });
  });
});
