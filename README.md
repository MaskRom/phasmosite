# Phasmophobia Community Site (Beta)

This repository contains the source code for the Phasmophobia community site, which is a platform for users to access information about ghosts and items in the game, as well as to share strategies and connect with a global community of players.

## 📋 Table of Contents

- [For Users](#🤔-for-users)
  - [Supported Languages](#supported-languages)
  - [Usage](#usage)
- [For Developers](#💻-for-developers)
  - [Environment](#environment)
  - [File Structure](#file-structure)
  - [Version](#version)
  - [Contributing](#🤝-contributing)
- [License](#license)

-----

## 🤔 For Users

### Supported Languages
- Japanese
- English (coming soon)

### Usage
1. Access the website at https://phasmosite.com
2. Browse ghost and item information
3. Use the strategy tools
4. Connect with the global community

-----

## 💻 For Developers

### Environment
- AWS EC2 for deployment
- Docker for the development environment
- Nginx as the web server
- MySQL as the database
- React for frontend development
- Django and Gunicorn for backend development

### File Structure
```text
├── containers      # Dockerfiles and related files for each container
├── project         # Projects for the frameworks used (Django and React)
├── static          # Generated static files
├── temp            # Temporary files
├── .env.dev        # Environment variables for development environment. **Manage sensitive information carefully to prevent unauthorized access.**
├── .env.prod       # Environment variables for production environment. **Manage sensitive information carefully to prevent unauthorized access.**
├── docker-compose.dev.yml   # Docker Compose file for the development environment
└── docker-compose.prod.yml  # Docker Compose file for the production environment
```

### Version
| Version | Notes |
| --- | --- |
| 0.0.1 | Initial deploy |

### 🤝 Contributing
This repository is not open for forking.

### License
This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.