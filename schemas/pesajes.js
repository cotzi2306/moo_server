import { z } from "zod";

const pesajeSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha: z.date({
        required_error: 'Fecha is required'
    }),
    peso: z.number({
        required_error: 'Peso is required',
        invalid_type_error: 'Peso must be a number'
    }).positive('Peso must be a positive number').max(9999999999.99, 'Peso is too large'), // Asegura que sea positivo y dentro de un rango razonable
});

export function validatePesaje(object) {
    return pesajeSchema.safeParse(object);
}

export function validatePartialPesaje(object) {
    return pesajeSchema.partial().safeParse(object);
}
