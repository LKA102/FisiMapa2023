from sqlalchemy.orm import Session
from sqlalchemy import and_
from schemas.s_aula import AulaCrear, AulaActualizar
from db.models.m_aula import Aula_M
from db.models.m_pabellon import Pabellon_M



def crear_nueva_aula(aula: AulaCrear, db: Session):
    pabellon_existente = db.query(Pabellon_M).filter(Pabellon_M.idPabellon == aula.idPabellon).first()
    if not pabellon_existente:
        return
    nuevaAula = Aula_M(nombreAula = aula.nombreAula, capacidad = aula.capacidad, descripcion=aula.descripcion, estado=aula.estado, piso=aula.piso, idPabellon=aula.idPabellon)
    db.add(nuevaAula)
    db.commit()
    db.refresh(nuevaAula)
    return nuevaAula

    
def listar_aulas(db: Session):
    aulas = db.query(Aula_M).all()
    aulas_json = []
    for aula in aulas:
        aula_dict = {
            'idAula': aula.idAula,
            'nombreAula': aula.nombreAula,
            'capacidad': aula.capacidad,
            'descripcion': aula.descripcion,
            'estado': aula.estado,
            'piso': aula.estado,
            'idPabellon': aula.idPabellon,
            'nombrePabellon': aula.pabellon.nombrePabellon  # Acceso al nombre del pabellón
        }
        aulas_json.append(aula_dict)
    return aulas_json

def devolver_aula(nombre: str, db:Session):
    aula = db.query(Aula_M).filter(Aula_M.nombreAula == nombre).first()
    if aula:
        pabellon = db.query(Pabellon_M).filter(Pabellon_M.idPabellon == aula.idPabellon).first()
        # Asociar el objeto de pabellón al objeto de aula
        aula.pabellon = pabellon
    return aula

def actualizar_aula(nombre: str, aula: AulaActualizar, db:Session):
    aula_en_bd = devolver_aula(nombre=nombre, db=db)
    if not aula_en_bd:
        return
    aula_data = aula.model_dump(exclude_unset=True)
    for clave, valor in aula_data.items():
        setattr(aula_en_bd, clave, valor)
    db.add(aula_en_bd)
    db.commit()
    db.refresh(aula_en_bd)
    return aula_en_bd

def eliminar_aula(nombreAula: str, idPabellon: int, db: Session):
    try:
        aula_en_db = db.query(Aula_M).filter(and_(Aula_M.nombreAula == nombreAula, Aula_M.idPabellon == idPabellon))
        aula_en_db.delete()
        db.commit()
        return {"Mensaje": f"{nombreAula} eliminado"}
    except:
        return {"Error": f"No se encontro: {nombreAula}"}
    