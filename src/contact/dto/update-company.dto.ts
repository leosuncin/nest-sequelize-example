import { PartialType } from '@nestjs/mapped-types';

import { CreateCompany } from './create-company.dto';

export class UpdateCompany extends PartialType(CreateCompany) {}
