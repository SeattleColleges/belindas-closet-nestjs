import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmissionFormController } from './controllers/submission-form.controller';
import { SubmissionFormService } from './services/submission-form.service';
import {
  SubmissionForm,
  SubmissionFormSchema,
} from './schemas/submission-form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubmissionForm.name, schema: SubmissionFormSchema },
    ]),
  ],
  controllers: [SubmissionFormController],
  providers: [SubmissionFormService],
})
export class SubmissionFormModule {}
