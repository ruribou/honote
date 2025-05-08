import { OpenAPIHono } from "@hono/zod-openapi";
import {
    createBlogRoute,
    getBlogIdRoute,
    getBlogsRoute
} from "@/server/routes/blogRoutes";

import { createBlogHandler } from "@/server/controllers/createBlog";
import { getBlogByIdHandler } from "@/server/controllers/getBlogById";
import { getBlogsHandler } from "@/server/controllers/getBlogs";
import { swaggerUI } from "@hono/swagger-ui";

export const app = new OpenAPIHono().basePath("/api")

const blogApp = new OpenAPIHono()
    .openapi(getBlogsRoute, getBlogsHandler)
    .openapi(getBlogIdRoute, getBlogByIdHandler)
    .openapi(createBlogRoute, createBlogHandler)

app.route("/blogs", blogApp)

app.doc("/specification", {
    openapi: "3.0.0",
    info: {
        title: "Honote API",
        version: "1.0.0",
    },
}).get("/doc", swaggerUI({ url: "/api/specification"}));

export default app;
