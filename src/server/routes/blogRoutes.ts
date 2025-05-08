import { createRoute, z } from "@hono/zod-openapi"
import { BlogIdSchema, BlogSchema, BlogsSchema, CreateBlogSchema } from "../models/blogSchemas";

export const getBlogsRoute = createRoute({
    path: "/",
    method: "get",
    responses: {
        200: {
            description: "取得成功",
            content: {
                "application/json": {
                    schema: BlogsSchema
                }
            }
        },
    }
})

export const getBlogIdRoute = createRoute({
    path: "/{id}",
    method: "get",
    responses: {
        200: {
            description: "取得成功",
            content: {
                "application/json": {
                    schema: BlogIdSchema
                }
            }
        },
        404: {
            description: "取得失敗",
            content: {
                "application/json": {
                    schema: z.null()
                }
            }
        }
    }
})

export const createBlogRoute = createRoute({
    path: "/",
    method: "post",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateBlogSchema
                }
            }
        }
    },
    responses: {
        201: {
            description: "作成成功",
            content: {
                "application/json": {
                    schema: BlogSchema
                }
            }
        }
    },
})