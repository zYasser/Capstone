"""Update PVPANEL column 

Revision ID: 8b6db4c443ab
Revises: e32d4e437f9d
Create Date: 2024-04-30 16:59:42.242148

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8b6db4c443ab'
down_revision: Union[str, None] = 'e32d4e437f9d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('panel', sa.Column('power_output', sa.Integer(), nullable=True))
    op.add_column('panel', sa.Column('efficiency', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('panel', 'efficiency')
    op.drop_column('panel', 'power_output')
    # ### end Alembic commands ###