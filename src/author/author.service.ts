import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { Author } from 'src/schemas/Author.schema';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Injectable()
export class AuthorService {
  /**
   *
   */
  constructor(@InjectModel(Author.name) private authorModal: Model<Author>) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new this.authorModal(createAuthorDto);
    newAuthor.CreateDate = new Date();
    newAuthor.IsDelete = false;
    return await newAuthor.save();
  }

  async getAllAuthors() {
    return await this.authorModal.find().sort({ Name: 1 }).exec();
  }

  async getbyId(id: string) {
    return await this.authorModal.findById(id).exec();
  }

  async getAllActiveAuthors() {
    return await this.authorModal.find({ IsDelete: false }).exec();
  }
  async updateAuthors(updateAuthorDto: UpdateAuthorDto) {
    return await this.authorModal
      .updateOne({ id: updateAuthorDto.id }, { $set: updateAuthorDto })
      .exec();
  }

  async inactiveAuthors(id: string) {
    return await this.authorModal
      .findOneAndUpdate({ id: id }, { IsDelete: true }, { new: true })
      .exec();
  }
}
