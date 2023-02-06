import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Contact } from './contact.model';

export interface AddressAttribute {
  id: number;
  street: string;
  suite: string;
  city: string;
  zipCode: string;
}

@Table
export class Address extends Model {
  @Column
  street!: string;

  @Column
  suite!: string;

  @Column
  city!: string;

  @Column
  zipCode!: string;

  @BelongsTo(() => Contact)
  contact!: Contact;

  @ForeignKey(() => Contact)
  @Column({ onDelete: 'CASCADE' })
  contactId!: number;
}
