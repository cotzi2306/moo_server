const produccionLecheSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha: z.date({
        required_error: 'Fecha is required'
    }),
    produccion_manana: z.number().positive('Producción de mañana must be a positive number').nullable(), // Puede ser nulo
    produccion_tarde: z.number().positive('Producción de tarde must be a positive number').nullable(), // Puede ser nulo
});

export function validateProduccionLeche(object) {
    return produccionLecheSchema.safeParse(object);
}

export function validatePartialProduccionLeche(object) {
    return produccionLecheSchema.partial().safeParse(object);
}
