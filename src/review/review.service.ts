import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(createReviewDto);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  async findReviewById(reviewId: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(reviewId);

    if (!review) {
      throw new NotFoundException(`Review không tồn tại!`);
    }

    return review;
  }

  async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.findReviewById(reviewId);

    await review.update(updateReviewDto);
    return review;
  }

  async deleteReview(reviewId: number): Promise<void> {
    const review = await this.findReviewById(reviewId);
    await review.destroy();
  }
}
