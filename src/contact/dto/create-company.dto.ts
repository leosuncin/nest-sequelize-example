import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompany {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  catchPhrase!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  business!: string;
}
