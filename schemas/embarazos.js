import { z } from "zod";

const embarazoSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha_embarazo: z.date({
        required_error: 'Fecha de embarazo is required'
    }),
    fecha_parto: z.date().nullable(), // Puede ser nulo
    tipo_finalizacion: z.enum(['aborto', 'parto', 'reabsorción']).nullable(), // Puede ser nulo
});

export function validateEmbarazo(object) {
    return embarazoSchema.safeParse(object);
}

export function validatePartialEmbarazo(object) {
    return embarazoSchema.partial().safeParse(object);
}
