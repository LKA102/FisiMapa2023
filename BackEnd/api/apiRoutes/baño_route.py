from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_baño import listar_baños, devolver_baño
router = APIRouter()

@router.get("/obtener-baños")
def obtener_baños(db: Session = Depends(get_database)):
    baños = listar_baños(db=db)
    return baños

@router.get("/obtener-baño/{nombre}")
def obtener_aula(nombre: str, db:Session = Depends(get_database)):
    baño = devolver_baño(nombre=nombre, db=db)
    if not baño:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return baño