from typing import Optional, List
from pydantic import Field, BaseModel

class AulaBase(BaseModel):
    nombreAula: str = Field(min_length=1, max_length=30)
    capacidad: int = Field(gt=0, lt=50)
    descripcion: Optional[str] = Field(max_length=150)
    estado: str = "Disponible"
    
class AulaCrear(AulaBase):
    piso: int
    idPabellon: int
    
class Aula(AulaBase):
    piso: int
    idPabellon: int
    
    class Config:
        from_attributes = True
        
class AulaActualizar(AulaBase):
    piso: int
    idPabellon: int
