//importando os modelos
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../models/paymentModel.js";

//funcao para retornar os metodos de pagamento ativos no sistema
export async function getAllPayments(req, res) {
  try {
    //buscando os metodos de pagamento
    const payments = await getPayments();

    //verificando se existem pagamentos
    if (payments.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum método de pagamento encontrado." });
    }

    //retorna os pagamentos
    res.status(200).json(payments);
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}
