from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.s_aula import AulaCrear, AulaActualizar
from db.session import get_database
from db.functions.f_aula import crear_nueva_aula, listar_aulas, devolver_aula, eliminar_aula, actualizar_aula

router = APIRouter()

@router.post("/crear_aula")
def crear_aula(aula: AulaCrear, db: Session = Depends(get_database)):
    nuevaAula = crear_nueva_aula(aula=aula, db=db)
    if not nuevaAula:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Pabellon relacionado no existe"
        )
    return nuevaAula

@router.get("/obtener-aulas")
def obtener_aulas(db: Session = Depends(get_database)):
    aulas = listar_aulas(db=db)
    return aulas

@router.get("/obtener-aula/{nombre}")
def obtener_aula(nombre: str, db:Session = Depends(get_database)):
    aula = devolver_aula(nombre=nombre, db=db)
    if not aula:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return aula

@router.patch("/actualizar-aula/{nombre}")
def actualizar_una_aula (nombre: str, aula: AulaActualizar, db: Session = Depends(get_database)):
    aulaActualizada = actualizar_aula(nombre=nombre, aula=aula, db=db)
    if not aulaActualizada:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return aulaActualizada

@router.delete("/eliminar-aula/{nombreAula}/{idPabellon}")
def eliminar_una_aula(nombreAula: str, idPabellon: int, db: Session = Depends(get_database)):
    mensaje = eliminar_aula(nombreAula=nombreAula,idPabellon=idPabellon, db=db)
    if mensaje.get("Error"):
        raise HTTPException(
            detail=mensaje.get("Error"), status_code=status.HTTP_400_BAD_REQUEST
        )
    return mensaje