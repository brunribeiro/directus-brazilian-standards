# 🇧🇷 Directus Brazilian Standards

**Complete Brazilian formatting extensions for Directus** - Currency (BRL), Postal Codes (CEP), and Tax IDs (CPF) with interfaces and displays.

[![npm version](https://badge.fury.io/js/directus-brazilian-standards.svg)](https://badge.fury.io/js/directus-brazilian-standards)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🇧🇷 **Brazilian Currency (BRL)**
- **Live formatting** while typing (e.g., 215 → R$ 2,15)
- **Smart input handling** for different amounts  
- **Validation** with min/max value support
- **API returns numbers**, not strings
- **Examples:**
  - Type `215` → shows `R$ 2,15`
  - Type `21578` → shows `R$ 215,78`
  - Type `2156789` → shows `R$ 21.567,89`

### 📮 **Brazilian CEP (Postal Code)**
- **Automatic formatting** (12345678 → 12.345-678)
- **Real-time validation** (8 digits required)
- **Visual feedback** with success/error indicators
- **Stores clean numbers** in database

### 👤 **Brazilian CPF (Tax ID)**
- **Live formatting** (12345678901 → 123.456.789-01)
- **Full CPF validation** using official algorithm
- **Prevents invalid patterns** (like 111.111.111-11)
- **Visual validation feedback**
- **Privacy masking option** for displays

### 🆔 **CNPJ (Brazilian Company Tax ID)**
- **Interface**: `brazilian-cnpj`
- **Display**: `brazilian-cnpj`
- **Features**:
  - Automatic formatting (XX.XXX.XXX/XXXX-XX)
  - Real-time validation using official algorithm
  - **🆕 Smart paste**: Automatically cleans formatted CNPJs when pasted
  - **🆕 API Lookup**: Automatic company data lookup via CNPJ.ws API
  - **🆕 Auto-fill mapping**: Automatically populate other form fields
  - **🆕 Manual search trigger**: Search button for user-controlled API calls

#### **CNPJ API Lookup Configuration**

The CNPJ interface now supports automatic company data lookup using the [publica.cnpj.ws API](https://publica.cnpj.ws):

1. **Enable API Lookup**: Toggle to enable CNPJ.ws API integration
2. **API Token** (Optional): For future commercial features (not required for public API)
3. **Auto-fill Field Mapping**: JSON mapping of API fields to form fields
4. **Search Button**: Manual trigger for API lookup (appears when API lookup is enabled)

**How it works**:
- User types CNPJ with automatic formatting and validation
- **Smart paste**: Copy formatted CNPJs (e.g., "33.000.167/0001-01") and paste directly - formatting is automatically cleaned and reapplied
- When API lookup is enabled, a search button (🔍) appears next to the input
- User clicks the search button to trigger company data lookup
- Mapped fields are automatically populated with company information

**Example mapping**:
```json
{
  "company_name": "razao_social",
  "trade_name": "estabelecimento.nome_fantasia", 
  "complete_address": "estabelecimento.tipo_logradouro + ' ' + estabelecimento.logradouro + ', ' + estabelecimento.numero + ' - ' + estabelecimento.complemento",
  "city": "estabelecimento.cidade.nome",
  "state": "estabelecimento.estado.sigla",
  "phone": "estabelecimento.telefone1",
  "email": "estabelecimento.email"
}
```

**Mapping Format**:
- **Simple mapping**: `"form_field": "api_field"`
- **Concatenation**: `"form_field": "api_field1 + ' separator ' + api_field2"`
- **String literals**: Use single or double quotes for static text
- **Multiple fields**: Combine any number of API fields with separators

**Concatenation Examples**:
```json
{
  "full_address": "estabelecimento.tipo_logradouro + ' ' + estabelecimento.logradouro + ', ' + estabelecimento.numero",
  "contact_info": "estabelecimento.telefone1 + ' - ' + estabelecimento.email",
  "company_info": "razao_social + ' (' + estabelecimento.nome_fantasia + ')'"
}
```

**Available API fields**:
- `razao_social` - Company legal name
- `capital_social` - Share capital
- `natureza_juridica.descricao` - Legal nature description
- `porte.descricao` - Company size description
- `estabelecimento.nome_fantasia` - Trade name
- `estabelecimento.email` - Email address
- `estabelecimento.telefone1` - Primary phone
- `estabelecimento.telefone2` - Secondary phone
- `estabelecimento.logradouro` - Street address
- `estabelecimento.numero` - Street number
- `estabelecimento.complemento` - Address complement
- `estabelecimento.bairro` - Neighborhood
- `estabelecimento.cidade.nome` - City name
- `estabelecimento.estado.nome` - State name
- `estabelecimento.estado.sigla` - State abbreviation
- `estabelecimento.cep` - ZIP code
- `estabelecimento.situacao_cadastral` - Registration status
- `estabelecimento.data_inicio_atividade` - Activity start date
- `estabelecimento.atividade_principal.descricao` - Main activity description

## 📦 Installation

### Via NPM
```bash
npm install directus-brazilian-standards
```

> **🐛 v1.4.1 Bug Fix**: Fixed critical currency formatting issue where typing `10000` displayed as `R$ 100,00` instead of `R$ 10.000,00`

### Via Directus Marketplace
1. Go to **Settings** → **Extensions** → **Marketplace**
2. Search for "**Brazilian Standards**"
3. Click **Install**

## 🚀 Usage

### Currency Fields
```
1. Create field → Type: Decimal → Precision: 12,2
2. Interface: Brazilian Currency (BRL)
3. Display: Brazilian Currency (BRL)
4. Configure options as needed
```

### CEP Fields  
```
1. Create field → Type: String → Max Length: 8
2. Interface: Brazilian CEP
3. Display: Brazilian CEP
4. Enable validation as needed
```

### CPF Fields
```
1. Create field → Type: String → Max Length: 11
2. Interface: Brazilian CPF
3. Display: Brazilian CPF  
4. Enable CPF validation as needed
```

### CNPJ with API Lookup

1. Configure the field with `Brazilian CNPJ` interface
2. Enable "Enable API Lookup" option
3. (Optional) Add CNPJ.ws API token for commercial features
4. Configure "Auto-fill Field Mapping" with your desired field mappings
5. When users type a valid CNPJ, the extension will:
   - Validate the CNPJ format
   - Query CNPJ.ws API for company data
   - Automatically fill mapped fields with company information

## 📊 API Response Examples

### Currency Field
```json
{
  "price": 1299.99,           // Number, perfect for calculations
  "total": 25000.50          // No string conversion needed
}
```

### CEP Field
```json
{
  "postal_code": "77360016"   // Clean numbers for integrations
}
```

### CPF Field
```json
{
  "tax_id": "01958284106"     // Clean numbers for validation
}
```

## ⚙️ Configuration Options

### Currency Interface
- **Placeholder**: Custom placeholder text (default: "R$ 0,00")
- **Min Value**: Minimum allowed value in BRL
- **Max Value**: Maximum allowed value in BRL
- **Disabled**: Disable input

### Currency Display  
- **Show Currency Symbol**: Toggle R$ symbol display
- **Decimal Places**: Number of decimal places (default: 2)

### CEP Interface
- **Placeholder**: Custom placeholder text (default: "12.345-678")
- **Required**: Make field required
- **Validate CEP**: Enable format validation (8 digits)
- **Disabled**: Disable input

### CEP Display
- **Show Placeholder for Empty**: Show placeholder for empty values

### CPF Interface
- **Placeholder**: Custom placeholder text (default: "123.456.789-01")
- **Required**: Make field required
- **Validate CPF**: Enable full CPF validation with algorithm
- **Disabled**: Disable input

### CPF Display
- **Show Placeholder for Empty**: Show placeholder for empty values
- **Mask Digits for Privacy**: Show as ***.***.***-** for privacy

## 🛠️ Development

This package includes both **interfaces** (for input/editing) and **displays** (for read-only views).

### Interfaces Included:
- `brazilian-currency` - Currency input with live formatting
- `brazilian-cep` - CEP input with validation
- `brazilian-cpf` - CPF input with validation
- `brazilian-cnpj` - CNPJ input with validation and API lookup

### Displays Included:
- `brazilian-currency-display` - Currency display with Brazilian formatting
- `brazilian-cep-display` - CEP display with formatting  
- `brazilian-cpf-display` - CPF display with formatting and privacy options
- `brazilian-cnpj-display` - CNPJ display with formatting and API lookup

## 🌟 Why Use This Extension?

### ✅ **Professional UX**
Brazilian users see familiar formatting they expect

### ✅ **Data Integrity**  
Proper validation prevents invalid entries

### ✅ **API Efficiency**
Clean data storage, no string parsing needed

### ✅ **Developer Friendly**
Easy to use, well-documented, TypeScript support

### ✅ **Production Ready**
Thoroughly tested, used in production systems

## 🔧 Requirements

- **Directus**: ^10.10.0
- **Node.js**: >=18.0.0

## 📝 Examples in Action

### Currency Input
```
User types: 1000
Display shows: R$ 10,00
Database stores: 10.00
```

### CEP Input
```
User types: 77360016
Display shows: 77.360-016
Database stores: "77360016"
```

### CPF Input
```
User types: 01958284106
Display shows: 019.582.841-06
Database stores: "01958284106"
```

### CNPJ Input
```
User types: 33.000.167/0001-01
Display shows: 33.000.167/0001-01
Database stores: "33.000.167/0001-01"
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bruno Ribeiro**
- GitHub: [@brunribeiro](https://github.com/brunribeiro)
- Project: [Directus Renovando](https://github.com/brunribeiro/renovando-directus)

## 🙏 Acknowledgments

- Built for the Brazilian Directus community
- Follows official Brazilian formatting standards
- Uses proper pt-BR locale formatting
- Implements official CPF validation algorithm

---

**Made with ❤️ for the Brazilian developer community** 🇧🇷 

## 🎯 Funcionalidades

### 📮 CEP (Código de Endereçamento Postal)
- **Interface:** Campo de entrada com formatação automática (XXXXX-XXX)
- **Display:** Visualização formatada do CEP
- **Validação:** Estrutura e dígitos válidos
- **API Lookup:** Busca automática de endereço via ViaCEP
- **Preenchimento automático:** Campos de endereço baseados na API
- **Title Case:** Conversão automática de texto em MAIÚSCULAS

### 📱 Configuração do CEP

#### Mapeamento de Campos
```json
{
  "logradouro": "logradouro",
  "bairro": "bairro", 
  "cidade": "localidade",
  "estado": "uf"
}
```

#### Concatenação de Campos
```json
{
  "address": "logradouro + ', ' + bairro",
  "estado": "uf",
  "cidade": "localidade"
}
```

### 🏢 CNPJ (Cadastro Nacional da Pessoa Jurídica)
- **Interface:** Campo de entrada com formatação (XX.XXX.XXX/XXXX-XX)
- **Display:** Visualização formatada do CNPJ
- **Validação:** Algoritmo oficial de validação de CNPJ
- **API Lookup:** Busca dados da empresa via CNPJ.ws
- **Preenchimento automático:** Razão social, endereço, telefone, etc.

### 👤 CPF (Cadastro de Pessoas Físicas)
- **Interface:** Campo de entrada com formatação (XXX.XXX.XXX-XX)
- **Display:** Visualização formatada do CPF
- **Validação:** Algoritmo oficial de validação de CPF

### 📞 Telefone
- **Interface:** Campo de entrada com formatação brasileira ((XX) XXXXX-XXXX)
- **Display:** Visualização formatada do telefone
- **Validação:** Códigos de área e números válidos

### 💰 Moeda Brasileira (Real)
- **Interface:** Campo de entrada com formatação monetária (R$ 0,00)
- **Display:** Visualização formatada em reais

## 🛠️ Instalação

1. **Baixe a extensão compilada** ou compile do código fonte
2. **Coloque no diretório extensions** do seu Directus
3. **Reinicie o Directus** para carregar as extensões

## 🔧 Compilação

```bash
npm install
npm run build
```

## 📋 Requisitos

- Directus 10+
- Node.js 16+
- TypeScript (para desenvolvimento)

## 🎨 Interface de Configuração

Todas as interfaces possuem configurações simples e intuitivas:

- **Habilitação de validação**
- **Configuração de API lookup** 
- **Mapeamento de campos**
- **Placeholder personalizado**

## 🔍 Debug e Troubleshooting

### CEP com Campos Relacionais
O sistema inclui logs detalhados no console do navegador:

```
🔗 Processing relational field: state
🔍 Looking up states where uf = "SP"  
✅ Found states ID: 25
✅ Mapped field: state = 25 (relational)
```

### Problemas Comuns

**Erro de Autenticação:**
- Verifique se o usuário tem permissão de leitura nas collections relacionais
- Token de autenticação deve estar válido

**Campo não encontrado:**
- Confirme se o nome da collection está correto
- Verifique se o campo de busca existe na collection
- Teste com um filtro manual no Directus

## 📚 Documentação das APIs

### ViaCEP (CEP)
- **URL:** https://viacep.com.br/
- **Formato:** `https://viacep.com.br/ws/{cep}/json/`
- **Campos retornados:** cep, logradouro, bairro, localidade, uf, etc.

### CNPJ.ws (CNPJ) 
- **URL:** https://cnpj.ws/
- **Formato:** `https://cnpj.ws/{cnpj}`
- **Campos retornados:** razão social, endereço, atividade, etc.

## 📄 Licença

MIT License - veja LICENSE para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças  
4. Push para a branch
5. Abra um Pull Request

## 🐛 Reportar Bugs

Use as Issues do GitHub para reportar bugs, incluindo:
- Versão do Directus
- Versão da extensão
- Passos para reproduzir
- Logs do console (se aplicável)

---

**Desenvolvido com ❤️ para a comunidade brasileira do Directus** 