import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createBlogRoute } from "../routes/blogRoutes";
import { RouteHandler } from "@hono/zod-openapi";

export const createBlogHandler: RouteHandler<typeof createBlogRoute> = async (c) => {
    const { title, content } = c.req.valid("json")

    const session = await auth()

    if (!session?.user?.id) {
        throw Error("認証してください")
    }

    const blog = await prisma.blog.create({
        data: {
            userId: session.user.id,
            title,
            content,
        },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    })

    return c.json(blog, 201)
}