from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from db.session import Base

class Baños_M(Base):
    __tablename__ = "baños"
    idBaño = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreBaño = Column(String)
    descripcion = Column(Text)
    piso = Column(Integer)
    idPabellon = Column(Integer, ForeignKey('pabellones.idPabellon'))
    pabellon = relationship('Pabellon_M', back_populates='baños')