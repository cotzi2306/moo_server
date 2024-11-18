import { z } from "zod";

const decesoSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha_deceso: z.date({
        required_error: 'Fecha de deceso is required'
    }),
    causa_deceso: z.string({
        required_error: 'Causa de deceso is required'
    }).max(255, 'Causa de deceso must be at most 255 characters long'),
});

export function validateDeceso(object) {
    return decesoSchema.safeParse(object);
}

export function validatePartialDeceso(object) {
    return decesoSchema.partial().safeParse(object);
}
