import { z } from "zod";

const procedimientoMedicoSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    tipo: z.enum(['Vacuna', 'Cirugía', 'Chequeo'], {
        required_error: 'Tipo is required'
    }),
    fecha: z.date({
        required_error: 'Fecha is required'
    }),
    detalles: z.string()
        .max(255, 'Detalles must be at most 255 characters long')
        .nullable(), // Puede ser nulo
});

export function validateProcedimientoMedico(object) {
    return procedimientoMedicoSchema.safeParse(object);
}

export function validatePartialProcedimientoMedico(object) {
    return procedimientoMedicoSchema.partial().safeParse(object);
}
