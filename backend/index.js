import express from "express";
import cors from "cors";
import UserRoutes from "./Routes/UserRoutes.js";
import connectToMongo from "./Database/db.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
 connectToMongo();

app.use("/users", UserRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
