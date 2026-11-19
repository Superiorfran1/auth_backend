import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, loginUsuario, renovarUsuario } from "../controllers/auth.ts";
import { validarCampos } from "../middlewares/validarCampos.ts";
import { validarJWT } from "../middlewares/validarjwt.ts";

const router = Router();

// Crear nuevo usuario
router.post(
  "/new",
  [
    check("name", "El nombre es un campo obligatorio!").not().isEmpty(),
    check("email", "El email es un campo obligatorio!").isEmail(),
    check("password", "La contraseña es obligatoria!").isLength({ min: 5 }),
    validarCampos,
  ],
  crearUsuario,
);

// Login de usuario
router.post(
  "/",
  [
    check("email", "El email es un campo obligatorio!").isEmail(),
    check("password", "La contraseña es obligatoria!").isLength({ min: 5 }),
    validarCampos,
  ],
  loginUsuario,
);

// Validar y revalidar token
router.get("/renew", validarJWT, renovarUsuario);

export default router;
