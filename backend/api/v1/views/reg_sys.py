#!/usr/bin/python3
""" registration and login authentication """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity
from functools import wraps


ADMIN_EMAILS = ['ahmed@gmail.com', 'shady@gmail.com', 'sondos@gmail.com']

@app_views.route('/signup', methods=['POST'], strict_slashes=False)
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

@app_views.route('/login', methods=['POST'], strict_slashes=False)
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

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the user id from the JWT token
        user_id = get_jwt_identity()
        
        # Retrieve the user object from the storage using user_id
        user = storage.get_by_attributes(User, id=user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Check if the user's email is in the list of admin emails
        if user.email not in ADMIN_EMAILS:
            return jsonify({'message': 'User is not an admin'}), 403
        
        # Call the original function if the user is admin
        return f(*args, **kwargs)
    
    return decorated_function
