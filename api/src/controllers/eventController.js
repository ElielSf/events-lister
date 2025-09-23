//libs
import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

//importando os modelos
import {
  getEvents as getEventsModel,
  createEvent as createEventModel,
  updateEvent as updateEventModel,
  deleteEvent as deleteEventModel,
  findEventById,
} from "../models/eventModel.js";
import { eventHost } from "../models/eventHasUserModel.js";

//importando a chave jwt
import { JWT_SECRET } from "../config/config.js";

//funcao para retornar os eventos ativos no sistema
export async function getAllEvents(req, res) {
  try {
    //buscando os eventos
    const events = await getEventsModel();

    //verificando se existem eventos
    if (events.length === 0) {
      return res.status(404).json({ error: "Nenhum evento encontrado" });
    }

    //retorna os eventos
    res.status(200).json(events);
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para cadastrar um novo evento no sistema
export async function createEvent(req, res) {
  try {
    let { name, date, address, password, cpf } = req.body;

    //gera o hash da senha
    const password_hash = await hash(password, 10);

    //cadastra o evento no banco
    const result = await createEventModel(name, date, address, password_hash);

    //verifica se houve alguma insercao
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma inserção foi realizada" });
    }

    //atribui o anfitriao do evento
    await eventHost(cpf, result.id);

    res.status(201).json({
      message: "Evento cadastrado com sucesso",
      id: result.id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para atualizar um evento
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    let { name, date, address } = req.body;

    //confirma que o evento existe
    const existingEvent = await findEventById(id);
    if (!existingEvent) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    //atualiza o evento no banco
    const result = await updateEventModel(id, name, date, address);

    //verifica se houve alguma atualizacao
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Evento atualizado com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para desativar um evento
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    //confirma que o evento existe
    const existingEvent = await findEventById(id);
    if (!existingEvent) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    //desativa o evento no banco
    const result = await deleteEventModel(id);

    //verifica se o evento foi deletado
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Evento deletado com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para verificar a permissao de acesso ao evento
export async function accessEvent(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;

    //busca o evento
    const event = await findEventById(id);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    //compara a senha informada
    const isMatch = await compare(password, event.event_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    //cria um token para o evento
    const token = sign({ event_id: id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ message: "Acesso liberado", token });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}
