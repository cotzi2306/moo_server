const ventaSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    fecha_venta: z.date({
        required_error: 'Fecha de venta is required'
    }),
    comprador: z.string().max(255, 'Comprador must be at most 255 characters long').nullable(), // Puede ser nulo
    precio: z.number().positive('Precio must be a positive number').nullable(), // Puede ser nulo
});

export function validateVenta(object) {
    return ventaSchema.safeParse(object);
}

export function validatePartialVenta(object) {
    return ventaSchema.partial().safeParse(object);
}
