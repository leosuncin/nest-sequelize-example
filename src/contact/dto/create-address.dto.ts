import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddress {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  suite!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  zipCode!: string;
}
