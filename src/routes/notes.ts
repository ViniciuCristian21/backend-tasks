import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function notesRoutes(app: FastifyInstance) {
    app.get("/notes", async (request) => {

        try {    
            const notes = await prisma.notes.findMany()

            return notes
        } catch (err) {
            return {
                errorMessage: err
            }
        }

    })

    app.get("/notes/:id", async (request) => {

        try {
            const notesIdSchema = z.object({
                id: z.string().uuid(),
            })
    
            const { id } = notesIdSchema.parse(request.params)
    
            const notes = await prisma.notes.findUnique({
                where: {
                    id
                }
            })
    
            return notes
        } catch (err) {
            return {
                errorMessage: err
            }
        }
        
    })

    app.post("/create", async (request) => {
        
        try {
            const notesSchema = z.object({
                title: z.string(),
                description: z.string()
            })
    
            const { title, description } = notesSchema.parse(request.body)
    
            const notes = await prisma.notes.create({
                data: {
                    title,
                    description
                }
            })
    
            return notes
        } catch (err) {
            return {
                errorMessage: err
            }
        }
    })

    app.patch("/update", async (request) => {})

    app.delete("/remove/:id", async (request) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid(),
            })
    
            const { id } = paramsSchema.parse(request.params)
    
            await prisma.notes.delete({
                where: {
                    id
                }
            })
        } catch (err) {
            return {
                errorMessage: err
            }
        }

    })
}