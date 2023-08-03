from sqlalchemy.orm import Session
from db.models.m_laboratorio import Laboratorio_M
from db.models.m_pabellon import Pabellon_M

def listar_laboratorios(db: Session):
    laboratorios = db.query(Laboratorio_M).all()
    return laboratorios

def devolver_laboratorio(nombre: str, db:Session):
    laboratorio = db.query(Laboratorio_M).filter(Laboratorio_M.nombreLaboratorio == nombre).first()
    if laboratorio:
        pabellon = db.query(Pabellon_M).filter(Pabellon_M.idPabellon == laboratorio.idPabellon).first()
        # Asociar el objeto de pabellón al objeto de laboratorio
        laboratorio.pabellon = pabellon
    return laboratorio