from sqlalchemy.orm import Session
from db.models.m_local_especial import Local_M

def listar_locales_especiales(db: Session):
    locales_especiales = db.query(Local_M).all()
    return locales_especiales

def devolver_local_especial(nombre: str, db:Session):
    local_especial = db.query(Local_M).filter(Local_M.nombreLocal == nombre).first()
    return local_especial