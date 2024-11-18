const servicioSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    bovino_id: z.number({
        required_error: 'Bovino ID is required',
        invalid_type_error: 'Bovino ID must be a number'
    }),
    toro_id: z.number().nullable(), // Puede ser nulo
    fecha_servicio: z.date({
        required_error: 'Fecha de servicio is required'
    }),
    tipo_servicio: z.enum(['monta natural', 'inseminación'], {
        required_error: 'Tipo de servicio is required'
    }),
    pajilla_lote: z.string().max(255, 'Pajilla lote must be at most 255 characters long').nullable(), // Puede ser nulo
    exitoso: z.boolean({
        required_error: 'Exitoso is required'
    }),
});

export function validateServicio(object) {
    return servicioSchema.safeParse(object);
}

export function validatePartialServicio(object) {
    return servicioSchema.partial().safeParse(object);
}
