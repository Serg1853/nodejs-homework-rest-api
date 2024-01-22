const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionListSchema),
  ctrl.updateSubscription
);

module.exports = router;
