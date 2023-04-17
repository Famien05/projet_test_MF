from fastapi import APIRouter

router = APIRouter()

@router.get("/trainings")
async def my_trainings():
    pass

@router.get("/available")
async def available_trainings():
    pass

@router.post("/enroll/{training_id}")
async def enroll(training_id: int):
    pass

@router.post("/withdraw/{training_id}")
async def withdraw(training_id: int):
    pass
