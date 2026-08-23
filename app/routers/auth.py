from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserModel
from app.schemas import UserCreate, UserLogin, UserResponse, TokenResponse
from app.auth_utils import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=TokenResponse)
def signup(payload: UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    existing = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address is already registered.",
        )

    hashed_password = hash_password(payload.password)
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

    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return TokenResponse(
        accessToken=access_token,
        user=UserResponse.from_model(user),
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(UserModel).filter(UserModel.email == payload.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials.",
        )

    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials.",
        )

    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return TokenResponse(
        accessToken=access_token,
        user=UserResponse.from_model(user),
    )


@router.get("/me", response_model=UserResponse)
def get_user_profile(
    current_user: UserModel = Depends(get_current_user),
) -> UserResponse:
    """Return the authenticated user's own profile. No IDOR possible."""
    return UserResponse.from_model(current_user)
