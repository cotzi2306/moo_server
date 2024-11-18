const ventaCarneSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    fecha_venta: z.date({
        required_error: 'Fecha de venta is required'
    }),
    cantidad: z.number({
        required_error: 'Cantidad is required',
        invalid_type_error: 'Cantidad must be a number'
    }).positive('Cantidad must be a positive number'),
    precio_unitario: z.number({
        required_error: 'Precio unitario is required',
        invalid_type_error: 'Precio unitario must be a number'
    }).positive('Precio unitario must be a positive number'),
    comprador: z.string().max(255, 'Comprador must be at most 255 characters long').nullable(), // Puede ser nulo
    finca_id: z.number({
        required_error: 'Finca ID is required',
        invalid_type_error: 'Finca ID must be a number'
    }),
});

export function validateVentaCarne(object) {
    return ventaCarneSchema.safeParse(object);
}

export function validatePartialVentaCarne(object) {
    return ventaCarneSchema.partial().safeParse(object);
}
