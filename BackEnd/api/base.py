from fastapi import APIRouter
from api.apiRoutes import pabellon_route
from api.apiRoutes import aula_route

apiRouter = APIRouter()
apiRouter.include_router(pabellon_route.router, prefix="", tags = ["pabellones"])
apiRouter.include_router(aula_route.router, prefix="", tags=["aulas"])