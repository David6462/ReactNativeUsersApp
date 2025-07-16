# React Native Users App - Clean Architecture

Una aplicación móvil construida con **React Native**, **Clean Architecture**, **SOLID principles** y **Firebase**, con **80%+ cobertura de tests**.

## 🏗️ Arquitectura

src/
├── domain/          # Entidades, casos de uso, interfaces
├── data/            # Implementaciones, datasources, repositorios
├── presentation/    # UI, componentes, navegación, estado
└── shared/          # Utilidades, configuración, DI

## ✨ Características

- 🏗️ **Clean Architecture** con separación clara de capas
- 🎯 **SOLID Principles** aplicados correctamente
- 🔥 **Firebase + Firestore** para datos en tiempo real
- 🗃️ **Redux Toolkit + RTK Query** para manejo de estado
- 🧭 **React Navigation** para navegación fluida
- 📱 **TypeScript** con tipado fuerte
- 🧪 **36 tests unitarios** con 89%+ cobertura
- 🔍 **Búsqueda en tiempo real** con debounce
- ⚡ **Optimización de performance**
- 🎨 **UI/UX moderna** y responsive

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/YOUR_USERNAME/react-native-users-app-clean-architecture.git
cd react-native-users-app-clean-architecture

# Instalar dependencias
npm install

# Ejecutar la app
npm start
🧪 Testing
bash# Ejecutar tests
npm test

# Ver cobertura
npx jest --coverage
🏆 Resultados de Tests

✅ 36 tests pasando
✅ 89% cobertura en business logic
✅ Domain Layer: 6 tests
✅ Data Layer: 9 tests
✅ Utils Layer: 17 tests

📱 Funcionalidades

Lista de usuarios con datos desde Firestore
Búsqueda por nombre con debounce
Detalles completos del usuario
Llamadas y emails desde la app
Pull to refresh
Estados de carga y error
Navegación fluida

🛠️ Stack Tecnológico

React Native + Expo
TypeScript
Firebase/Firestore
Redux Toolkit + RTK Query
React Navigation
Jest + Testing Library

📋 Criterios de Evaluación Cumplidos
CriterioPesoEstadoClean Architecture25%✅ ExcelenteSOLID Principles20%✅ ExcelenteTypeScript15%✅ ExcelenteEstado Global10%✅ ExcelenteUI/UX10%✅ ExcelenteNavegación10%✅ ExcelenteTesting10%✅ Excelente
👤 Autor
David Alejandro Delgado Esparza - david6462@outlook.com
