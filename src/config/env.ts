import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  MONGODB: z.string().min(1, "La variable de entorno MONGODB es obligatoria"),
  SECRET_JWT_SEED: z.string().min(1, "La variable de entorno SECRET_JWT_SEED es obligatoria"),
});

const result = schema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Configuración no válida: ${details}`);
}

export const env = result.data;
