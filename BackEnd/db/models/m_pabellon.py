from sqlalchemy import Column, Integer, String
from db.session import Base
from sqlalchemy.orm import relationship

class Pabellon_M(Base):
    __tablename__ = "pabellones"
    idPabellon = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombrePabellon = Column(String)
    aulas = relationship('Aula_M', back_populates='pabellon')
    
