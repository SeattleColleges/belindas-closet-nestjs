import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { User } from '../../user/schemas/user.schema';
import {ProductType, ProductGender, ProductSizes, ShoeSize, PantsSize} from "../enums"

export class UpdateProductDto {
    @IsOptional()
  readonly createdByUser?: User;

  @IsOptional()
  readonly updatedByUser?: User;

  @IsOptional()
  @IsEnum(ProductType)
  productType?: ProductType;

  @IsOptional()
  @IsEnum(ProductGender)
  productGender?: ProductGender;

  @IsOptional()
  @IsEnum(ShoeSize)
  productSizeShoe?: ShoeSize;

  @IsOptional()
  @IsEnum(ProductSizes)
  productSizes?: ProductSizes;

  @IsOptional()
  @IsEnum(PantsSize)
  productSizePantsWaist?: PantsSize;

  @IsOptional()
  @IsEnum(PantsSize)
  productSizePantsInseam?: PantsSize;

  @IsOptional()
  @IsString()
  productDescription?: string;

  @IsOptional()
  @IsString()
  productImage?: string;

  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;

  @IsOptional()
  @IsBoolean()
  isSold?: boolean;
}