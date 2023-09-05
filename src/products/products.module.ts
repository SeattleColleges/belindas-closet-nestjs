import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { ProductSchema } from "./types/products.model";

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]) ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
