import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateBookDTO } from './book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('list')
  async getAllBooks(): Promise<any> {
    return await this.bookService.getAllBooks();
  }

  @UseGuards(AuthGuard)
  @Get('/list/favourite')
  async getFavouriteBooks(@Req() req: any): Promise<any> {
    return await this.bookService.getFavouriteBooks(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createBook(
    @Req() req: any,
    @Body() bookData: CreateBookDTO,
  ): Promise<any> {
    try {
      console.log(req.user);
      return await this.bookService.createBook(req.user.sub, bookData.name);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard)
  @Post('/favourite')
  async addFavourite(
    @Req() req: any,
    @Body() bookData: CreateBookDTO,
  ): Promise<any> {
    try {
      console.log(req.user);
      return await this.bookService.addFavourite(req.user.sub, bookData.name);
    } catch (error) {
      return error.message;
    }
  }
}
