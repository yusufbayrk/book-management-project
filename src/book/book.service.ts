import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/models/book.schema';
import { Favourite } from 'src/models/favourite.schema';
import { User } from 'src/models/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Favourite.name) private favouriteModel: Model<Favourite>,
  ) {}

  async createBook(id: string, bookname: string): Promise<Book> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const book = await this.findBookByBookname(bookname);

    if (book) {
      throw new Error('This book already created');
    } else {
      const bookData = new this.bookModel({
        username: user.username,
        bookname: bookname,
      });
      return await bookData.save();
    }
  }

  async getAllBooks(): Promise<Array<{ bookname: string; username: string }>> {
    return await this.bookModel.find({}, 'bookname username').exec();
  }

  async addFavourite(id: string, bookname: string): Promise<Favourite> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const book = await this.findBookByBookname(bookname);

    if (!book) {
      throw new Error('Book not found');
    }

    console.log('book:', book);

    if (book.username == user.username) {
      throw new Error('User cannot add own book');
    }

    const userFavouriteCount = await this.findCountFavouriteByUsername(
      user.username,
    );

    if (userFavouriteCount) {
      if (userFavouriteCount.length >= 10) {
        throw new Error(
          'User have reached the maximum number can add favourite',
        );
      }
    }

    const favourite = await this.findFavouriteByUsernameAndBookname(
      user.username,
      bookname,
    );

    console.log('favourite:', favourite);

    if (favourite) {
      throw new Error('User cannot add same book');
    } else {
      const favouriteData = new this.favouriteModel({
        username: user.username,
        bookname,
        creatorname: book.username,
      });
      return await favouriteData.save();
    }
  }

  async getFavouriteBooks(
    id: string,
  ): Promise<Array<{ bookname: string; creatorname: string }>> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }
    return await this.favouriteModel
      .find({ username: user.username }, 'bookname creatorname')
      .exec();
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findBookByBookname(bookname: string): Promise<Book | null> {
    return await this.bookModel.findOne({ bookname }).exec();
  }

  async findFavouriteByUsernameAndBookname(
    username: string,
    bookname: string,
  ): Promise<Favourite | null> {
    return await this.favouriteModel.findOne({ username, bookname }).exec();
  }

  async findCountFavouriteByUsername(
    username: string,
  ): Promise<Favourite[] | null> {
    return await this.favouriteModel.find({ username }).exec();
  }
}
