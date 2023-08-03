from sqlalchemy.orm import Session
from db.models.m_laboratorio import Laboratorio_M

def listar_laboratorios(db: Session):
    laboratorios = db.query(Laboratorio_M).all()
    return laboratorios

def devolver_laboratorio(nombre: str, db:Session):
    laboratorio = db.query(Laboratorio_M).filter(Laboratorio_M.nombrePabellon == nombre).first()
    return laboratorio