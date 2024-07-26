import os
import sys
from logging.config import fileConfig

from sqlalchemy import create_engine, pool

from alembic import context

parent_dir = os.path.abspath(os.path.join(os.getcwd(), ".."))
sys.path.append(parent_dir)

config = context.config
fileConfig(config.config_file_name)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

fileConfig(config.config_file_name)

from app.models import Base
from core.config import config as app_config

target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=app_config.POST_GRESQL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = create_engine(app_config.POST_GRESQL)

    with connectable.connect() as connection:
        do_run_migrations(connection)


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
