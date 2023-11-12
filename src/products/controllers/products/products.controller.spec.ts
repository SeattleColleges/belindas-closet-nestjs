import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Product } from '../../schemas/product.schema';
import { UpdateProductDto } from '../../dto/update-product.dto';


describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  let mockService = {
    createProduct: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateProduct: jest.fn()
  }

  let mockCreateProductDto = {
    createByUserID: '',
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: 'string',
    productImage: 'string',
  } as unknown as CreateProductDto

  let mockUpdateProductDto = {
    createByUserID: '',
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: 'string',
    productImage: 'string',
  } as unknown as UpdateProductDto

  let mockProduct = {
    id: 'idString',
    createByUserID: '',
    productType: [],
    gender: [],
    productShoeSize: [],
    productSize: [],
    productSizePantsWaist: [],
    productSizePantsInseam: [],
    productDescriptionOptional: 'string',
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
        let response = await controller.createProduct(mockCreateProductDto);
        expect(service.createProduct).toHaveBeenCalledWith(mockCreateProductDto);
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
      const result = await controller.updateProductById(mockProduct.id, mockUpdateProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

});
