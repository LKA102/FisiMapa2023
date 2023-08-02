from typing import Optional, List
#from uuid import UUID, uuid4
from pydantic import Field, BaseModel


class PabellonBase(BaseModel):
    nombrePabellon : str = Field(min_length=1, max_length=30)

class PabellonCrear(PabellonBase):
    pass
    
class Pabellon_S(PabellonBase):
    idPabellon: int
    
    class Config:
        orm_mode = True

class PabellonActualizar(BaseModel):
    nombrePabellon: Optional[str]



