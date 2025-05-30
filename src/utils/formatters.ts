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
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 2) return cleanValue;
  if (cleanValue.length <= 5) return cleanValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
  
  return cleanValue.slice(0, 8).replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2-$3');
}

export function isValidCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8 && /^\d{8}$/.test(cleanCEP);
}

export function cleanCEP(cep: string): string {
  return cep.replace(/\D/g, '');
}

// CPF Formatter
export function formatCPF(value: string): string {
  const cleanValue = value.replace(/\D/g, '');
  
  if (cleanValue.length === 0) return '';
  if (cleanValue.length <= 3) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  if (cleanValue.length <= 9) return cleanValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  
  return cleanValue.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
}

export function isValidCPF(cpf: string): boolean {
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
  return cpf.replace(/\D/g, '');
} 