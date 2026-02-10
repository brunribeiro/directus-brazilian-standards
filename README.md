# Directus Brazilian Standards

Bundle de extensões para padrões brasileiros no Directus, com interfaces e displays para:

- Moeda (BRL)
- CEP
- CPF
- CNPJ
- Telefone

## Funcionalidades

- Formatação em tempo real durante a digitação
- Validação para CPF, CNPJ, CEP e telefone
- Armazenamento limpo (apenas dígitos para CEP/CPF/CNPJ/telefone)
- Formatação de moeda BRL com saída numérica
- Consulta opcional de CEP/CNPJ com preenchimento automático por mapeamento de campos
- Endpoint interno de proxy para consultas de API (mais compatível com restrições do Directus Studio)

## Extensões incluídas

### Interfaces

- `brazilian-currency`
- `brazilian-cep`
- `brazilian-cpf`
- `brazilian-cnpj`
- `brazilian-phone`

### Exibições

- `brazilian-currency-display`
- `brazilian-cep-display`
- `brazilian-cpf-display`
- `brazilian-cnpj-display`
- `brazilian-phone-display`

### Endpoint

- `brazilian-standards-proxy`
  - `GET /brazilian-standards-proxy/cep/:cep`
  - `GET /brazilian-standards-proxy/cnpj/:cnpj`

## Instalação

```bash
npm install directus-brazilian-standards
```

Ou instale via Marketplace do Directus.

## Como usar

### Moeda

- Tipo do campo: `decimal` (recomendado: precisão `12,2`)
- Interface: `Brazilian Currency`
- Exibição: `Brazilian Currency (BRL)`

### CEP

- Tipo do campo: `string` (tamanho máximo: `8`)
- Interface: `Brazilian CEP`
- Exibição: `Brazilian CEP`

### CPF

- Tipo do campo: `string` (tamanho máximo: `11`)
- Interface: `Brazilian CPF`
- Exibição: `Brazilian CPF`

### CNPJ

- Tipo do campo: `string` (tamanho máximo: `14`)
- Interface: `Brazilian CNPJ`
- Exibição: `Brazilian CNPJ`

### Telefone

- Tipo do campo: `string` (tamanho máximo: `11`)
- Interface: `Brazilian Phone`
- Exibição: `Brazilian Phone`

## Mapeamento de preenchimento automático (CEP/CNPJ)

As interfaces de CEP e CNPJ aceitam mapeamento de campos em JSON.

### Mapeamento simples

```json
{
  "company_name": "razao_social",
  "city": "estabelecimento.cidade.nome",
  "state": "estabelecimento.estado.sigla"
}
```

### Mapeamento com concatenação

```json
{
  "full_address": "estabelecimento.tipo_logradouro + ' ' + estabelecimento.logradouro + ', ' + estabelecimento.numero",
  "contact": "estabelecimento.telefone1 + ' - ' + estabelecimento.email"
}
```

## Compatibilidade

- Host Directus: `^10.10.0 || ^11.0.0`
- Runtime Node.js: `>=18`
- Desenvolvimento (tooling de build): Node.js `>=20.19.0`

## Desenvolvimento

```bash
npm install
npm run build
npm run validate
npm run dev
```

## Licença

MIT
