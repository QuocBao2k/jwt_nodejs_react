import express from "express";
import { handleHome } from "../controller/homeController";
const router = express.Router();
/**
 *
 * @param {*} app : exoress app
 */
const initWebRoutes = (app) => {
  router.get("/", handleHome);
  return app.use("/", router);
};
export default initWebRoutes;
