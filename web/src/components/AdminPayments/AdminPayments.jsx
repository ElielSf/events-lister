//importacoes nativas
import { useState, useEffect } from "react";

//libs
import { useNavigate } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast";

//importando as rotas GET
import { getAllPaymentMethods } from "../../services/apiRequests.jsx";

//css
import "./css/AdminPayments.css";

//componente que contem as acoes de controle dos metodos de pagamento do admin
export default function AdminPayments() {
  //hook com os dados de pagamentos
  const [data, setData] = useState({
    payments: [],
  });

  //hook para selecionar o id do metodo de pagamento
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  //hook para navegacao entre rotas
  const navigate = useNavigate();

  //funcao que busca os dados das opcoes dos inputs
  const fetchData = async () => {
    try {
      //executando as requisicoes
      const payments = await getAllPaymentMethods();

      //valida se houve algum erro durante as requisicoes
      if (payments === null || payments === undefined) {
        notify(
          "error",
          "Houve um erro interno, entre em contato com o suporte"
        );
      }

      //atualiza o hook com os dados recebidos
      setData({ payments });
    } catch (error) {
      notify("error", "Erro ao buscar os dados, recarregue a página");
    }
  };

  //faz as requisicoes quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  //hook para notificacoes
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //funcao para armazenar o metodo de pagamento clicado
  const handlePaymentClick = (id) => {
    setSelectedPaymentId(id);
  };

  //funcao para lidar com a edicao de um metodo de pagamento
  const handleEdit = () => {
    if (!selectedPaymentId) {
      notify("warning", "Selecione um método de pagamento primeiro");
      return;
    }

    //pega o metodo de pagamento selecionado
    const paymentToEdit = data.payments.find(
      (p) => p.id_payment_m === selectedPaymentId
    );

    //redireciona para a pagina de edicao com os dados escolhidos
    navigate(`/admin/payments/edit/${selectedPaymentId}`, {
      state: { payment: paymentToEdit },
    });
  };

  //funcao para lidar com a exclusao de um metodo de pagamento
  const handleDelete = async (e) => {
    if (!selectedPaymentId) {
      notify("warning", "Selecione um método de pagamento primeiro");
      return;
    }

    //impede a pagina de recarregar
    e.preventDefault();

    try {
      //pega o token do localStorage
      const token = localStorage.getItem("authToken");

      //fetch ao backend
      const response = await fetch(
        `${API_BASE_URL}/payment/${selectedPaymentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //obtem o json da resposta
      const json = await response.json();

      if (response.ok) {
        //notificacao de sucesso
        notify("success", json.message);
      } else {
        //nenhuma alteracao foi feita
        if (response.status === 400) {
          notify("error", json.error);
        }

        //usuario nao autenticado
        if (response.status === 401) {
          notify("error", json.error);
        }

        //usuario nao autorizado
        if (response.status === 403) {
          notify("error", json.error);
        }

        //metodo de pagamento nao encontrado
        if (response.status === 404) {
          notify("error", json.error);
        }

        //erro interno no servidor
        if (response.status === 500) {
          notify("error", json.error);
        }
      }

      //atualiza a lista
      setData((prev) => ({
        payments: prev.payments.filter(
          (p) => p.id_payment_m !== selectedPaymentId
        ),
      }));

      //limpa o id selecionado
      setSelectedPaymentId(null);
    } catch (error) {
      //em caso de erro no react
      notify("error", "Erro ao deletar método de pagamento.");
    }
  };

  return (
    <div className="admin-payments">
      <h2 className="admin-payments__title">Métodos de pagamento</h2>
      <div className="admin-payments__content">
        <div className="admin-payments__content__div">
          <button
            className="admin-payments__content__div__button add"
            onClick={() => navigate("/admin/payments/create")}
          >
            Adicionar
          </button>
          <button
            className="admin-payments__content__div__button alter"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="admin-payments__content__div__button delete"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
        <div className="admin-payments__content__list">
          {data.payments.map((payment) => {
            return (
              <div
                className={`admin-payments__content__list__item ${
                  selectedPaymentId === payment.id_payment_m
                    ? "admin-payments__content__list__item--selected"
                    : ""
                }`}
                key={payment.id_payment_m}
                onClick={() => handlePaymentClick(payment.id_payment_m)}
              >
                <h3 className="admin-payments__content__list__item__title">
                  {payment.payment_m_name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
