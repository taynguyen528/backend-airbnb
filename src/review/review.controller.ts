import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ResponseMessage('Create Review')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ResponseMessage('Get All Reviews')
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get Review By ID')
  findOne(@Param('id') id: number) {
    return this.reviewService.findReviewById(id);
  }

  @Put(':id')
  @ResponseMessage('Update Review')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete Review')
  remove(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }
}
