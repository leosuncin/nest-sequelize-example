import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ContactController } from './controllers/contact.controller';
import { Address } from './models/address.model';
import { Company } from './models/company.model';
import { Contact } from './models/contact.model';
import { ContactService } from './services/contact.service';

@Module({
  imports: [SequelizeModule.forFeature([Address, Company, Contact])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
