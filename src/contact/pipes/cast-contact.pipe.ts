import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';

import { ContactService } from '../services/contact.service';
import type { Contact } from '../models/contact.model';

@Injectable()
export class CastContactPipe
  implements PipeTransform<Contact['id'], Promise<Contact>>
{
  constructor(private readonly contactService: ContactService) {}

  async transform(value: Contact['id']) {
    const contact = await this.contactService.findOne(value);

    if (!contact) {
      throw new NotFoundException(`Contact with id ${value} not found`);
    }

    return contact;
  }
}
