import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lasttName: string;

  @Prop({ required: true })
  mobileNo: number;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  key: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
