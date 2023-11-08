import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { Response } from 'express';


describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let mockResponse: Response;

  let mockService = {
    createProduct: jest.fn(),
    findAll: jest.fn()
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
  } as unknown as CreateProductDto


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
    // this passes as we are only expecting the controller to call the service
    // this catches an error as there is no mock database set up for the mock service
    it(
      'should call the createProduct method of the service and throw an error',
      async () => {
        let response = await controller.createProduct(mockProduct, mockResponse);
        //can add values to properties and expect it to fail
        /* expect(service.createProduct).toHaveBeenCalledWith({
          createByUserID: '',
          productType: [],
          gender: [],
          productShoeSize: [],
          productSize: [],
          productSizePantsWaist: [],
          productSizePantsInseam: [],
          productDescriptionOptional: 'string',
          productImage: 'string',
        }); */
        //can run this test with a different string and expect it to fail
        //expect(response.message).toEqual("Failed to create product");
        expect(service.createProduct).toHaveBeenCalledWith(mockProduct);
        expect(response.message).toEqual("Failed to create product, please try again");
      }
    );
  });

});
