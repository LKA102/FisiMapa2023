from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_oficina import listar_oficinas, devolver_oficina

router = APIRouter()

@router.get("/obtener-oficinas")
def obtener_oficinas(db: Session = Depends(get_database)):
    oficinas = listar_oficinas(db=db)
    return oficinas

@router.get("/obtener-oficina/{nombre}")
def obtener_aula(nombre: str, db:Session = Depends(get_database)):
    oficina = devolver_oficina(nombre=nombre, db=db)
    if not oficina:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return oficina