import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/checks (GET)', () => {
    return request(app.getHttpServer())
      .get('/checks')
      .expect(200)
      .expect((response) => {
        if (!Array.isArray(response.body)) {
          throw new Error('La respuesta debe ser un array');
        }
      });
  });

  it('/checks (POST)', async () => {
    const newCheck = {
      service: 'integration-test',
      status: 'UP',
      responseTimeMs: 120,
    };

    const response = await request(app.getHttpServer())
      .post('/checks')
      .send(newCheck)
      .expect(201);

    expect(response.body).toMatchObject(newCheck);
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  });

  afterEach(async () => {
    await app.close();
  });
});
