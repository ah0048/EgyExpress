#!/usr/bin/python3
""" registration and login authentication """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import jsonify, request
from flask_jwt_extended import create_access_token



@app_views.route('/signup', methods=['POST', 'GET'], strict_slashes=False)
def signup():
    if request.is_json:
        data = request.get_json()
    else:
        data = request.form.to_dict()

    if not data:
        return jsonify({"message": "No input data provided"}), 400
    email = data.get('email')
    password = data.get('password')

    # Ensure no user already exists with that email
    if storage.get_by_attributes(User, email=email):
        return jsonify({"error": "User already exists"}), 400

    # Create new user
    new_user = User(email=email, password=password)
    storage.new(new_user)
    storage.save()

    return jsonify({"message": "User registered successfully"}), 201

@app_views.route('/login', methods=['POST', 'GET'], strict_slashes=False)
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find user by email
    user = storage.get_by_attributes(User, email=email)
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Create JWT token
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200
