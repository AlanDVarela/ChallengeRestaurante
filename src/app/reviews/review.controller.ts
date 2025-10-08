import { Request, Response } from "express";
import { Review } from "../reviews/review.model";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.restaurantId) filter.restaurantId = req.query.restaurantId;

    const query = Review.find(filter);
    if (req.query.populate) query.populate("restaurantId");

    const reviews = await query.exec();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review no encontrada" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) return res.status(404).json({ error: "Review no encontrada" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review no encontrada" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// Opcional: listar reviews por restaurante (atajo)
export const getReviewsByRestaurant = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};