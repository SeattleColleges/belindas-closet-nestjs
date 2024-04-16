import { Test, TestingModule } from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close(); // Close the application after all tests
  });

  it('api/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(HttpStatus.OK);
  });

  it('api/products (GET)', () => {
    return request(app.getHttpServer())
        .get('/products')
        .expect(HttpStatus.OK);
  });
});
