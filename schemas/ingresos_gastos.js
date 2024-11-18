const ingresosGastosSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    finca_id: z.number({
        required_error: 'Finca ID is required',
        invalid_type_error: 'Finca ID must be a number'
    }),
    fecha: z.date({
        required_error: 'Fecha is required'
    }),
    tipo: z.enum(['Ingreso', 'Gasto'], {
        required_error: 'Tipo is required'
    }),
    monto: z.number({
        required_error: 'Monto is required',
        invalid_type_error: 'Monto must be a number'
    }).positive('Monto must be a positive number'),
    descripcion: z.string().max(255, 'Descripción must be at most 255 characters long').nullable(), // Puede ser nulo
});

export function validateIngresoGasto(object) {
    return ingresosGastosSchema.safeParse(object);
}

export function validatePartialIngresoGasto(object) {
    return ingresosGastosSchema.partial().safeParse(object);
}
