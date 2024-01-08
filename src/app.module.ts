import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { Book, BookSchema } from './models/book.schema';
import { Favourite, FavouriteSchema } from './models/favourite.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/booking-project-db'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Favourite.name, schema: FavouriteSchema },
    ]),
  ],
  controllers: [AppController, AuthController, BookController],
  providers: [AppService, AuthService, BookService],
})
export class AppModule {}
