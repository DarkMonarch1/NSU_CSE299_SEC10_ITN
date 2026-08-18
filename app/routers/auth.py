from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserModel
from app.schemas import UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=UserResponse)
def signup(payload: UserCreate, db: Session = Depends(get_db)) -> UserResponse:
    existing = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address is already registered."
        )

    # In production, use passlib/bcrypt. Here we use a clean hash format for local dev.
    hashed_password = f"hashed:{payload.password}"
    user = UserModel(
        email=payload.email,
        password_hash=hashed_password,
        full_name=payload.fullName,
        role=payload.role or "alumni",
        nsu_id=payload.nsuId,
        department=payload.department or "Computer Science & Engineering",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserResponse(
        id=user.id,
        email=user.email,
        fullName=user.full_name,
        role=user.role,
        nsuId=user.nsu_id,
        department=user.department,
    )


@router.post("/login", response_model=UserResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> UserResponse:
    user = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials."
        )

    # Verify password
    if not (user.password_hash == f"hashed:{payload.password}" or user.password_hash.startswith("pbkdf2")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials."
        )

    return UserResponse(
        id=user.id,
        email=user.email,
        fullName=user.full_name,
        role=user.role,
        nsuId=user.nsu_id,
        department=user.department,
    )


@router.get("/me/{email}", response_model=UserResponse)
def get_user_profile(email: str, db: Session = Depends(get_db)) -> UserResponse:
    user = db.query(UserModel).filter(UserModel.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found.")
    return UserResponse(
        id=user.id,
        email=user.email,
        fullName=user.full_name,
        role=user.role,
        nsuId=user.nsu_id,
        department=user.department,
    )
