import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ unique: true, required: true })
  _id: string;

  @Prop({ required: true })
  Name: string;

  @Prop()
  Description: string;

  @Prop()
  CreateDate: Date;

  @Prop()
  CreateUser: string;

  @Prop()
  UpdateDate: Date;

  @Prop()
  UpdaterUser: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
