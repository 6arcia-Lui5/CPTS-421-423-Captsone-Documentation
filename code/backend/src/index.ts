import express from "express"
import { ENV } from "./config/env"
import { clerkMiddleware } from '@clerk/express'
import cors  from "cors"

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware()); // auth obj will be attached to the req object
app.use(express.json()); // parses json body
app.use(express.urlencoded({ extended: true })); // parses data (like html forms)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        },
    });
});

app.listen(ENV.PORT, () => console.log("Server is up on PORT:", ENV.PORT))