# Directus Brazilian Standards

Brazilian formatting bundle for Directus with interfaces and displays for:

- Currency (BRL)
- CEP (postal code)
- CPF
- CNPJ
- Phone numbers

## Features

- Live formatting while typing
- Validation for CPF, CNPJ, CEP, and phone numbers
- Clean storage format (digits-only for CEP/CPF/CNPJ/phone)
- BRL currency formatting with numeric output
- Optional CEP/CNPJ API lookup with field auto-fill mapping
- Internal proxy endpoint for API lookups (better compatibility with Directus Studio restrictions)

## Included Extensions

### Interfaces

- `brazilian-currency`
- `brazilian-cep`
- `brazilian-cpf`
- `brazilian-cnpj`
- `brazilian-phone`

### Displays

- `brazilian-currency-display`
- `brazilian-cep-display`
- `brazilian-cpf-display`
- `brazilian-cnpj-display`
- `brazilian-phone-display`

### Endpoint

- `brazilian-standards-proxy`
  - `GET /brazilian-standards-proxy/cep/:cep`
  - `GET /brazilian-standards-proxy/cnpj/:cnpj`

## Installation

```bash
npm install directus-brazilian-standards
```

Or install from Directus Marketplace.

## Usage

### Currency

- Field type: `decimal` (recommended precision: `12,2`)
- Interface: `Brazilian Currency`
- Display: `Brazilian Currency (BRL)`

### CEP

- Field type: `string` (max length: `8`)
- Interface: `Brazilian CEP`
- Display: `Brazilian CEP`

### CPF

- Field type: `string` (max length: `11`)
- Interface: `Brazilian CPF`
- Display: `Brazilian CPF`

### CNPJ

- Field type: `string` (max length: `14`)
- Interface: `Brazilian CNPJ`
- Display: `Brazilian CNPJ`

### Phone

- Field type: `string` (max length: `11`)
- Interface: `Brazilian Phone`
- Display: `Brazilian Phone`

## CEP/CNPJ Auto-fill Mapping

Both CEP and CNPJ interfaces support JSON field mapping.

### Simple mapping

```json
{
  "company_name": "razao_social",
  "city": "estabelecimento.cidade.nome",
  "state": "estabelecimento.estado.sigla"
}
```

### Concatenation mapping

```json
{
  "full_address": "estabelecimento.tipo_logradouro + ' ' + estabelecimento.logradouro + ', ' + estabelecimento.numero",
  "contact": "estabelecimento.telefone1 + ' - ' + estabelecimento.email"
}
```

## Compatibility

- Directus host: `^10.10.0 || ^11.0.0`
- Node.js runtime: `>=18`
- Development (build tooling): Node.js `>=20.19.0`

## Development

```bash
npm install
npm run build
npm run validate
npm run dev
```

## License

MIT
