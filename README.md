# Microservice Gestion des Partenaires

## 📝 Description
Microservice dédié à la gestion centralisée des partenaires (agents, courtiers, fournisseurs) et de leurs offres pour Redesign Assurance Maghrebia.  
Intègre des fonctionnalités avancées de géolocalisation, suivi de performance et connectivité avec des API externes.

---

## 📑 Table des matières
1. [Fonctionnalités](#-fonctionnalités)
2. [Technologies](#-technologies)
3. [Prérequis](#-prérequis)
4. [Installation](#-installation)
5. [Configuration](#-configuration)
6. [API](#-api)
7. [Tests](#-tests)
8. [Déploiement](#-déploiement)
9. [Contribution](#-contribution)
10. [Licence](#-licence)

---

## ✨ Fonctionnalités

### 🗃️ Modules CRUD
| Module | Description |
|--------|-------------|
| **Partenaire** | Gestion complète des profils (coordonnées, agréments, zones d'action) |
| **Offre Partenaire** | Cycle de vie des offres promotionnelles (création, validation, archivage) |

### 🏆 Fonctionnalités Métiers
- **Géolocalisation** : Filtrage avancé via Google Maps API
- **Business Intelligence** : 
  - Tableaux de bord performance (taux de conversion, CA)
  - Alertes automatiques sur KPI critiques
- **Workflow** :
  - Validation multi-niveaux des offres
  - Notifications automatisées (Gmail API)

### 🌐 API Externes
| Service | Usage |
|---------|-------|
| Google Maps | Géolocalisation et calculs de distance |
| Gmail API | Communication automatisée avec les partenaires |

---

## 🛠 Technologies

**Backend**  
[![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python)](https://python.org)
[![Django](https://img.shields.io/badge/Django-4.0-green?logo=django)](https://djangoproject.com)

**Base de données**  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue?logo=postgresql)](https://postgresql.org)

**Sécurité**  
[![JWT](https://img.shields.io/badge/JWT-Auth-orange)](https://jwt.io)
[![OAuth2](https://img.shields.io/badge/OAuth2-2.0-blue)](https://oauth.net)

---

## 📋 Prérequis
- Docker 20.10+
- Python 3.9+
- Comptes API Google (Maps + Gmail)
- Accès à une instance PostgreSQL

---

## 🚀 Installation
```bash
# Clone du repository
git clone https://gitlab.com/redesign-assurance/ms-partners.git
cd ms-partners

# Configuration de l'environnement
cp .env.example .env
# → Remplir les variables nécessaires

# Lancement des containers
docker-compose up -d --build
