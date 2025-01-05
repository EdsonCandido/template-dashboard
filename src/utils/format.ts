export const formartStringForNumber = (text: string): number => {
    return `${text}`.length > 0 ? Number(`${text}`.replace(/[^0-9,-]/g, '').replace(',', '.')) : 0;
}

export const manterApenasNumeros = (value: string) => {
  return `${value}`.replace(/\D/g, '');
}