#!/usr/bin/python3
""" holds class User"""

from models.base_model import BaseModel, Base
from os import getenv
import bcrypt
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'users'
    
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    name = Column(String(300), nullable=True)
    phone_number = Column(String(128), nullable=True)
    address = Column(String(300), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with bcrypt encryption"""
        if name == "password":
            value = self._hash_password(value)
        super().__setattr__(name, value)

    @staticmethod
    def _hash_password(password):
        """Hashes a password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')

    def check_password(self, password):
        """Checks if the provided password matches the stored hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
