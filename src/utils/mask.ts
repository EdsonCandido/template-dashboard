import { format } from "date-fns";

export const numberForMoney = (value: number, fractionDigits: number = 2) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    }).format(value);
};

export const numberFormater = (value: number, fractionDigits: number = 2) => {
    return new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    }).format(value);
}

/**
 * 
 * @param value string
 * @param formatString default  'dd/MM/yyyy HH:mm:ss'
 * @returns string
 */
export const dateFormat = (value: string, formatString = 'dd/MM/yyyy HH:mm:ss') => {
    return format(new Date(value), formatString)
}

export const formatCPF = (cpf: string): string => {
    const cpfNumbers = cpf.replace(/\D/g, '');

    if (cpfNumbers.length !== 11) {
        return cpf;
    }

    return cpfNumbers.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
};

export const formatCpfCnpj = (value: string) => {
    value = `${value}`.replace(/[^\d]/g, '');

    if (value.length <= 11) {
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
}


