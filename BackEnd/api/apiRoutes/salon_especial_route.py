from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_salon_especial import listar_salones_especiales, devolver_salon_especial

router = APIRouter()

@router.get("/obtener-salones-especiales")
def obtener_salones_especiales(db: Session = Depends(get_database)):
    salones_especiales = listar_salones_especiales(db=db)
    return salones_especiales

@router.get("/obtener-salon-especial/{nombre}")
def obtener_aula(nombre: str, db:Session = Depends(get_database)):
    salon_especial = devolver_salon_especial(nombre=nombre, db=db)
    if not salon_especial:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return salon_especial