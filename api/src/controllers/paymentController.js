//importando os modelos
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  findPaymentByName,
  findPaymentById,
} from "../models/paymentModel.js";

//funcao para retornar os metodos de pagamento ativos no sistema
export async function getAllPaymentMethods(req, res) {
  try {
    //buscando os metodos de pagamento
    const payments = await getPayments();

    //verificando se existem pagamentos
    if (payments.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum método de pagamento encontrado" });
    }

    //retorna os pagamentos
    res.status(200).json(payments);
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para cadastrar um novo metodo de pagamento
export async function createPaymentMethod(req, res) {
  try {
    let { name } = req.body;

    //converte o nome para minusculo
    name = name.toLowerCase();

    //verifica se o metodo de pagamento ja existe
    const existingPaymentMethod = await findPaymentByName(name);
    if (existingPaymentMethod) {
      return res
        .status(400)
        .json({ error: "Método de pagamento já cadastrado" });
    }

    //cadastra o metodo de pagamento no banco
    const result = await createPayment(name);

    res.status(201).json({
      message: "Método de pagamento cadastrado com sucesso",
      id: result.id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para atualizar um metodo de pagamento
export async function updatePaymentMethod(req, res) {
  try {
    const { id } = req.params;
    let { name } = req.body;

    //converte o nome para minusculo
    name = name.toLowerCase();

    //verifica se o metodo de pagamento nao existe
    const existingPaymentMethod = await findPaymentById(id);
    if (!existingPaymentMethod) {
      return res
        .status(404)
        .json({ error: "Método de pagamento não encontrado" });
    }

    //atualiza o metodo de pagamento no banco
    const result = await updatePayment(id, name);

    //verifica se houve alguma atualizacao
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Método de pagamento atualizado com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para desativar um metodo de pagamento
export async function deletePaymentMethod(req, res) {
  try {
    const { id } = req.params;

    //verifica se o metodo de pagamento nao existe
    const existingPaymentMethod = await findPaymentById(id);
    if (!existingPaymentMethod) {
      return res
        .status(404)
        .json({ error: "Método de pagamento não encontrado" });
    }

    //desativa o metodo de pagamento no banco
    const result = await deletePayment(id);

    //verifica se o metodo de pagamento foi deletado
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Método de pagamento deletado com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}