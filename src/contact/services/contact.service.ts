import { Injectable } from '@nestjs/common';

import { CreateContact } from '../dto/create-contact.dto';
import { UpdateContact } from '../dto/update-contact.dto';

@Injectable()
export class ContactService {
  create(createContact: CreateContact) {
    return 'This action adds a new contact';
  }

  findAll() {
    return `This action returns all contact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContact: UpdateContact) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
