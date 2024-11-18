import { z } from "zod";

const usuarioFincaSchema = z.object({
    id: z.number().optional(), // Opcional, ya que podría no estar presente en las operaciones de creación
    usuario_id: z.number({
        required_error: 'Usuario ID is required',
        invalid_type_error: 'Usuario ID must be a number'
    }),
    finca_id: z.number({
        required_error: 'Finca ID is required',
        invalid_type_error: 'Finca ID must be a number'
    }),
});

export function validateUsuarioFinca(object) {
    return usuarioFincaSchema.safeParse(object);
}

export function validatePartialUsuarioFinca(object) {
    return usuarioFincaSchema.partial().safeParse(object);
}
