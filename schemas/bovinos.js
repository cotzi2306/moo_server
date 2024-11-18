import { z } from "zod";

const bovinoSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    finca_id: z.number().nullable(), // Puede ser nulo si la finca es eliminada
    nombre: z.string({
        required_error: 'Nombre is required'
    }).max(255, 'Nombre must be at most 255 characters long'),
    numero: z.string({
        required_error: 'Número is required',
        invalid_type_error: 'Número must be a string'
    }).max(50, 'Número must be at most 50 characters long').refine((val) => val.trim() !== '', {
        message: 'Número cannot be empty'
    }),
    fecha_nacimiento: z.string({
        required_error: 'Fecha de nacimiento is required'
    }),
    raza: z.string({
        required_error: 'Raza is required'
    }).max(100, 'Raza must be at most 100 characters long'),
    id_padre: z.number().optional(), // Puede ser nulo
    id_madre: z.number().optional(), // Puede ser nulo
    procedencia: z.string().max(255, 'Procedencia must be at most 255 characters long').nullable(),
    peso: z.number().nullable(), // Puede ser nulo
    sexo: z.enum(['Macho', 'Hembra'], {
        required_error: 'Sexo is required'
    }),
    estado: z.enum(['Vivo', 'Muerto', 'Vendido'], {
        required_error: 'Estado is required'
    }),
    etapa_vida: z.string().max(100, 'Etapa de vida must be at most 100 characters long').nullable(),
    proposito: z.string().max(100, 'Propósito must be at most 100 characters long').nullable(),
    estado_salud: z.string().max(100, 'Estado de salud must be at most 100 characters long').nullable(),
    estado_reproductivo: z.string().max(100, 'Estado reproductivo must be at most 100 characters long').nullable(),
    fecha_ultimo_chequeo: z.date().nullable().optional(), // Puede ser nulo
    foto: z.string().max(255, 'Foto must be at most 255 characters long').nullable().optional(),
});

export function validateBovino(object) {
    return bovinoSchema.safeParse(object);
}

export function validatePartialBovino(object) {
    return bovinoSchema.partial().safeParse(object);
}

