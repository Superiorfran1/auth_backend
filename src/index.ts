import app from "./app.ts";
import { env } from "./config/env.ts";
import { dbConnection } from "./database/config.ts";

async function start(): Promise<void> {
  try {
    await dbConnection();

    const server = app.listen(env.PORT, () => {
      console.log(`Servidor ejecutándose en el puerto: ${env.PORT}`);
    });

    const shutdown = (): void => {
      server.close((error) => {
        if (error) {
          console.error("Error al cerrar el servidor HTTP", error);
          process.exitCode = 1;
        }
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("No se pudo iniciar el servidor", error);
    process.exitCode = 1;
  }
}

void start();
