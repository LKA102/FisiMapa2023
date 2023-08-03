from sqlalchemy import Column, Integer, String, Text
from db.session import Base

class Salon_M(Base):
    __tablename__ = "salones_especiales"
    idSalon = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreSalon = Column(String)
    capacidad = Column(Integer)
    descripcion = Column(Text)
    piso = Column(Integer)
   
    
