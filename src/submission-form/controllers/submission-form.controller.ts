import { Controller, Post, Get, Body } from '@nestjs/common';
import { SubmissionFormService } from '../services/submission-form.service';
import { CreateSubmissionFormDto } from '../dto/create-submission-form.dto';

@Controller('submission-form') // Route: /submission-form
export class SubmissionFormController {
  constructor(private readonly submissionFormService: SubmissionFormService) {}

  @Post()
  async create(@Body() createSubmissionFormDto: CreateSubmissionFormDto) {
    const form = await this.submissionFormService.create(
      createSubmissionFormDto,
    );
    return { message: 'Form submitted successfully', form };
  }

  @Get()
  async findAll() {
    const forms = await this.submissionFormService.findAll();
    return { forms };
  }
}
