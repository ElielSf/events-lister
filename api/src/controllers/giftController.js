//libs
import multer from "multer";
const upload = multer();

//importando os modelos
import {
  getGiftsByEventId,
  createGift as createGiftModel,
} from "../models/giftModel.js";

//funcao para retornar os presentes em certo evento
export async function getGiftsByEvent(req, res) {
  try {
    //id do evento
    const { id } = req.params;

    //buscando os presentes
    const gifts = await getGiftsByEventId(id);

    //verificando se existem presentes
    if (gifts.length === 0) {
      return res.status(404).json({ error: "Nenhum presente encontrado" });
    }

    //converte a imagem(Buffer) para base64
    const giftsWithImages = gifts.map((gift) => ({
      ...gift,
      gift_image: gift.gift_image ? gift.gift_image.toString("base64") : null,
    }));

    //retorna os presentes
    res.status(200).json(giftsWithImages);
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//constante com funcao para cadastrar um novo presente + imagem
export const createGift = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, max_limit, payment_m_id, event_id, category_id } =
        req.body;

      //paga o buffer da imagem apos o processamento do multer 
      const image_buffer = req.file ? req.file.buffer : null;

      //confirma que existe uma imagem
      if (!image_buffer) {
        return res
          .status(404)
          .json({ error: "Nenhuma imagem foi enviada" });
      }

      //cria presente no banco
      const result = await createGiftModel(
        name,
        price,
        max_limit,
        image_buffer,
        payment_m_id,
        event_id,
        category_id
      );

      //confirma se houve insercao
      if (!result || result.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: "Nenhuma inserção foi realizada" });
      }

      res.status(201).json({
        message: "Presente cadastrado com sucesso",
        id: result.id,
      });
    } catch (err) {
      console.error("Erro ao criar presente:", err);
      res.status(500).json({ error: "Ocorreu um erro no servidor" });
    }
  },
];
