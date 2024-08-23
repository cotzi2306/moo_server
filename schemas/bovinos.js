import { z } from "zod";

const bovinoSchema = z.object({
    finca_id: z.number(),
    numero: z.string({
        invalid_type_error: 'Numero must be a string',
        required_error: 'Numero is required'
    }),
    nombre: z.string ({
        required_error: 'Nombre is required'
    }), 
    fecha_nacimiento: z.string(),
    raza: z.string(),
    id_papa: z.number().optional(),
    id_mama: z.number().optional(),
    procedencia: z.string(),
    sexo: z.enum(['macho', 'hembra']),
    proposito: z.string(),
    peso: z.number(),
    ciclo_de_vida: z.string(),
    isAlive: z.boolean()
})

export function validateBovino(object){
    return bovinoSchema.safeParse(object)
}

export function validatePartialBovino(object){
    return bovinoSchema.partial().safeParse(object)
}

