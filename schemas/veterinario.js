import { z } from "zod";

const veterinarioSchema = z.object({
    id: z.number().optional(), // Opcional para el caso de creación
    usuario_id: z.number({
        required_error: 'Usuario ID is required',
        invalid_type_error: 'Usuario ID must be a number'
    }),
    especialidad: z.string({
        required_error: 'Especialidad is required'
    }).max(100, 'Especialidad must be at most 100 characters long'),
    numero_cedula: z.string({
        invalid_type_error: 'Cedula must be a string',
        required_error: 'Cedula is required'
    }).max(50, 'Cedula must be at most 50 characters long'),
    asignacion: z.string({
        required_error: 'Asignacion is required'
    }).max(100, 'Asignacion must be at most 100 characters long'),
    foto_cedula_url: z.string().max(255, 'Foto Cedula URL must be at most 255 characters long'),
});

export function validateVeterinario(object) {
    return veterinarioSchema.safeParse(object);
}

export function validatePartialVeterinario(object) {
    return veterinarioSchema.partial().safeParse(object);
}
