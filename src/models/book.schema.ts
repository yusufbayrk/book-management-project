import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Database schema for Book entity
 * - username: The user associated with the book
 * - bookname: The name of the book (must be unique)
 * - created_at: Date when the book entry was created
 * - updated_at: Date when the book entry was last updated
 * - deleted_at: Date when the book entry was deleted
 */

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book extends Document {
  @Prop()
  username: string;

  @Prop({ unique: true })
  bookname: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
