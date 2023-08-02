from sqlalchemy.orm import Session
from schemas.s_pabellon import PabellonCrear, PabellonActualizar
from db.models.m_pabellon import Pabellon_M

def crear_nuevo_pabellon(pabellon: PabellonCrear, db: Session):
    nuevoPabellon = Pabellon_M(nombrePabellon = pabellon.nombrePabellon)
    db.add(nuevoPabellon)
    db.commit()
    db.refresh(nuevoPabellon)
    return nuevoPabellon

def listar_pabellones(db: Session):
    pabellones = db.query(Pabellon_M).all()
    return pabellones

def devolver_pabellon(nombre: str, db:Session):
    pabellon = db.query(Pabellon_M).filter(Pabellon_M.nombrePabellon == nombre).first()
    return pabellon

def actualizar_pabellon(nombre: str, pabellon: PabellonActualizar, db:Session):
    pabellon_en_bd = devolver_pabellon(nombre=nombre, db=db)
    if not pabellon_en_bd:
        return
    pabellon_data = pabellon.model_dump(exclude_unset=True)
    for clave, valor in pabellon_data.items():
        setattr(pabellon_en_bd, clave, valor)
    db.add(pabellon_en_bd)
    db.commit()
    db.refresh(pabellon_en_bd)
    return pabellon_en_bd

def eliminar_pabellon(nombre: str, db: Session):
    pabellon_en_db = db.query(Pabellon_M).filter(Pabellon_M.nombrePabellon == nombre)
    if not pabellon_en_db.first():
        return {"Error": f"No se encontro: {nombre}"}
    pabellon_en_db.delete()
    db.commit()
    return {"Mensaje": f"{nombre} eliminado"}