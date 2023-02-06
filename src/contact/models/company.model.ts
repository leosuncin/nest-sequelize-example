import { Optional } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Contact } from './contact.model';

export interface CompanyAttributes {
  id: number;
  name: string;
  catchPhrase: string;
  business: string;
}

@Table
export class Company extends Model<
  CompanyAttributes,
  Optional<CompanyAttributes, 'id'>
> {
  @Column
  name!: string;

  @Column
  catchPhrase!: string;

  @Column
  business!: string;

  @BelongsTo(() => Contact)
  contact!: Contact;

  @ForeignKey(() => Contact)
  @Column({ onDelete: 'CASCADE' })
  contactId!: number;
}
