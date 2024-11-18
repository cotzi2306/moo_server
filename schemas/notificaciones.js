const notificacionSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    titulo: z.string({
        required_error: 'Título is required'
    }).max(255, 'Título must be at most 255 characters long'),
    mensaje: z.string({
        required_error: 'Mensaje is required'
    }).min(1, 'Mensaje must be at least 1 character long'),
    tipo: z.string({
        required_error: 'Tipo is required'
    }).max(100, 'Tipo must be at most 100 characters long'),
    bovino_id: z.number().nullable(), // Puede ser nulo
    finca_id: z.number().nullable(), // Puede ser nulo
    usuario_id: z.number().nullable(), // Puede ser nulo
    allusers: z.boolean({
        required_error: 'All users is required'
    }),
    redirect: z.string().max(250, 'Redirect must be at most 250 characters long').nullable(), // Puede ser nulo
    fecha_envio: z.date().nullable(), // Puede ser nulo
    leida: z.boolean().nullable(), // Puede ser nulo
    estado: z.string().max(50, 'Estado must be at most 50 characters long').nullable(), // Puede ser nulo
    reintentos: z.number().default(0),
    fecha_creacion: z.date().optional(), // Puede ser establecido automáticamente
    fecha_actualizacion: z.date().optional(), // Puede ser establecido automáticamente
});

export function validateNotificacion(object) {
    return notificacionSchema.safeParse(object);
}

export function validatePartialNotificacion(object) {
    return notificacionSchema.partial().safeParse(object);
}
