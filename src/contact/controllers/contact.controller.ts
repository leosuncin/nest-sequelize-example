import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { CreateContact } from '../dto/create-contact.dto';
import { Paginate } from '../dto/paginate.dto';
import { UpdateContact } from '../dto/update-contact.dto';
import { PaginationInterceptor } from '../interceptors/pagination.interceptor';
import { Contact } from '../models/contact.model';
import { CastContactPipe } from '../pipes/cast-contact.pipe';
import { ContactService } from '../services/contact.service';

const validationPipe = new ValidationPipe({ transform: true, whitelist: true });

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body(validationPipe) createContact: CreateContact) {
    return this.contactService.create(createContact);
  }

  @Get()
  @UseInterceptors(PaginationInterceptor)
  findAll(@Query(validationPipe) paginate: Paginate) {
    return this.contactService.findAll(paginate);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, CastContactPipe) contact: Contact) {
    return contact;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe, CastContactPipe) contact: Contact,
    @Body(validationPipe) updateContact: UpdateContact,
  ) {
    return this.contactService.update(contact, updateContact);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe, CastContactPipe) contact: Contact) {
    return this.contactService.remove(contact);
  }
}
