import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { ObjectId, Types } from 'mongoose';

@Schema()
export class Author {
  @Prop({ unique: true, required: true })
  Name: string;

  @Prop()
  Email: string;

  @Prop()
  Website: string;

  @Prop()
  Biography: string;

  @Prop()
  Nationality: string;

  @Prop()
  CreateDate: Date;

  @Prop()
  CreateUser: string;

  @Prop()
  UpdateDate: Date;

  @Prop()
  UpdaterUser: string;

  @Prop()
  IsDelete: boolean;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
