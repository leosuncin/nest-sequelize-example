import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

import { CreateAddress } from './create-address.dto';
import { CreateCompany } from './create-company.dto';

export class CreateContact {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('SV')
  phone!: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'] })
  website!: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateAddress)
  address!: CreateAddress;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateCompany)
  company!: CreateCompany;
}
