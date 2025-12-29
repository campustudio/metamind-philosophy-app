import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string

  @Prop()
  password?: string

  @Prop()
  nickname?: string

  @Prop()
  avatar?: string

  @Prop()
  email?: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ default: true })
  isActive: boolean

  @Prop()
  openid?: string

  @Prop()
  unionid?: string

  @Prop()
  lastLoginAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
