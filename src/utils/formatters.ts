// Brazilian Currency Formatter
export function formatBRLCurrency(value: string | number): string {
  if (!value && value !== 0) return 'R$ 0,00';
  
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^\d]/g, '')) / 100 
    : value;
  
  if (isNaN(numericValue)) return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue);
}

export function formatBRLCurrencyInput(input: string): string {
  // Remove all non-numeric characters
  const numbers = input.replace(/\D/g, '');
  
  if (!numbers) return '';
  
  // Convert to cents and then to currency format
  const cents = parseInt(numbers);
  const reais = cents / 100;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(reais);
}

export function parseBRLCurrency(formattedValue: string): number {
  const cleanValue = formattedValue.replace(/[^\d]/g, '');
  if (!cleanValue) return 0;
  return parseFloat(cleanValue) / 100;
}

// CEP Formatter
export function formatCEP(value: string): string {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 5) return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
  
  return cleanValue.slice(0, 8).replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2-$3');
}

export function isValidCEP(cep: string): boolean {
  if (!cep) return false;
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8 && /^\d{8}$/.test(cleanCEP);
}

export function cleanCEP(cep: string): string {
  if (!cep) return '';
  return cep.replace(/\D/g, '');
}

// CPF Formatter
export function formatCPF(value: string): string {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 3) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  if (cleanValue.length <= 9) return cleanValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  
  return cleanValue.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Check if has 11 digits and is not all the same digit
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  // CPF validation algorithm - first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;
  
  // CPF validation algorithm - second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;
  
  return digit1 === parseInt(cleanCPF.charAt(9)) && 
         digit2 === parseInt(cleanCPF.charAt(10));
}

export function cleanCPF(cpf: string): string {
  if (!cpf) return '';
  return cpf.replace(/\D/g, '');
}

// CNPJ Formatter
export function formatCNPJ(value: string): string {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 5) return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
  if (cleanValue.length <= 8) return cleanValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
  if (cleanValue.length <= 12) return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
  
  return cleanValue.slice(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
}

export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  if (cleanCNPJ.length !== 14 || /^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }

  let size = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, size);
  const digits = cleanCNPJ.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  size = size + 1;
  numbers = cleanCNPJ.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(digits.charAt(1));
}

export function cleanCNPJ(cnpj: string): string {
  if (!cnpj) return '';
  return cnpj.replace(/\D/g, '');
}

// Phone Formatter
export function formatPhone(value: string): string {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 2) return `(${cleanValue}`;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{2})(\d{1,4})/, '($1) $2');
  if (cleanValue.length <= 10) return cleanValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
  
  return cleanValue.slice(0, 11).replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const cleanPhone = phone.replace(/\D/g, '');

  // Must be 10 or 11 digits
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return false;
  }

  // Area code (first 2 digits) should be valid Brazilian area codes
  const areaCode = parseInt(cleanPhone.substring(0, 2));
  const validAreaCodes = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // São Paulo
    21, 22, 24, // Rio de Janeiro
    27, 28, // Espírito Santo
    31, 32, 33, 34, 35, 37, 38, // Minas Gerais
    41, 42, 43, 44, 45, 46, // Paraná
    47, 48, 49, // Santa Catarina
    51, 53, 54, 55, // Rio Grande do Sul
    61, // Distrito Federal
    62, 64, // Goiás
    63, // Tocantins
    65, 66, // Mato Grosso
    67, // Mato Grosso do Sul
    68, // Acre
    69, // Rondônia
    71, 73, 74, 75, 77, // Bahia
    79, // Sergipe
    81, 87, // Pernambuco
    82, // Alagoas
    83, // Paraíba
    84, // Rio Grande do Norte
    85, 88, // Ceará
    86, 89, // Piauí
    91, 93, 94, // Pará
    92, 97, // Amazonas
    95, // Roraima
    96, // Amapá
    98, 99, // Maranhão
  ];

  if (!validAreaCodes.includes(areaCode)) {
    return false;
  }

  // For 11 digits, 3rd digit should be 9 (mobile numbers)
  if (cleanPhone.length === 11) {
    const thirdDigit = parseInt(cleanPhone.charAt(2));
    if (thirdDigit !== 9) {
      return false;
    }
  }

  // For 10 digits, check if it's a valid landline or mobile
  if (cleanPhone.length === 10) {
    const thirdDigit = parseInt(cleanPhone.charAt(2));
    // Landline numbers: 2-5, 7, or mobile starting with 6, 7, 8, 9
    if (![2, 3, 4, 5, 6, 7, 8, 9].includes(thirdDigit)) {
      return false;
    }
  }

  return true;
}

export function cleanPhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
} 