import { OpenAPIHono } from "@hono/zod-openapi";
import {
    createBlogRoute,
    getBlogIdRoute,
    getBlogsRoute
} from "@/server/routes/blogRoutes";

import { createBlogHandler } from "@/server/controllers/createBlog";
import { getBlogByIdHandler } from "@/server/controllers/getBlogById";
import { getBlogsHandler } from "@/server/controllers/getBlogs";

export const app = new OpenAPIHono().basePath("/api")

const blogApp = new OpenAPIHono()
    .openapi(getBlogsRoute, getBlogsHandler)
    .openapi(getBlogIdRoute, getBlogByIdHandler)
    .openapi(createBlogRoute, createBlogHandler)

app.route("/blogs", blogApp)

export default app;
