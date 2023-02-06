import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateContact } from '../dto/create-contact.dto';
import { Paginate } from '../dto/paginate.dto';
import { UpdateContact } from '../dto/update-contact.dto';
import { Address } from '../models/address.model';
import { Company } from '../models/company.model';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact)
    private contactModel: typeof Contact,
  ) {}

  create(createContact: CreateContact) {
    return this.contactModel.create(createContact, {
      include: [Address, Company],
    });
  }

  findAll({ limit, page }: Paginate) {
    const offset = (page - 1) * limit;

    return this.contactModel.findAndCountAll({
      limit,
      offset,
      include: [Address, Company],
    });
  }

  findOne(id: Contact['id']) {
    return this.contactModel.findByPk(id, { include: [Address, Company] });
  }

  update(contact: Contact, { address, company, ...changes }: UpdateContact) {
    contact.set(changes);
    if (address && Object.keys(address).length > 0) {
      contact.address.set(address);
    }
    if (company && Object.keys(company).length > 0) {
      contact.company.set(company);
    }

    return contact.save();
  }

  remove(contact: Contact) {
    return contact.destroy();
  }
}
