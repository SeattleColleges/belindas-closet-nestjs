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

  async create(createSubmissionFormDto: CreateSubmissionFormDto): Promise<SubmissionForm> {
      const createdForm = new this.submissionFormModel(createSubmissionFormDto);
      return await createdForm.save();
  }

  async findAll(): Promise<SubmissionForm[]> {
    return this.submissionFormModel.find().exec();
  }
}
