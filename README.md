[![Build Status](https://travis-ci.com/jgkawell/angular-todolist.svg?branch=master)](https://travis-ci.com/jgkawell/angular-todolist)

# Angular Todolist

Testing Angular development with a simple todo list app.

- FrontEnd is Angular
- BackEnd is Node.js connected to Postgres DB

# Installation

The installation is fairly straightforward since everything is set up in docker-compose (the images are already in [Docker Hub](https://hub.docker.com/u/jgkawell) as well so you shouldn't even have to build them). First, you'll need [Docker](https://docs.docker.com/docker-for-windows/install/) installed on your machine. Then you'll need to run the compose file:

```bash
git clone https://github.com/jgkawell/angular-todolist.git
cd angular-todolist
docker-compose up -d
```

If you run into issues with the prebuilt images you can build them locally and then bring up the containers:

```bash
docker-compose build
docker-compose up -d
```

# Usage

Once the Docker containers are running, you should be able to navigate to the application in your browser at https://localhost:4300/

When opening the app you should have a warning from your browser about certification trust issues. To resolve this, you need to install the certs on your machine. Simply go to the `.cert` file in the repository at `FrontEnd/ssl/server.crt` from your file explorer and open it to begin the install process.

On Windows the steps to install are as follows:

- Double click on the certificate (server.crt)
- Click on the button “Install Certificate …”
- Select whether you want to store it on user level or on machine level
- Click “Next”
- Select “Place all certificates in the following store”
- Click “Browse”
- Select “Trusted Root Certification Authorities”
- Click “Ok”
- Click “Next”
- Click “Finish”
- If you get a prompt, click “Yes”