import { HttpStatus, INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { ContactModule } from './contact.module';

describe('ContactModule (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          database: ':memory:',
          autoLoadModels: true,
          synchronize: true,
        }),
        ContactModule,
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('create a contact with its relationships', async () => {
    const data = {
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipCode: '92998-3874',
      },
      phone: '7736-8031',
      website: 'https://hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        business: 'harness real-time e-markets',
      },
    };

    await request(app.getHttpServer())
      .post('/contact')
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toMatchObject(data);
      });
  });

  it('paginate the contacts', async () => {
    await request(app.getHttpServer())
      .get('/contact')
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          items: expect.any(Array),
          meta: expect.any(Object),
          links: expect.any(Object),
        });
      });
  });

  it('find one contact by id', async () => {
    await request(app.getHttpServer())
      .get('/contact/1')
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body).toHaveProperty('id', 1);
      });
  });

  it('update a contact by id', async () => {
    await request(app.getHttpServer())
      .patch('/contact/1')
      .send({ name: 'Leanne Graham (updated)' })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body).toHaveProperty('id', 1);
        expect(body).toHaveProperty('name', 'Leanne Graham (updated)');
      });
  });

  it('remove one contact by id', async () => {
    await request(app.getHttpServer())
      .delete('/contact/1')
      .expect(HttpStatus.NO_CONTENT);

    await request(app.getHttpServer())
      .get('/contact/1')
      .expect(HttpStatus.NOT_FOUND);
  });
});
