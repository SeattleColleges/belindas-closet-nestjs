import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmissionForm } from '../schemas/submission-form.schema';
import { CreateSubmissionFormDto } from '../dto/create-submission-form.dto';

@Injectable()
export class SubmissionFormService {
  constructor(
    @InjectModel(SubmissionForm.name)
    private readonly submissionFormModel: Model<SubmissionForm>,
  ) {}

  async create(
    createSubmissionFormDto: CreateSubmissionFormDto,
  ): Promise<SubmissionForm> {
    try {
      const createdForm = new this.submissionFormModel(createSubmissionFormDto);
      return await createdForm.save();
    } catch (error) {
      console.error('Error while creating submission form:', error); // Log error
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<SubmissionForm[]> {
    return this.submissionFormModel.find().exec();
  }
}
