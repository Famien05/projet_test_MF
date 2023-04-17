from fastapi import APIRouter

router = APIRouter()

@router.get("/trainings")
async def my_offered_trainings():
    pass

@router.post("/add")
async def add_training():
    pass

@router.delete("/delete/{training_id}")
async def delete_training(training_id: int):
    pass
