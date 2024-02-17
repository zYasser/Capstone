## Installation

#### First You Need To set up virtual environment

Navigate to the project's backend directory using the command line. Then, create a virtual environment by running:

```bash
python -m venv venv
```

This command creates a virtual environment named "venv" in your project directory.

#### Activate virtual environment

After the virtual environment setup is complete, activate it using the following command:

```bash
.\venv\Scripts\activate
```

This command activates the virtual environment and prepares your command line to use its isolated Python environment.

#### Download Requirements

With the virtual environment activated, install the project dependencies listed in the `requirements.txt` file:

```
pip install -r requirements.txt
```

This command installs all the required Python packages for the project.

#### Run The Server

Once the requirements are downloaded, you can start the server by running:

```
uvicorn app.main:app
```

This command launches the server using Uvicorn with the specified main module and application.

**NOTE:Every time you reopen the project, you'll need to activate the virtual environment again before running the server. This ensures that you're working within the isolated environment with the correct dependencies.**

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in app directory

`SECRET_KEY`

`ALGORITHM`

`SMTP_USERNAME`

`SMTP_PASSWORD`

`SMTP_SERVER`
