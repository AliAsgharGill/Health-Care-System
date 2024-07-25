"""appointments

Revision ID: 3eb618f2d801
Revises: 
Create Date: 2024-07-25 11:39:12.774885

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3eb618f2d801'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('dr_name', sa.String(), nullable=True),
    sa.Column('reason', sa.String(), nullable=True),
    sa.Column('additionalComments', sa.String(), nullable=True),
    sa.Column('expectedDate', sa.String(), nullable=True),
    sa.Column('patient_name', sa.String(), nullable=True),
    sa.Column('status', sa.Enum('pending', 'scheduled', 'cancelled', name='status'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('doctors',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('full_name', sa.String(), nullable=True),
    sa.Column('email_address', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('date_of_birth', sa.Date(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('address', sa.String(), nullable=True),
    sa.Column('occupation', sa.String(), nullable=True),
    sa.Column('emergency_contact_name', sa.String(), nullable=True),
    sa.Column('emergency_contact_number', sa.String(), nullable=True),
    sa.Column('primary_care_physician', sa.String(), nullable=True),
    sa.Column('insurance_provider', sa.String(), nullable=True),
    sa.Column('insurance_policy_number', sa.String(), nullable=True),
    sa.Column('allergies', sa.String(), nullable=True),
    sa.Column('current_medications', sa.String(), nullable=True),
    sa.Column('family_medical_history', sa.String(), nullable=True),
    sa.Column('past_diagnosis', sa.String(), nullable=True),
    sa.Column('identification_type', sa.String(), nullable=True),
    sa.Column('identification_number', sa.String(), nullable=True),
    sa.Column('scanned_copy_of_identification_document', sa.String(), nullable=True),
    sa.Column('receive_treatment', sa.String(), nullable=True),
    sa.Column('share_medical_info', sa.String(), nullable=True),
    sa.Column('privacy_policy', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email_address')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('doctors')
    op.drop_table('appointments')
    # ### end Alembic commands ###
