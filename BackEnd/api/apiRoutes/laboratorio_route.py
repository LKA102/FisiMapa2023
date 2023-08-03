from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_laboratorio import listar_laboratorios, devolver_laboratorio

router = APIRouter()

@router.get("/obtener-laboratorioss")
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