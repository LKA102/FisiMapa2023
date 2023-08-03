from sqlalchemy import Column, Integer, String, Text, ForeignKey, Time
from sqlalchemy.orm import relationship
from db.session import Base

class Oficina_M(Base):
    __tablename__ = "oficinas"
    idOficina = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreOficina = Column(String)
    horarioInicioActividades = Column(Time)
    horarioFinActividades = Column(Time)
    diaInicioActividades = Column(String)
    diaFinActividades = Column(String)
    encargado = Column(String)
    capacidad = Column(Integer)
    descripcion = Column(Text)
    estado = Column(String)
    piso = Column(Integer)
    idPabellon = Column(Integer, ForeignKey('pabellones.idPabellon'))
    pabellon = relationship('Pabellon_M', back_populates='oficinas')