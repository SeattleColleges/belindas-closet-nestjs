import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { ProductSchema } from "./schemas/product.schema";

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'PRODUCTS_SERVICE',
      useClass: ProductsService,
    }
  ]
})
export class ProductsModule {}
