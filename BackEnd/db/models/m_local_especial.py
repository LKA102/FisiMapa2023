from sqlalchemy import Column, Integer, String, Text
from db.session import Base

class Local_M(Base):
    __tablename__ = "locales_especiales"
    idSalon = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombreLocal = Column(String)
    descripcion = Column(Text)
   
    
