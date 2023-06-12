import { FastifyInstance } from 'fastify'


export async function notesRoutes(app: FastifyInstance) {
    app.get("/test", (request, reply) => {
        reply.send("ola mundo")
    })
}