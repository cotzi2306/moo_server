const produccionCarneSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha: z.date({
        required_error: 'Fecha is required'
    }),
    cantidad_carne: z.number().positive('Cantidad de carne must be a positive number').nullable(), // Puede ser nulo
});

export function validateProduccionCarne(object) {
    return produccionCarneSchema.safeParse(object);
}

export function validatePartialProduccionCarne(object) {
    return produccionCarneSchema.partial().safeParse(object);
}
