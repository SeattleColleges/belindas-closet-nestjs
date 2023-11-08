import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Model } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  let mockProductModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  }

  let mockProduct = {
    createByUserID: '',
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: 'string',
    productImage: 'string',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('findAll', () => {
    it('should call find on the product model and return a result', async () => {
      jest
        .spyOn(model, 'find')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue([mockProduct]),
        } as any));
      const result = await service.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
    it('should call find on the product model and return a Not Found Exception', async () => {
      jest
        .spyOn(model, 'find')
        .mockImplementation(() => ({
          exec: jest.fn().mockReturnValue(NotFoundException),
        } as any));
      const result = await service.findAll();
      expect(model.find).toHaveBeenCalled();
      expect(result).toBe(NotFoundException);
    }); 
  });

});
