"""Update Panel Table

Revision ID: 5a24b904ae5d
Revises: fdb5905e706e
Create Date: 2024-04-29 22:35:24.480077

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5a24b904ae5d'
down_revision: Union[str, None] = 'fdb5905e706e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
