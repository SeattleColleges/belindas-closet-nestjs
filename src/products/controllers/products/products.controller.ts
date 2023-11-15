import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
  Inject,
} from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { JwtAuthGuard } from '../../../auth/jwt.guard';
import { Roles } from '../../../auth/roles.decorator';
import { RoleGuard } from '../../../auth/role.guard';
import { Product } from '../../schemas/product.schema';

@Controller('products')
export class ProductsController {

  private readonly logger = new Logger;
  CONTROLLER: string = ProductsController.name;

  constructor(@Inject('PRODUCTS_SERVICE') private readonly productService: ProductsService) { }
  
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('new')
  async createProduct(@Body() productDto: CreateProductDto) {
    this.logger.log(`Creating Product ${JSON.stringify(productDto, null, '\t')}`, this.CONTROLLER);
    return await this.productService.createProduct(productDto as Product);
  }
  
  @Get('')
  async getProducts() {
    this.logger.log('Finding all Products', this.CONTROLLER);
    return await this.productService.findAll();
  }

  @Get('find/:id')
  async findByID(@Param('id') id: string) {
    this.logger.log(`Finding Product with id: ${id}`, this.CONTROLLER);
    return await this.productService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('update/:id')
  async updateProductById(@Param('id') id: string, @Body() productDto: UpdateProductDto) {
    this.logger.log(
      `Updating Product with id: ${id} with: ${JSON.stringify(productDto, null, '\t')}`, 
      this.CONTROLLER
    );
    return await this.productService.updateProduct(id, productDto as Product);
  }

  // Soft Delete Button
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('remove/:id')
  async deleteProduct(@Param('id') id: string) {
    this.logger.log(`Soft deleting Product with id: ${id}`, this.CONTROLLER);
       return await this.productService.delete(id);
  }

  // Archive Button
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('archive/:id')
  async archiveProduct(@Param('id') id: string) {
    this.logger.log(`Archiving Product with id: ${id}`, this.CONTROLLER);
      return await this.productService.archive(id);
  }
}

