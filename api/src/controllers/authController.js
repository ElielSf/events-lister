import { compare, hash } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

//importando os modelos
import { findByCPF, createUser } from "../models/userModel.js";

//importando a chave jwt
import { JWT_SECRET } from "../config/config.js";

//funcao para login
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
    res
      .status(200)
      .json({ message: "Login realizado com sucesso", token, role: user.role });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para cadastrar o usuario
export async function register(req, res) {
  try {
    const { name, cpf, password, phone, email } = req.body;

    //verifica se o usuario ja existe
    const existingUser = await findByCPF(cpf);
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    //gera o hash da senha
    const password_hash = await hash(password, 10);

    //registra o usuario no banco
    const result = await createUser(name, cpf, password_hash, phone, email);

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    console.error("Houve um erro ao criar o cliente: ", err);
    res.status(500).json({ error: "Ocorreu um erro ao criar o usuário" });
  }
}
