import { IsString, IsEmpty, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsEmpty({message: 'ID field is not required'})
    readonly createByUserID: string;

    @IsOptional()
    @IsArray()
    readonly productType: [];

    @IsOptional()
    @IsArray()
    readonly gender: [];

    @IsOptional()
    @IsArray()
    readonly productShoeSize: [];

    @IsOptional()
    @IsArray()
    readonly productSize: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsWaist: [];

    @IsOptional()
    @IsArray()
    readonly productSizePantsInseam: [];

    @IsOptional()
    @IsString()
    readonly productDescriptionOptional: string;

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