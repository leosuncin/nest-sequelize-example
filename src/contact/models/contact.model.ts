import { Optional } from 'sequelize';
import { Column, HasOne, Model, Table } from 'sequelize-typescript';

import { Address } from './address.model';
import { Company } from './company.model';

export interface ContactAttributes {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Table
export class Contact extends Model<
  ContactAttributes,
  Optional<ContactAttributes, 'id'>
> {
  @Column
  name!: string;

  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  phone!: string;

  @Column
  website!: string;

  @HasOne(() => Address)
  address!: Address;

  @HasOne(() => Company)
  company!: Company;
}
