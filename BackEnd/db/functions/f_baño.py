from sqlalchemy.orm import Session
from db.models.m_baño import Baños_M

def listar_baño(db: Session):
    baños = db.query(Baños_M).all()
    return baños

def devolver_baño(nombre: str, db:Session):
    baño = db.query(Baños_M).filter(Baños_M.nombrePabellon == nombre).first()
    return baño