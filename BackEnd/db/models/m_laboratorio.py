from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.session import Base

class Laboratorio_M(Base):
    __tablename__ = "laboratorios"
    idLaboratorio = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreLaboratorio = Column(String)
    capacidad = Column(Integer)
    descripcion = Column(Text)
    estado = Column(String)
    piso = Column(Integer)
    idPabellon = Column(Integer, ForeignKey('pabellones.idPabellon'))
    pabellon = relationship('Pabellon_M', back_populates='laboratorios')