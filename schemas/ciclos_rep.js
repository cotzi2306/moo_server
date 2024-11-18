import { z } from "zod";

const cicloRepSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha_inicio_celo: z.date({
        required_error: 'Fecha de inicio de celo is required'
    }),
    fecha_fin_celo: z.date().nullable(), // Puede ser nulo
});

export function validateCicloRep(object) {
    return cicloRepSchema.safeParse(object);
}

export function validatePartialCicloRep(object) {
    return cicloRepSchema.partial().safeParse(object);
}
