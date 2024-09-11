#!/usr/bin/python3
""" shows user info on the profile page and allow for editing these info and logout and delete user acc """
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required


@app_views.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()
    
    # Retrieve the user object from the storage using user_id
    user = storage.get_by_attributes(User, id=user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Prepare user information for JSON response
    user_info = {
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'phone_number': user.phone_number,
        'address': user.address
    }
    
    return jsonify(user_info), 200


@app_views.route('/profile/edit', methods=['PUT'])
@jwt_required()
def edit_profile():
    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()
    
    # Retrieve the user object from the storage using user_id
    user = storage.get_by_attributes(User, id=user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get the updated user information from the request
    data = request.get_json()
    
    # Update each attribute
    for attr, value in data.items():
        setattr(user, attr, value)
    
    # Save the updated user
    user.save()
    storage.save()
    
    return jsonify({'message': 'Profile updated successfully'}), 200


@app_views.route('/profile/logout', methods=['POST'])
@jwt_required()
def logout_user():
    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()
    
    # Retrieve the user object from the storage using user_id
    user = storage.get_by_attributes(User, id=user_id)

    # Unset the JWT cookies to log the user out on the client side
    response = jsonify({
        'msg': f'Logged out successfully. See you later, {user.name}!'
    })
    
    return response, 200


@app_views.route('/profile/delete', methods=['DELETE'])
@jwt_required()
def delete_profile():
    # Get the current user's ID from the JWT token
    user_id = get_jwt_identity()
    
    # Retrieve the user object from the storage using user_id
    user = storage.get_by_attributes(User, id=user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Delete the user object
    storage.delete(user)
    storage.save()

    # Return success response
    return jsonify({'message': 'User account deleted successfully'}), 200
