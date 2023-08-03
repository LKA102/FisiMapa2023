from sqlalchemy.orm import Session
from db.models.m_oficina import Oficina_M
from db.models.m_pabellon import Pabellon_M

def listar_oficinas(db: Session):
    oficinas = db.query(Oficina_M).all()
    oficinas_json = []
    for oficina in oficinas:
        oficina_dict = {
            'idOficina': oficina.idOficina,
            'nombreOficina': oficina.nombreOficina,
            'descripcion': oficina.descripcion,
            'horarioInicioActividades': oficina.horarioInicioActividades,
            'horarioFinActividades': oficina.horarioFinActividades,
            'diaInicioActividades': oficina.diaInicioActividades,
            'diaFinActividades': oficina.diaFinActividades,
            'encargado': oficina.encargado,
            'capacidad': oficina.capacidad,
            'piso': oficina.piso,
            'idPabellon': oficina.idPabellon,
            'nombrePabellon': oficina.pabellon.nombrePabellon  # Acceso al nombre del pabellón
        }
        oficinas_json.append(oficina_dict)
    return oficinas_json

def devolver_oficina(nombre: str, db:Session):
    oficina = db.query(Oficina_M).filter(Oficina_M.nombreOficina == nombre).first()
    if oficina:
        pabellon = db.query(Pabellon_M).filter(Pabellon_M.idPabellon == oficina.idPabellon).first()
        # Asociar el objeto de pabellón al objeto de baño
        oficina.pabellon = pabellon
    return oficina