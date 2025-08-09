# 🇧🇷 Directus Brazilian Standards

**Complete Brazilian formatting extensions for Directus** - Currency (BRL), Postal Codes (CEP), Tax IDs (CPF/CNPJ), and Phone Numbers with interfaces and displays.

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

### 🧾 **Brazilian CNPJ (Business Tax ID)**
- **Live formatting** (12345678000190 → 12.345.678/0001-90)
- **Full CNPJ validation** using official algorithm
- **Prevents invalid patterns** (like 11.111.111/1111-11)
- **Visual validation feedback**
- **Stores clean numbers** in database

### 📱 **Brazilian Phone**
- **Automatic formatting** for 10/11 digits
  - 10-digit landline: (11) 3265-4321
  - 11-digit mobile: (11) 98765-4321
- **Validation** of Brazilian area codes (DDD)
- **Rules**: 10 or 11 digits; 11-digit mobiles start with 9
- **Visual validation feedback**
- **Stores clean numbers** in database

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

### CNPJ Fields
```
1. Create field → Type: String → Max Length: 14
2. Interface: Brazilian CNPJ
3. Display: Brazilian CNPJ
4. Enable CNPJ validation as needed
```

### Phone Fields
```
1. Create field → Type: String → Max Length: 11
2. Interface: Brazilian Phone
3. Display: Brazilian Phone
4. Enable Phone format validation as needed
```

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

### CNPJ Field
```json
{
  "business_id": "11222333000181"   // Clean numbers for integrations
}
```

### Phone Field
```json
{
  "phone": "11987654321"           // Clean numbers for validation
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

### CNPJ Interface
- **Placeholder**: Custom placeholder text (default: "XX.XXX.XXX/XXXX-XX")
- **Required**: Make field required
- **Validate CNPJ**: Enable full CNPJ validation with algorithm
- **Disabled**: Disable input

### CNPJ Display
- **Show Placeholder for Empty**: Show placeholder for empty values
- **Mask Digits for Privacy**: Show as **_.___.___/****-** for privacy

### Phone Interface
- **Placeholder**: Custom placeholder text (default: "(11) 99999-9999")
- **Required**: Make field required
- **Validate Phone Format**: Validate Brazilian phone format and DDD
- **Disabled**: Disable input

### Phone Display
- **Show Placeholder for Empty**: Show placeholder for empty values
- **Mask Digits for Privacy**: Show as (XX) XXXXX-XXXX for privacy

## 🛠️ Development

This package includes both **interfaces** (for input/editing) and **displays** (for read-only views).

### Interfaces Included:
- `brazilian-currency` - Currency input with live formatting
- `brazilian-cep` - CEP input with validation
- `brazilian-cpf` - CPF input with validation
- `brazilian-cnpj` - CNPJ input with validation
- `brazilian-phone` - Phone input with formatting and validation

### Displays Included:
- `brazilian-currency-display` - Currency display with Brazilian formatting
- `brazilian-cep-display` - CEP display with formatting  
- `brazilian-cpf-display` - CPF display with formatting and privacy options
- `brazilian-cnpj-display` - CNPJ display with formatting and privacy options
- `brazilian-phone-display` - Phone display with formatting and privacy options

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

- **Directus**: ^10.0.0
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
User types: 11222333000181
Display shows: 11.222.333/0001-81
Database stores: "11222333000181"
```

### Phone Input
```
User types: 11987654321
Display shows: (11) 98765-4321
Database stores: "11987654321"
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

## 🙏 Acknowledgments

- Built for the Brazilian Directus community
- Follows official Brazilian formatting standards
- Uses proper pt-BR locale formatting
- Implements official CPF validation algorithm

---

**Made with ❤️ for the Brazilian developer community** 🇧🇷 
