# steps to follow

## First make folder structre then make env file, and in it write database configuration and jwt details

### Generate secrete key using this command

```
openssl rand -hex 32
```

```
#Database configuration
# url of sqlite3
SQLITE3=sqlite:///./database.db

#JWT
# TO GET SECRET KEY RUN COMMAND *openssl rand -hex 32*
SECRET_KEY=paste_generated_key_here
JWT_ALGORITHM=HS256
```

### then write config file

```
import os

from dotenv import load_dotenv

load_dotenv()
from pydantic_settings import BaseSettings

class BaseConfig(BaseSettings):
    class config:
        # to write all attribute in upper case
        case_sensitive = True


class Config(BaseConfig):
    # name in the getenv must be same as in the .env file
    SQLITE3: str = os.getenv("SQLITE3")
    JWT_EXPIRE_MINUTES: int = 60 * 24
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM: str = "HS256"


config = Config()
```

## Authentication and Authorization

## Step1: _Make middleware in core-> fastapi -> **middlewares** -> make new file with name authentication.py get data from the following url_

```
https://github.com/iam-abbas/FastAPI-Production-Boilerplate/blob/main/core/fastapi/middlewares/authentication.py
```

## Step2: _Make middleware in core-> fastapi -> **dependencies** -> make new file with name authentication.py get data from the following url_

```
https://github.com/iam-abbas/FastAPI-Production-Boilerplate/blob/main/core/fastapi/dependencies/authentication.py
```

### Step3: *To add exceptions in core => exceptions make new file with name **base.py** get data form the following url*
```
https://github.com/iam-abbas/FastAPI-Production-Boilerplate/blob/main/core/exceptions/base.py
```
## Step2: *To add current user in core-> fastapi -> **dependencies** -> make new file with name **current_user.py** get data from the following url_
```
https://github.com/iam-abbas/FastAPI-Production-Boilerplate/blob/main/core/fastapi/dependencies/current_user.py
```

