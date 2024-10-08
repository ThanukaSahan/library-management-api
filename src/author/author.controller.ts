import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Role } from 'src/enum/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { get } from 'http';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { query } from 'express';

@Controller('author')
@UseGuards(AuthGuard)
@Roles(Role.Admin, Role.Manager)
export class AuthorController {
  /**
   *
   */
  constructor(private authorService: AuthorService) {}

  @Post('createAuthor')
  async createAuthor(@Req() req: Request, @Body() newAuthor: CreateAuthorDto) {
    newAuthor.CreateUser = req['user'].sub;
    await this.authorService.createAuthor(newAuthor);
    return await this.authorService.getAllActiveAuthors();
  }

  @Get('AllAuthors')
  async GetAllAuthors() {
    return await this.authorService.getAllActiveAuthors();
  }

  @Post('upadteAuthor')
  async upadteAuthor(
    @Req() req: Request,
    @Body() updateAuthor: UpdateAuthorDto,
  ) {
    const author = this.authorService.getbyId(updateAuthor.id);
    if (author === null) {
      throw new HttpException('Author Not Found', 404);
    }
    updateAuthor.UpdateDate = req['user'].sub;
    await this.authorService.updateAuthors(updateAuthor);
    return await this.authorService.getAllActiveAuthors();
  }

  @Post('deleteAuthor')
  async deleteAuthor(@Req() req: Request, @Query() id: string) {
    await this.authorService.inactiveAuthors(id);
    return await this.authorService.getAllActiveAuthors();
  }

  @Get('getById')
  async getById(@Query('id') id: string) {
    return await this.authorService.getbyId(id);
  }
}
