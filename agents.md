### Agents.md

### PROJECT OVERVIEW

Clothstock is a stock management system (for clothes) designed to work with both offline and online cabaplities the admin will use an online system and the stores will use an app that works online but sync with the main website when it can
### PROJECT TOOLS

**Frontend: ** vite + react == 19.2.5, 
**Backend: ** django == 5.2, 
**Database: ** mysql
**Enviroment: ** /venv/bin/activate (for virtual environment)


### Instructions: Running commands
    Uses docker compose to run 

### Project structure:

    /clothstock
        /venv/
            /bin
            ...  
        /backend/
            apps/ (this is where my apps for django are kept )
                user
            backend/
                settings.py
                ...
            staticfiles/
        /frontend/
            Designs/ (this is where the designs are kept -> not yet present )
            public/
            src/ (this is where my code for react is kept)
            ...  
        .env (enviroment variables for django)
        agents.md
        docker-compose.yml

## Important
- never create tests in the backend
