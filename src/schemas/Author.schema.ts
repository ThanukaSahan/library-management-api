import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Author {
  @Prop({ unique: true, required: true })
  _id: string;

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
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
