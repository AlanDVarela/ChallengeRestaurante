import { Router } from "express";
import userRoutes from "./users/user.routes";
import restaurantesRoutes from "./restaurantes/restaurantes.routes"

import reviewRoutes from "./reviews/review.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/restaurantes", restaurantesRoutes);
router.use("/reviews", reviewRoutes);

export default router;