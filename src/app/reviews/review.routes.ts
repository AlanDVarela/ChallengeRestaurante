import { Router } from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByRestaurant
} from "../reviews/review.controller";

const router = Router();

// /api/reviews
router.get("/", getReviews);
router.post("/", createReview);

// /api/reviews/:id
router.get("/:id", getReviewById);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

// /api/restaurants/:restaurantId/reviews
router.get("/by-restaurant/:restaurantId", getReviewsByRestaurant);

export default router;