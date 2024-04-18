"""update devices table

Revision ID: bf034eed1b42
Revises: fa545762b027
Create Date: 2024-03-25 23:58:51.148352

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bf034eed1b42'
down_revision: Union[str, None] = 'fa545762b027'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
