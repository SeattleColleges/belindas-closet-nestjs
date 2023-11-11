import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  let mockUserModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn()
  }

  let mockUser = {
    id: 'user.id',
    firstName: 'user.firstName',
    lastName: 'user.lastName',
    email: 'user@email.com',
    role: 'ADMIN',
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

  describe('getAllUsers', () => {
    it('should call find on the user model and return a result', async () => {
      jest
        .spyOn(model, 'find')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue([mockUser])
        } as any));
      const result = await service.getAllUsers();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('getUserById', () => {
    beforeEach(() => {
      jest
        .spyOn(model, 'findById')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue(mockUser)
        } as any));
    });
    it('should call findById on the model and return a result', async () => {
      const result = await service.getUserById(mockUser.id);
      expect(model.findById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });
    it('should return a Http Exception when model returns null', async () => {
      jest
        .spyOn(model, 'findById')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
      await expect(service.getUserById(mockUser.id)).rejects.toThrow(HttpException);
      expect(model.findById).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getUserByEmail', () => {
    beforeEach(() => {
      jest
        .spyOn(model, 'findOne')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue(mockUser)
        } as any));
    });
    it('should call findOne on the model and return a result', async () => {
      const result = await service.getUserByEmail(mockUser.email);
      expect(model.findOne).toHaveBeenCalledWith({ 'email' : mockUser.email });
      expect(result).toEqual(mockUser);
    });
    it('should return a Http Exception when model returns null', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
      await expect(service.getUserByEmail(mockUser.email)).rejects.toThrow(HttpException);
      expect(model.findOne).toHaveBeenCalledWith({ 'email' : mockUser.email });
    });
  });

  describe('updateUser', () => {
    it('should call findByIdAndUpdate on the model and return a result', async () => {
      const updatedUser = {
        ...mockUser,
        firstName: 'Updated',
        lastName: 'Name'
      };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue(updatedUser)
        } as any));
      const result = await service.updateUser(mockUser.id, updatedUser as any);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser.id,
        updatedUser,
        {
          new: true,
          runValidators: true
        }
      );
      expect(result.firstName).toEqual(updatedUser.firstName);
      expect(result.lastName).toEqual(updatedUser.lastName);
    });
  });
});
