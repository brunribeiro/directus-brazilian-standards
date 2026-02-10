# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2026-02-10

### Added
- **Internal API proxy endpoint** (`brazilian-standards-proxy`) for CEP and CNPJ lookups.
- CEP route: `GET /brazilian-standards-proxy/cep/:cep`
- CNPJ route: `GET /brazilian-standards-proxy/cnpj/:cnpj`

### Fixed
- **Directus option bindings**: fixed snake_case vs camelCase prop mismatches that caused interface/display options to be ignored.
- **Currency input value emission**: typing `0` now stores `0` instead of `null`.
- **Template binding errors** in CPF and Phone interfaces (`value` reference now correctly uses `props.value`).
- **CEP display format/placeholder** corrected to the official `12345-678` pattern.
- **CPF/CNPJ mask placeholders** corrected in displays.
- **CNPJ default mapping template** updated to match CNPJ.ws response structure.

### Changed
- Updated Directus host compatibility to `^10.10.0 || ^11.0.0`.
- Upgraded `@directus/extensions-sdk` to `17.0.7`.
- Simplified and updated README documentation.
- Removed brittle DOM-based field update simulation in CEP/CNPJ interfaces; now relies on Directus form state updates.

## [1.5.0] - 2024-12-18

### Added
- **CNPJ API Lookup Integration**: Complete integration with CNPJ.ws API for automatic company data lookup
- **Smart Paste Feature**: Automatically cleans formatted CNPJs when pasted (e.g., "33.000.167/0001-01" → cleaned and reformatted)
- **Auto-fill Field Mapping**: JSON-based field mapping system for automatic form population
- **Manual Search Trigger**: Search button (🔍) for user-controlled API calls
- **Text Formatting**: Automatic Title Case conversion for ALL CAPS API responses
- **Advanced Field Mapping**: Support for concatenation expressions with string literals
- **DOM-based Field Updates**: Robust field updating that simulates user interaction for proper Directus integration

### Enhanced
- **CNPJ Interface**: Now includes API lookup toggle, token field, and mapping configuration
- **CNPJ Display**: Improved formatting and validation feedback
- **Field Validation**: Better integration with Directus form validation system
- **Error Handling**: Comprehensive error handling for API calls and field updates

### Technical Improvements
- **Vue 3 Composition API**: Full migration to modern Vue patterns
- **TypeScript Support**: Enhanced type safety and development experience
- **Event Simulation**: Proper field update events for Directus compatibility
- **Reactive Updates**: Improved reactivity and UI responsiveness

### API Integration Details
- **CNPJ.ws API**: Free public API integration for company data lookup
- **Field Mapping Examples**:
  - Simple: `"company_name": "razao_social"`
  - Concatenation: `"full_address": "estabelecimento.tipo_logradouro + ' ' + estabelecimento.logradouro + ', ' + estabelecimento.numero"`
- **Available API Fields**: Complete company information including address, contact, and legal details

## [1.4.1] - 2024-12-15

### Fixed
- **Currency Bug**: Fixed critical issue where typing `10000` displayed as `R$ 100,00` instead of `R$ 10.000,00`

## [1.4.0] - 2024-12-10

### Added
- **Phone Number Interface**: Brazilian phone number formatting and validation
- **Phone Number Display**: Formatted phone number display with proper Brazilian formatting

### Enhanced
- **Currency Interface**: Improved decimal handling and validation
- **CEP Interface**: Better postal code validation and formatting
- **CPF Interface**: Enhanced tax ID validation with algorithm checking

## [1.3.0] - 2024-12-05

### Added
- **Currency Interface**: Brazilian Real (BRL) currency formatting with live input
- **Currency Display**: Formatted currency display with customizable decimal places
- **CNPJ Interface**: Brazilian company tax ID formatting and validation
- **CNPJ Display**: Formatted CNPJ display with validation indicators

### Enhanced
- **CPF Validation**: Improved algorithm validation for Brazilian tax IDs
- **CEP Formatting**: Better postal code formatting and validation

## [1.2.0] - 2024-11-28

### Added
- **Bundle Extension**: Converted to bundle extension for better performance
- **Display Components**: Added display components for all interfaces

### Enhanced
- **Code Organization**: Improved project structure and maintainability
- **Build Process**: Optimized build configuration

## [1.1.0] - 2024-11-20

### Added
- **CEP Interface**: Brazilian postal code formatting and validation
- **CPF Interface**: Brazilian tax ID formatting and validation

### Enhanced
- **TypeScript Support**: Full TypeScript implementation
- **Validation System**: Comprehensive validation for Brazilian standards

## [1.0.0] - 2024-11-15

### Added
- Initial release with basic Brazilian formatting support
- Project setup and configuration
- Basic interface structure

---

## Release Notes

### Version 1.5.0 Highlights

This major release introduces **CNPJ API Integration**, making it the most comprehensive Brazilian business data extension for Directus:

🆕 **CNPJ API Lookup**: Automatically fetch company data from CNPJ.ws API
🆕 **Smart Paste**: Clean formatted CNPJs automatically when pasting
🆕 **Auto-fill Mapping**: Configure which fields get populated with company data
🆕 **Manual Search**: User-controlled API calls with search button
🆕 **Text Formatting**: Convert ALL CAPS responses to proper Title Case

**Perfect for**: Business directories, CRM systems, invoice management, customer databases, and any application dealing with Brazilian companies.

**Compatibility**: Directus 10+ with Vue 3 and modern TypeScript support. 
