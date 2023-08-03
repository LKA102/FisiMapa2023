from typing import Optional, List
from pydantic import Field, BaseModel

class Aula(BaseModel):
    
    
    class Config:
        orm_mode = True