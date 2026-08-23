"""
CareerSetu — Authentication Utilities

Provides bcrypt password hashing, JWT token creation/verification,
and FastAPI dependency functions for route-level access control.
"""

import os
from datetime import datetime, timezone, timedelta
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import bcrypt as _bcrypt

from app.database import get_db

# ---------------------------------------------------------------------------
# Configuration — in production, load SECRET_KEY from a vault / env var.
# ---------------------------------------------------------------------------
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "careersetu-dev-secret-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("JWT_EXPIRE_MINUTES", "1440"))  # 24 h default

# ---------------------------------------------------------------------------
# Password hashing (bcrypt)
# ---------------------------------------------------------------------------


def hash_password(plain_password: str) -> str:
    """Return a bcrypt hash of *plain_password*."""
    return _bcrypt.hashpw(plain_password.encode("utf-8"), _bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return True if *plain_password* matches the stored *hashed_password*."""
    try:
        return _bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


# ---------------------------------------------------------------------------
# JWT token helpers
# ---------------------------------------------------------------------------

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a signed JWT containing *data* with an expiry claim."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Decode and verify a JWT. Raises JWTError on failure."""
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


# ---------------------------------------------------------------------------
# FastAPI dependencies for route protection
# ---------------------------------------------------------------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


def get_current_user(
    token: Annotated[str | None, Depends(oauth2_scheme)] = None,
    db: Session = Depends(get_db),
):
    """
    Dependency that extracts and validates the current user from a Bearer JWT.
    Returns the SQLAlchemy UserModel instance.
    Raises 401 if no valid token is present.
    """
    from app.models import UserModel  # deferred to avoid circular imports

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required. Please log in.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if token is None:
        raise credentials_exception

    try:
        payload = decode_access_token(token)
        user_email: str | None = payload.get("sub")
        if user_email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(UserModel).filter(UserModel.email == user_email).first()
    if user is None:
        raise credentials_exception

    return user


def get_optional_user(
    token: Annotated[str | None, Depends(oauth2_scheme)] = None,
    db: Session = Depends(get_db),
):
    """
    Like get_current_user but returns None instead of raising 401
    when no token is present.  Useful for endpoints that behave
    differently for authed vs anonymous users.
    """
    if token is None:
        return None
    try:
        return get_current_user(token=token, db=db)
    except HTTPException:
        return None


def require_role(*allowed_roles: str):
    """
    Returns a FastAPI dependency that checks the authenticated user's role.
    Raises 403 if the user's role is not in *allowed_roles*.

    Usage:
        @router.get("/admin/stats", dependencies=[Depends(require_role("admin"))])
    """
    from app.models import UserModel  # deferred to avoid circular imports

    def _role_checker(current_user: UserModel = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role: {', '.join(allowed_roles)}.",
            )
        return current_user

    return _role_checker
