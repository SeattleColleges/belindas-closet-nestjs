import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SubmissionFormModule } from './submission-form/submission-form.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    AuthModule,
    UserModule,
    SubmissionFormModule,
    PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '4h' } }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
