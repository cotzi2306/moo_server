const pajillaSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    lote: z.string().max(100, 'Lote must be at most 100 characters long').nullable(), // Puede ser nulo
    fecha_extraccion: z.date({
        required_error: 'Fecha de extracción is required'
    }),
    cantidad_extraida: z.number({
        required_error: 'Cantidad extraída is required',
        invalid_type_error: 'Cantidad extraída must be a number'
    }).positive('Cantidad extraída must be a positive number'),
    cantidad_disponible: z.number({
        required_error: 'Cantidad disponible is required',
        invalid_type_error: 'Cantidad disponible must be a number'
    }).nonnegative('Cantidad disponible must be a non-negative number'),
    pedigree: z.string().max(255, 'Pedigree must be at most 255 characters long').nullable(), // Puede ser nulo
});

export function validatePajilla(object) {
    return pajillaSchema.safeParse(object);
}

export function validatePartialPajilla(object) {
    return pajillaSchema.partial().safeParse(object);
}
