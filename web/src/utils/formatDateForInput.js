//funcao para converter a data retornada do banco de dados em um valor aceitado pelos inputs
export const formatDateForInput = (isoString) => {
  //transforma em um objeto tipo Date
  const date = new Date(isoString);
  //corrige para o fuso local
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 16);
  //retorna a data convertida
  return localISOTime;
};
