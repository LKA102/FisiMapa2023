from sqlalchemy.orm import Session
from db.models.m_baño import Baño_M
from db.models.m_pabellon import Pabellon_M

def listar_baños(db: Session):
    baños = db.query(Baño_M).all()
    baños_json = []
    for baño in baños:
        baño_dict = {
            'idBaño': baño.idBaño,
            'nombreBaño': baño.nombreBaño,
            'descripcion': baño.descripcion,
            'piso': baño.piso,
            'idPabellon': baño.idPabellon,
            'nombrePabellon': baño.pabellon.nombrePabellon  # Acceso al nombre del pabellón
        }
        baños_json.append(baño_dict)
    return baños_json

def devolver_baño(nombre: str, db:Session):
    baño = db.query(Baño_M).filter(Baño_M.nombreBaño == nombre).first()
    if baño:
        pabellon = db.query(Pabellon_M).filter(Pabellon_M.idPabellon == baño.idPabellon).first()
        # Asociar el objeto de pabellón al objeto de baño
        baño.pabellon = pabellon
    return baño