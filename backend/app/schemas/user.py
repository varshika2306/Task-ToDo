from pydantic import BaseModel, EmailStr, field_validator


# ----------------------------
# Register
# ----------------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):
        value = value.strip()

        if len(value) < 3:
            raise ValueError("Name must contain at least 3 characters.")

        if len(value) > 50:
            raise ValueError("Name cannot exceed 50 characters.")

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")

        return value


# ----------------------------
# Response
# ----------------------------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ----------------------------
# Update Profile
# ----------------------------
class UserUpdate(BaseModel):
    name: str
    email: EmailStr

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):
        value = value.strip()

        if len(value) < 3:
            raise ValueError("Name must contain at least 3 characters.")

        if len(value) > 50:
            raise ValueError("Name cannot exceed 50 characters.")

        return value


# ----------------------------
# Change Password
# ----------------------------
class ChangePassword(BaseModel):
    current_password: str
    new_password: str

    @field_validator("new_password")
    @classmethod
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")

        return value