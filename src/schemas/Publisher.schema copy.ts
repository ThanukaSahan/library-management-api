import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Publisher {
  @Prop({ unique: true, required: true })
  _id: string;

  @Prop({ unique: true, required: true })
  Name: string;

  @Prop()
  Email: string;

  @Prop()
  Website: string;

  @Prop()
  Address: string;

  @Prop()
  ContactNumber: number;

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

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
