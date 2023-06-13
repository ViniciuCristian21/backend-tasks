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

    app.patch("/update/:id", async (request) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params)
            
            const bodySchema = z.object({
                title: z.string(),
                description: z.string(),
            })
    
            const { title, description } = bodySchema.parse(request.body)
    
            const note = await prisma.notes.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description
                }
            })
    
            return note
        } catch (err) {
            return {
                errorMessage: err
            }
        }
    })

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

    app.get("/filter/:id", async (request, reply) => {

        const paramsSchema = z.object({
            id: z.string(),
        })

        const notes = await prisma.notes.findMany({
            orderBy: {
                title: 'asc'
            }
        })


        const { id } = paramsSchema.parse(request.params)

        const filtered = notes.filter(data => data.description.toLocaleLowerCase() == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,1) == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,2) == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,3) == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,4) == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,5) == id.toLocaleLowerCase() ||
                                              data.description.toLocaleLowerCase().substring(0,6) == id.toLocaleLowerCase())
        

        if(filtered.length <= 0) {
            return reply.status(400).send({
                message: "Não foi possivel filtrar nenhuma task com essa descrição"
            })
        }


        return filtered
        
                                              
    })
}