//verifica se o usuario tem as permissoes de admin
export function isAdmin(req, res, next) {
  try {
    //verifica se req.user foi preenchido pelo middleware de autenticacao
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    //verifica se o papel do usuario e 'admin'
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Acesso negado: administrador apenas" });
    }

    next();
  } catch (err) {
    console.error("Erro no middleware de admin: ", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
