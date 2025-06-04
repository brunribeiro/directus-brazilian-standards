# 📝 Changelog - Directus Brazilian Standards

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2024-12-19

### 🐛 Bug Fixes
- **Currency Interface**: Fixed critical formatting bug where typing `10000` displayed as `R$ 100,00` instead of `R$ 10.000,00`
- **Currency Interface**: Fixed display value computation to correctly handle stored numeric values
- **Currency Interface**: Fixed focus behavior to show correct formatted values when editing
- **Currency Interface**: Fixed validation error messages to display proper currency formatting

### 🔧 Technical Improvements
- Added dedicated `formatCurrency()` helper function for consistent currency display
- Separated input formatting logic from display formatting logic
- Improved code maintainability with cleaner function separation

### 📋 Test Cases Verified
- ✅ `10000` → `R$ 10.000,00` (was showing `R$ 100,00`)
- ✅ `1000` → `R$ 1.000,00` (was showing `R$ 10,00`)
- ✅ `100` → `R$ 100,00` (was showing `R$ 1,00`)

## [1.4.0] - Previous Release

### ✨ Features
- Brazilian Currency (BRL) interface with live formatting
- Brazilian CEP (postal code) interface with validation
- Brazilian CPF (tax ID) interface with official algorithm validation
- Brazilian CNPJ (business ID) interface with validation
- Brazilian Phone interface with formatting
- Corresponding display extensions for all interfaces
- TypeScript support
- Vue 3 composition API
- Real-time validation with visual feedback
- Portuguese error messages
- Clean data storage (numbers for currency, strings for IDs)
- Privacy masking options

---

*Made with ❤️ for the Brazilian developer community* 🇧🇷 