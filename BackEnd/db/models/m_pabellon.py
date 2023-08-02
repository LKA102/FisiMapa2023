from sqlalchemy import Column, Integer, String
from db.session import Base

class Pabellon_M(Base):
    __tablename__ = "pabellones"
    idPabellon = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombrePabellon = Column(String)
    
