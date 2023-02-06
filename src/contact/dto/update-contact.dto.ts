import { PartialType } from '@nestjs/mapped-types';

import { CreateContact } from './create-contact.dto';

export class UpdateContact extends PartialType(CreateContact) {}
