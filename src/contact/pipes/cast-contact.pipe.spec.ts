import { getModelToken } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';

import { Contact } from '../models/contact.model';
import { ContactService } from '../services/contact.service';
import { CastContactPipe } from './cast-contact.pipe';

describe('CastContactPipe', () => {
  let pipe: CastContactPipe;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Contact),
          useValue: {},
        },
        ContactService,
        CastContactPipe,
      ],
    }).compile();

    pipe = module.get<CastContactPipe>(CastContactPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeInstanceOf(CastContactPipe);
  });
});
