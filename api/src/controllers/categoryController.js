//importando os modelos
import {
  getCategories as getCategoriesModel,
  createCategory as createCategoryModel,
  updateCategory as updateCategoryModel,
  deleteCategory as deleteCategoryModel,
  findCategoryById,
} from "../models/categoryModel.js";

//funcao para retornar as categorias ativas no sistema
export async function getAllCategories(req, res) {
  try {
    //buscando as categorias
    const categories = await getCategoriesModel();

    //confirma se existe alguma categoria ativa
    if (categories.length === 0) {
      return res.status(404).json({ error: "Nenhuma categoria encontrada" });
    }

    res.status(200).json(categories);
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para cadastrar uma nova categoria
export async function createCategory(req, res) {
  try {
    const { name, description } = req.body;

    //cadastrando categoria
    const result = await createCategoryModel(name, description);

    //verifica se houve insercao
    if (!result.id) {
      return res.status(400).json({ error: "Nenhuma inserção foi realizada" });
    }

    res.status(201).json({
      message: "Categoria cadastrada com sucesso",
      id: result.id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para atualizar uma categoria
export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    //verifica se a categoria existe
    const existingCategory = await findCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    //atualiza a categoria
    const result = await updateCategoryModel(id, name, description);

    //verifica se houve atualizacao
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Categoria atualizada com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}

//funcao para desativar uma categoria
export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    //verifica se a categoria existe
    const existingCategory = await findCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    //desativa a categoria
    const result = await deleteCategoryModel(id);

    //verifica se foi desativada
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Nenhuma alteração foi realizada" });
    }

    res.status(200).json({
      message: "Categoria deletada com sucesso",
      id,
    });
  } catch (err) {
    console.error("Houve um erro: ", err);
    res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
}
