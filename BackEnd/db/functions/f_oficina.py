from sqlalchemy.orm import Session
from db.models.m_oficina import Oficina_M

def listar_oficinas(db: Session):
    oficinas = db.query(Oficina_M).all()
    return oficinas

def devolver_oficina(nombre: str, db:Session):
    oficina = db.query(Oficina_M).filter(Oficina_M.nombrePabellon == nombre).first()
    return oficina