# 📦 Publishing Guide - Directus Brazilian Standards

This guide will help you publish your Brazilian Standards extension bundle to npm and the Directus Marketplace.

## ✅ Pre-Publishing Checklist

- [x] **Bundle builds successfully** (`npm run build` ✓)
- [x] **All extensions work locally** (currency, CEP, CPF ✓)
- [x] **Documentation is complete** (README.md ✓)
- [x] **License file exists** (LICENSE ✓)
- [x] **Version is set** (1.0.0 ✓)
- [x] **Keywords are optimized** for discoverability

## 🌐 Publishing to NPM

### 1. Create NPM Account
```bash
# If you don't have an npm account
npm adduser

# If you already have one
npm login
```

### 2. Test the Package
```bash
# Test the build one more time
npm run build

# Validate the package
npm run validate

# Check what will be published
npm pack --dry-run
```

### 3. Publish to NPM
```bash
# Publish the first version
npm publish

# For future updates, bump version and publish
npm version patch  # or minor/major
npm publish
```

### 4. Verify Publication
- Visit: https://www.npmjs.com/package/directus-brazilian-standards
- Test installation: `npm install directus-brazilian-standards`

## 🏪 Submitting to Directus Marketplace

### 1. Create GitHub Repository
```bash
# Initialize git in the bundle directory
git init
git add .
git commit -m "Initial release: Brazilian Standards v1.0.0"

# Add your GitHub repository
git remote add origin https://github.com/brunribeiro/directus-brazilian-standards.git
git push -u origin main
```

### 2. GitHub Repository Setup
- **Repository name**: `directus-brazilian-standards`
- **Description**: "Complete Brazilian formatting extensions for Directus - Currency (BRL), Postal Codes (CEP), and Tax IDs (CPF)"
- **Topics**: `directus`, `directus-extension`, `brazil`, `brazilian`, `currency`, `cep`, `cpf`
- **License**: MIT
- **README**: Already perfect ✓

### 3. Marketplace Submission
1. Visit: https://directus.io/marketplace
2. Click "Submit Extension"
3. Provide your repository URL: `https://github.com/brunribeiro/directus-brazilian-standards`
4. Fill out the submission form with:
   - **Name**: Directus Brazilian Standards
   - **Description**: Complete Brazilian formatting extensions with live formatting, validation, and proper data storage
   - **Categories**: Interface, Display, Formatting
   - **Tags**: brazil, brazilian, currency, postal-code, tax-id, brl, cep, cpf

## 📈 Marketing & Community

### Community Sharing
- **Brazilian Directus Discord/Slack channels**
- **Brazilian dev communities** (dev.to, GitHub discussions)
- **LinkedIn posts** in Portuguese showcasing the features
- **Medium/dev.to articles** about Brazilian localization in Directus

### SEO Optimization
Your package is already optimized with:
- ✅ Brazilian Portuguese keywords
- ✅ Clear feature descriptions
- ✅ Usage examples
- ✅ Professional documentation
- ✅ Proper npm keywords

## 🚀 Release Notes Template

For future versions, use this template:

```markdown
## 🇧🇷 [1.0.0] - 2024-XX-XX

### ✨ New Features
- Brazilian Currency (BRL) interface with live formatting
- Brazilian CEP interface with validation
- Brazilian CPF interface with official algorithm validation
- Corresponding display extensions for all interfaces

### 🔧 Technical Features
- TypeScript support
- Vue 3 composition API
- Real-time validation with visual feedback
- Portuguese error messages
- Clean data storage (numbers for currency, strings for IDs)
- Privacy masking for CPF display

### 📚 Documentation
- Comprehensive usage guide
- API response examples
- Configuration options
- Troubleshooting guide
```

## 🔄 Update Workflow

For future updates:

1. **Make changes** to your extensions
2. **Test locally** in your Directus instance
3. **Update version** in package.json
4. **Update README** if needed
5. **Build**: `npm run build`
6. **Commit and push** to GitHub
7. **Publish**: `npm publish`
8. **Create GitHub release** with notes

## 🎯 Success Metrics

Track these metrics after publication:
- **NPM downloads** (weekly/monthly)
- **GitHub stars** and issues
- **Community feedback** and contributions
- **Marketplace downloads** (if available)

## 🤝 Community Contribution

Encourage the Brazilian dev community to:
- ⭐ **Star the repository**
- 🐛 **Report issues** they encounter
- 💡 **Suggest new features** (CNPJ, CEI, etc.)
- 🔧 **Contribute improvements**
- 📚 **Share usage examples**

---

## 🎉 Ready for Launch!

Your Brazilian Standards extension is **production-ready** and **community-ready**! 

The Brazilian Directus community will love having familiar, professional formatting for their applications.

**Next steps:**
1. Publish to npm
2. Create GitHub repository  
3. Submit to Directus Marketplace
4. Share with the community!

---

*Made with ❤️ for the Brazilian developer community* 🇧🇷 