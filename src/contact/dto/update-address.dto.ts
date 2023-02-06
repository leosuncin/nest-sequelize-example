import { PartialType } from '@nestjs/mapped-types';

import { CreateAddress } from './create-address.dto';

export class UpdateAddress extends PartialType(CreateAddress) {}
