import { IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  readonly name: string;
}
