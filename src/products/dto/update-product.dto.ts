import { IsString, IsEmpty, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { User } from '../../user/schemas/user.schema';

export class UpdateProductDto {
    @IsOptional()
    @IsEmpty({message: 'ID field is not required'})
    readonly createdByUser: User;

    @IsOptional()
    @IsEmpty({message: 'ID field is not required'})
    readonly updatedByUser: User;

    @IsOptional()
    @IsArray()
    readonly productType: [];

    @IsOptional()
    @IsArray()
    readonly productGender: [];

    @IsOptional()
    @IsArray()
    readonly productSizeShoe: [];

    @IsOptional()
    @IsArray()
    readonly productSizes: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsWaist: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsInseam: [];

    @IsOptional()
    @IsString()
    readonly productDescription: string;

    @IsOptional()
    @IsString()
    readonly productImage: string;

    @IsOptional()
    @IsBoolean()
    readonly isHidden: boolean;

    @IsOptional()
    @IsBoolean()
    readonly isSold: boolean;
}