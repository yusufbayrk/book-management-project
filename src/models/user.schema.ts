import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Database schema for User entity
 * - email: The email of the user (must be unique)
 * - username: The username of the user (must be unique)
 * - password: The password of the user
 * - created_at: Date when the user entry was created
 * - updated_at: Date when the user entry was last updated
 * - deleted_at: Date when the user entry was deleted
 */

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
