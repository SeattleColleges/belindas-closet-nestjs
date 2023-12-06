import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Model, Types } from 'mongoose';
import { Product } from '../../schemas/product.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  let mockProductModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  }

  let mockProduct = {
    id: new Types.ObjectId().toHexString(),
    createByUserID: '',
    productType: [],
    productGender: [],
    productSizeShoe: [],
    productSizes: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescription: 'string',
    productImage: 'string',
    isHidden: false
  } as Product

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

  describe('createProduct', () => {
    it('should call create on the model and return a product', async () => {
      const newProduct = mockProduct;
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => (Promise.resolve(newProduct) as any));
      const result = await service.createProduct(newProduct as any);
      expect(result).toEqual(newProduct);
    });
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
    it('should return a Not Found Exception when model returns null', async () => {
      jest
        .spyOn(model, 'find')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(model.find).toHaveBeenCalled();
    });
    it('should return a Not Found Exception when model returns an empty array', async () => {
      jest
        .spyOn(model, 'find')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce([]),
        } as any);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest
        .spyOn(model, 'findById')
        .mockImplementation(() => ({
          exec: jest.fn().mockResolvedValue(mockProduct),
        } as any));
    });
    it('should call findById on the model and return a result', async () => {
      const result = await service.findOne(mockProduct.id);
      expect(model.findById).toHaveBeenCalledWith(mockProduct.id);
      expect(result).toEqual(mockProduct);
    });
    it('should return a Not Found Exception when model returns null', async () => {
      jest
        .spyOn(model, 'findById')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
      await expect(service.findOne(mockProduct.id)).rejects.toThrow(NotFoundException);
      expect(model.findById).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe('updateProduct', () => {
    it('should call findByIdAndUpdate on the model and return a result', async () => {
      const updatedProduct = {
        ...mockProduct,
        productType: ['updated', 'product']
      };
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(updatedProduct)
        } as any);
      const result = await service.updateProduct(mockProduct.id, updatedProduct as any);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProduct.id,
        updatedProduct,
        {
          new: true,
          runValidators: true,
        }
      );
      expect(result).toEqual(updatedProduct);
    });
  });
  
  describe('archive', () => {
    const archivedProduct = {
      ...mockProduct,
      isSold: true
    };
    beforeEach(() => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(archivedProduct)
        } as any);
    });
    it('should call findByIdAndUpdate on the model and return the result', async () => {
      const result = await service.archive(mockProduct.id);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockProduct.id, { isSold: true });
      expect(result).toEqual(archivedProduct);
    });
    it('should throw BadRequestException error when an invalid id is provided', async () => {
      await expect(service.delete('invalidId')).rejects.toThrow(BadRequestException);
    });
    it('should throw NotFoundException error when product not found', async () => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);
      await expect(service.delete(mockProduct.id)).rejects.toThrow(NotFoundException);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockProduct.id,
        { isSold: true }
      );
    });
  });
});
