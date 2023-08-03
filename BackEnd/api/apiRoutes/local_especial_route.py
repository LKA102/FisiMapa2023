from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db.session import get_database
from db.functions.f_local_especial import listar_locales_especiales, devolver_local_especial
router = APIRouter()

@router.get("/obtener-locales-especiales")
def obtener_locales_especiales(db: Session = Depends(get_database)):
    locales_especiales = listar_locales_especiales(db=db)
    return locales_especiales

@router.get("/obtener-local-especial/{nombre}")
def obtener_local_especial(nombre: str, db:Session = Depends(get_database)):
    local_especial = devolver_local_especial(nombre=nombre, db=db)
    if not local_especial:
        raise HTTPException(
            detail=f"{nombre} no encontrado", status_code=status.HTTP_404_NOT_FOUND
        )
    return local_especial