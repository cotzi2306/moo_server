import { string, z } from "zod";

const fincaSchema = z.object({
    nombre: z.string ({
        required_error: 'Nombre is required'
    }), 
    pais: z.string(),
    estado_departamento: z.string(),
})

export function validateFinca(object){
    return fincaSchema.safeParse(object)
}

export function validatePartialFinca(object){
    return fincaSchema.partial().safeParse(object)
}
