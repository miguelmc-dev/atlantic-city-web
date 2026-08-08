# 🎰 Atlantic City - Sistema Web de Gestión

Sistema web desarrollado como proyecto académico para la gestión de clientes, promociones y visitas del Casino Atlantic City.

La aplicación permite administrar información mediante una interfaz moderna, intuitiva y responsive, utilizando almacenamiento local para conservar los datos registrados.

---

## 📌 Descripción del proyecto

El proyecto tiene como objetivo desarrollar una aplicación web administrativa que permita gestionar información relacionada con los clientes del casino, sus visitas y las promociones disponibles.

El sistema cuenta con diferentes módulos conectados mediante un panel de administración central.

---

## 🚀 Funcionalidades

- 🔐 Inicio y cierre de sesión administrativo
- 📊 Dashboard con indicadores generales
- 👥 Registro y gestión de clientes
- ✏️ Edición y eliminación de clientes
- 🔎 Búsqueda de clientes por nombre o DNI
- ⭐ Segmentación por categoría de cliente
- ❤️ Registro de preferencias
- 🎁 Gestión de promociones
- 📅 Registro e historial de visitas
- 📈 Generación de reportes
- 👑 Identificación de clientes VIP
- 🏆 Identificación de promociones destacadas
- 💾 Persistencia de información con LocalStorage
- ✅ Validación de formularios
- 🔍 Validaciones mediante expresiones regulares
- ⚠️ Mensajes y confirmaciones mediante SweetAlert2
- 📱 Diseño adaptable a diferentes tamaños de pantalla

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome
- SweetAlert2
- Chart.js
- LocalStorage
- JSON

---

## 📂 Estructura del proyecto

```text
atlantic-city-web/
│
├── index.html
├── README.md
│
├── assets/
├── css/
├── icons/
├── img/
├── js/
│
└── paginas/
    ├── login.html
    ├── dashboard.html
    ├── clientes.html
    ├── promociones.html
    ├── visitas.html
    └── reportes.html
```

---

## 💾 Almacenamiento de datos

El proyecto utiliza **LocalStorage** como mecanismo de persistencia.

Los datos son convertidos a formato JSON mediante JavaScript antes de ser almacenados en el navegador.

Entre los principales registros almacenados se encuentran:

- Clientes
- Promociones
- Visitas
- Sesión del usuario

---

## 🔐 Acceso al sistema

El sistema cuenta con un inicio de sesión administrativo desarrollado con JavaScript.

> Las credenciales utilizadas corresponden únicamente a fines académicos y demostrativos. El proyecto no implementa un sistema de autenticación de producción.

---

## 📊 Módulos del sistema

### 🏠 Dashboard

Permite visualizar indicadores generales, últimos movimientos, estadísticas y accesos rápidos a los principales módulos del sistema.

### 👥 Clientes

Permite registrar, buscar, modificar y eliminar clientes.

También permite almacenar información adicional como:

- Categoría del cliente
- Preferencias
- Estado
- Datos de contacto

### 🎁 Promociones

Permite administrar las promociones disponibles registrando información como:

- Nombre de la promoción
- Descuento
- Fecha de inicio
- Fecha de finalización
- Estado

### 📅 Visitas

Permite registrar y consultar el historial de visitas realizadas por los clientes.

### 📈 Reportes

Presenta información obtenida a partir de los datos almacenados en el sistema, incluyendo:

- Total de clientes
- Total de promociones
- Total de visitas
- Clientes VIP
- Cliente más activo
- Promoción destacada
- Gráficos estadísticos

---

## ✅ Validaciones

El sistema implementa diferentes validaciones mediante JavaScript para garantizar el correcto ingreso de información.

Entre ellas:

- Campos obligatorios
- DNI de 8 dígitos
- Teléfono de 9 dígitos
- Validación de correo electrónico
- Expresiones regulares
- Validación de descuentos
- Validación de fechas
- Confirmación antes de eliminar registros

Los mensajes de advertencia, error y confirmación son mostrados utilizando **SweetAlert2**.

---

## 💾 Persistencia

Los registros permanecen almacenados incluso después de recargar el navegador gracias al uso de **LocalStorage**.

JavaScript utiliza:

```javascript
JSON.stringify()
```

para convertir los datos antes de almacenarlos y:

```javascript
JSON.parse()
```

para recuperarlos posteriormente.

---

## 🎯 Objetivo académico

El proyecto fue desarrollado con el propósito de aplicar los conocimientos adquiridos durante el curso relacionados con:

- Diseño de interfaces web
- HTML5
- CSS3
- JavaScript
- Manipulación del DOM
- Eventos
- Validaciones
- LocalStorage
- JSON
- Diseño responsive
- Desarrollo de funcionalidades CRUD

---

## 👨‍💻 Integrantes

- Miguel Masgo
- Cristian Lopez
- Marcelo Chancafe
- Jorge Aquise

---

## 🎓 Información académica

**Instituto:** IDAT

**Curso:** Proyecto Desarrollo de los Componentes de la Capa de Vista

**Docente:** Victor Andrade

**Ciclo:** 2do ciclo

**Año:** 2026

---

## 📌 Estado del proyecto

✅ **Proyecto finalizado**

El sistema fue desarrollado, probado y documentado como parte del proyecto académico del curso.

---

## 📄 Licencia

Proyecto desarrollado con fines educativos y académicos.