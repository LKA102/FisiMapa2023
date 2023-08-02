from fastapi import APIRouter
from api.apiRoutes import pabellon_route

apiRouter = APIRouter()
apiRouter.include_router(pabellon_route.router, prefix="", tags = ["pabellones"])