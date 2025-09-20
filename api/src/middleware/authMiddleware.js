//lib
import { verify } from "jsonwebtoken";

//importando a chave jwt
import { JWT_SECRET } from "../config/config.js";

//middleware para validar a autenticacao
export function authenticateToken(req, res, next) {
  //busca o token no cabecalho e converte ele
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //verifica se existe um token
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    //armazena os dados do usuário decodificados no request
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token inválido: ", err);
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
