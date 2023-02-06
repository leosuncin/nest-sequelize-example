import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { CreateContact } from './create-contact.dto';
import { UpdateAddress } from './update-address.dto';
import { UpdateCompany } from './update-company.dto';

export class UpdateContact extends PartialType(CreateContact) {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddress)
  // @ts-expect-error Override address DTO
  override readonly address?: UpdateAddress;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCompany)
  // @ts-expect-error Override company DTO
  override readonly company?: UpdateCompany;
}
