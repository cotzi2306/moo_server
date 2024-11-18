import { z } from "zod";

const usuarioSchema = z.object({
    id: z.number().optional(), // Opcional para la creación
    nombre: z.string({
        required_error: 'Nombre is required'
    }).max(255, 'Nombre must be at most 255 characters long'), // Ya no puede ser nulo
    email: z.string().email('Invalid email format').max(255, 'Email must be at most 255 characters long'),
    numero_telefonico: z.string().max(20, 'Número telefónico must be at most 20 characters long').nullable(), // Puede ser nulo
    contrasena: z.string().max(255, 'Contraseña must be at most 255 characters long').nullable(), // Puede ser nulo
    no_identificacion: z.string().max(50, 'Número de identificación must be at most 50 characters long').nullable(), // Puede ser nulo
    ubicacion: z.string().max(255, 'Ubicación must be at most 255 characters long').nullable(), // Puede ser nulo
    foto_url: z.string().max(255, 'Foto URL must be at most 255 characters long').nullable(), // Puede ser nulo
    rol: z.string().max(50, 'Rol must be at most 50 characters long')
});

export function validateUser(object) {
    return usuarioSchema.safeParse(object);
}

export function validatePartialUser(object) {
    return usuarioSchema.partial().safeParse(object);
}
