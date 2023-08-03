from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_laboratorio import listar_laboratorios, devolver_laboratorio

router = APIRouter()

@router.get("/obtener-laboratorios")
def obtener_aulas(db: Session = Depends(get_database)):
    laboratorios = listar_laboratorios(db=db)
    return laboratorios

@router.get("/obtener-laboratorio/{nombre}")
def obtener_aula(nombre: str, db:Session = Depends(get_database)):
    laboratorio = devolver_laboratorio(nombre=nombre, db=db)
    if not laboratorio:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return laboratorio