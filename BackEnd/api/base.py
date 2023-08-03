from fastapi import APIRouter
from api.apiRoutes import pabellon_route, aula_route, oficina_route, laboratorio_route, baño_route, salon_especial_route, local_especial_route

apiRouter = APIRouter()
apiRouter.include_router(pabellon_route.router, prefix="", tags = ["pabellones"])
apiRouter.include_router(aula_route.router, prefix="", tags=["aulas"])
apiRouter.include_router(laboratorio_route.router, prefix="", tags=["laboratorios"])
apiRouter.include_router(oficina_route.router, prefix="", tags=["oficinas"])
apiRouter.include_router(baño_route.router, prefix="", tags=["baños"])
apiRouter.include_router(salon_especial_route.router, prefix="", tags=["salones_especiales"])
apiRouter.include_router(local_especial_route.router, prefix="", tags=["locales_especiales"])