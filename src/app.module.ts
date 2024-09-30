import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mylibrary'),
    UserModule,
    AuthModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
