import { IsString, IsEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsEmpty({message: 'ID field is not required'})
    readonly createByUserID: string;

    @IsOptional()
    @IsString()
    readonly productId: string;

    @IsOptional()
    @IsString()
    readonly productType: [];

    @IsOptional()
    @IsString()
    readonly gender: [];

    @IsOptional()
    @IsString()
    readonly productShoeSize: [];

    @IsOptional()
    @IsString()
    readonly productSize: [];

    @IsOptional()
    @IsString()
    readonly productSizePantsWaist: [];

    @IsOptional()
    @IsString()
    readonly productSizePantsInseam: [];

    @IsOptional()
    @IsString()
    readonly productDescriptionOptional: string;

    @IsOptional()
    @IsString()
    readonly productImage: string;
}