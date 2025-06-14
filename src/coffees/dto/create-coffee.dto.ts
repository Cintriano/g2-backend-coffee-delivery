import { IsNotEmpty, IsNumber, Min, Max, IsUrl, IsPositive, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoffeeDto {
  @IsNotEmpty()
  name: string;

  // mínimo de 10 e máximo de 200 caracteres
  @Min(10) @Max(200)
  description: string;

  // número positivo com até 2 casas decimais
  @Type(() => Number) @IsPositive() @IsNumber({maxDecimalPlaces: 2})
  price: number;

  @IsUrl()
  imageUrl: string;

  @ArrayNotEmpty()
  tagIds: string[];
} 