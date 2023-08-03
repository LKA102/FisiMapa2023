from sqlalchemy.orm import Session
from db.models.m_baño import Baño_M

def listar_baños(db: Session):
    baños = db.query(Baño_M).all()
    return baños

def devolver_baño(nombre: str, db:Session):
    baño = db.query(Baño_M).filter(Baño_M.nombreBaño == nombre).first()
    return baño