from sqlalchemy.orm import Session
from db.models.m_salon_especial import Salon_M

def listar_salones_especiales(db: Session):
    salones_especiales = db.query(Salon_M).all()
    return salones_especiales

def devolver_salon_especial(nombre: str, db:Session):
    salon_especial = db.query(Salon_M).filter(Salon_M.nombrePabellon == nombre).first()
    return salon_especial