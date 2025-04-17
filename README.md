# <img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" width="30"/> Microservice Gestion des Partenaires

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1-green.svg?logo=spring)
![Angular](https://img.shields.io/badge/Angular-15-red.svg?logo=angular)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-CD-orange.svg?logo=gitlab)

> Plateforme de gestion des partenaires et offres pour Redesign Assurance Maghrebia  
> **Stack** : Java 17 • Spring Boot • Angular • Keycloak

---

## 🌟 Fonctionnalités Principales

### 🖥️ Frontend (Angular)
- **Tableaux de bord** interactifs
- **Cartographie** des partenaires (Leaflet/Google Maps)
- **Workflow** de validation des offres
- **Portail partenaire** en self-service

### ⚙️ Backend (Spring Boot)
| Module          | Description                          | Technologie                |
|-----------------|--------------------------------------|----------------------------|
| **Partenaires** | CRUD + géolocalisation               | Spring Data JPA + PostGIS  |
| **Offres**      | Gestion du cycle de vie              | Spring State Machine       |
| **Reporting**   | Export PDF/Excel                     | Apache POI + JasperReports |
| **API**         | Documentation Swagger                | SpringDoc OpenAPI          |

### 🔗 Intégrations
- **Stripe** : Paiements en ligne
- **Google Workspace** : Notifications email
- **Keycloak** : SSO et gestion des rôles

---

## 🚀 Démarrage Rapide

### Prérequis
- JDK 17+
- Node 18+
- Docker 24+

```bash
# Backend
git clone https://gitlab.com/redesign-assurance/ms-partners.git
cd ms-partners/backend
mvn spring-boot:run -Dspring.profiles.active=dev

# Frontend (nouveau terminal)
cd ../frontend
npm install
ng serve
