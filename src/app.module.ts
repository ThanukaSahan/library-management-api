import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mylibrary'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
