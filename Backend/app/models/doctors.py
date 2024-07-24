from sqlalchemy import Column, Integer, String

from core.database.session import Base


class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    image_url = Column(String)

    def __repr__(self):
        return f"<Doctor(id={self.id}, name={self.name}, image_url={self.image_url})>"

    def __str__(self):
        return self.__repr__()
