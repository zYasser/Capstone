"""test

Revision ID: f8af6ac7873c
Revises: 69542c07b7cf
Create Date: 2024-02-17 20:44:35.640364

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f8af6ac7873c'
down_revision: Union[str, None] = '69542c07b7cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
