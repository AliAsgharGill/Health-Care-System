from sqlalchemy import Column, Date, Integer, String, Enum

from core.database.session import Base


class appointments(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    dr_name = Column(String)
    reason = Column(String)
    additionalComments = Column(String)
    expectedDate = Column(Date)
    patient_name = Column(String)
    status = Column(Enum("pending", "scheduled", "cancelled"))
