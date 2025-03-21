import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../schemas/product.schema';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { User } from '../../../user/schemas/user.schema';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockService = {
    createProduct: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateProduct: jest.fn(),
    delete: jest.fn()
  }

  const mockCreateProductDto = {
    createdByUser: User,
    productType: '',
    gender: '',
    productShoeSize: '',
    productSize: '',
    productSizePantsWaist: '',
    productSizePantsInseam: '',
    productDescriptionOptional: 'string',
    productImage: 'string',
  } as unknown as CreateProductDto

  const mockUpdateProductDto = {
    createdByUser: '',
    updatedByUser: '',
    productType: '',
    gender: '',
    productShoeSize: '',
    productSize: '',
    productSizePantsWaist: '',
    productSizePantsInseam: '',
    productDescriptionOptional: 'string',
    productImage: 'string',
  } as unknown as UpdateProductDto

  const mockProduct = {
    id: 'string',
    productType: '',
    productGender: '',
    productSizeShoe: '',
    productSizes: '',
    productSizePantsWaist: '',
    productSizePantsInseam: '',
    productDescription: 'string',
    productImage: 'string',
  } as unknown as Product


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: mockService
        }
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>('PRODUCTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it(
      'should call createProduct on the service and return a response',
      async () => {
        jest
          .spyOn(service, 'createProduct')
          .mockResolvedValue(mockProduct);
        const response = await controller.createProduct(mockCreateProductDto, {} as User);
        expect(response).toEqual(mockProduct);
      }
    );
  });

  describe('getProducts', () => {
    it('should call findAll on the service and return a result', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValue([mockProduct]);
      const result = await controller.getProducts();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findByID', () => {
    it('should call findOne on the service and return a result', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockProduct);
      const result = await controller.findByID(mockProduct.id);
      expect(service.findOne).toHaveBeenCalledWith(mockProduct.id);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateProductById', () => {
    it('should call updateProduct on the service and return a result', async () => {
      jest
        .spyOn(service, 'updateProduct')
        .mockResolvedValue(mockProduct);
      const result = await controller.updateProductById(mockProduct.id, mockUpdateProductDto, {} as User);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should call delete on the service and return a result', async () => {
      jest
        .spyOn(service, 'delete')
        .mockResolvedValue(mockProduct);
      const result = await controller.deleteProduct(mockProduct.id);
      expect(service.delete).toHaveBeenCalledWith(mockProduct.id);
      expect(result).toEqual(mockProduct);
    });
  });

});
