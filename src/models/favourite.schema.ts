import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Database schema for Favourite entity
 * - username: The user who favorited the book
 * - bookname: The name of the book that is favorited
 * - creatorname: The name of the creator of the book
 * - created_at: Date when the favorite entry was created
 * - updated_at: Date when the favorite entry was last updated
 * - deleted_at: Date when the favorite entry was deleted
 */

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Favourite extends Document {
  @Prop()
  username: string;

  @Prop()
  bookname: string;

  @Prop()
  creatorname: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date })
  deleted_at: Date;
}

export const FavouriteSchema = SchemaFactory.createForClass(Favourite);
FavouriteSchema.index({ username: 1, bookname: 1 }, { unique: true });
