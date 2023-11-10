import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { Role, User } from '../../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  let mockUserModel = {
    create: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  /* describe('addUser', () => {
    it('create a new user model and save it, returning the generated id', async () => {

    });
  }); */

  //describe('getAllUsers', () => {});

  //describe('getUserById', () => {});

  //describe('getUserByEmail', () => {});

  //describe('updateUser', () => {});
});
