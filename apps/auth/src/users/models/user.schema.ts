import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  collection: 'users',
  timestamps: true,
})
export class UserDocument extends AbstractDocument {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;
  @Prop({
    required: true,
    select:false
  })
  password: string;

  @Prop({
    default: false,
    name: 'email_verified',
  })
  emailVerified?: boolean;

  @Prop({
    name: 'reset_password_token',
  })
  resetPasswordToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
