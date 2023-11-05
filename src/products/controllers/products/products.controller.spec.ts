import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/products/services/products/products.service';


describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: { }
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
  })
});
