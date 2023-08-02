from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.s_pabellon import PabellonCrear, PabellonActualizar
from db.session import get_database
from db.functions.f_pabellon import crear_nuevo_pabellon, listar_pabellones, devolver_pabellon, eliminar_pabellon, actualizar_pabellon


router = APIRouter()

@router.post("/crear_pabellon")
def crear_pabellon(pabellon: PabellonCrear, db: Session = Depends(get_database)):
    nuevoPabellon = crear_nuevo_pabellon(pabellon=pabellon, db=db)
    return nuevoPabellon

@router.get("/obtener-pabellones")
def obtener_pabellones(db: Session = Depends(get_database)):
    pabellones = listar_pabellones(db=db)
    return pabellones

@router.get("/obtener-pabellon/{nombre}")
def obtener_pabellon(nombre: str, db:Session = Depends(get_database)):
    pabellon = devolver_pabellon(nombre=nombre, db=db)
    if not pabellon:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return pabellon

@router.patch("/actualizar-pabellon/{nombre}")
def actualizar_un_pabellon (nombre: str, pabellon: PabellonActualizar, db: Session = Depends(get_database)):
    pabellonActualizado = actualizar_pabellon(nombre=nombre, pabellon=pabellon, db=db)
    if not pabellonActualizado:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return pabellonActualizado

@router.delete("/eliminar-pabellon/{nombre}")
def eliminar_un_pabellon(nombre: str, db: Session = Depends(get_database)):
    mensaje = eliminar_pabellon(nombre=nombre, db=db)
    if mensaje.get("Error"):
        raise HTTPException(
            detail=mensaje.get("Error"), status_code=status.HTTP_400_BAD_REQUEST
        )
    return mensaje