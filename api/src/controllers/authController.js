import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { findByCPF } from "../models/userModel";

import { JWT_SECRET } from "../config/config";

export async function login(req, res) {
  try {
    const { cpf, password } = req.body;

    //busca o usuario
    const user = await findByCPF(cpf);
    if (!user) {
      return res
        .status(404)
        .json({ error: "Usuário não encontrado, verifique os dados" });
    }

    //comparando as senhas
    const passwordMatch = await compare(password, user.user_password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    //gera o token
    const token = sign(
      { id: user.id_user, name: user.user_name, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );

    //devolve o token
    res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}
