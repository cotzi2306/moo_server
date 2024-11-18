import { z } from "zod";

const tareaSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    descripcion: z.string().max(255, 'Descripción must be at most 255 characters long').nullable(), // Puede ser nulo
    usuario_id: z.number({
        required_error: 'Usuario ID is required',
        invalid_type_error: 'Usuario ID must be a number'
    }),
    finca_id: z.number({
        required_error: 'Finca ID is required',
        invalid_type_error: 'Finca ID must be a number'
    }),
    status: z.string().max(50, 'Status must be at most 50 characters long').nullable(), // Puede ser nulo
});

export function validateTarea(object) {
    return tareaSchema.safeParse(object);
}

export function validatePartialTarea(object) {
    return tareaSchema.partial().safeParse(object);
}
