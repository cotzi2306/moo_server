import { string, z } from "zod";

const userSchema = z.object({
    nombre: z.string ({
        required_error: 'Nombre is required'
    }), 
    email: z.string().email(),
    numero_telefono: z.string(),
    contrasena: z.string(),
    no_identificacion: z.string(),
    ubicacion: z.string().optional(),
    rol: z.enum(['Admin', 'Usuario', 'Gestor']),
    puesto: z.string(),
})

export function validateUser(object){
    return userSchema.safeParse(object)
}

export function validatePartialUser(object){
    return userSchema.partial().safeParse(object)
}
