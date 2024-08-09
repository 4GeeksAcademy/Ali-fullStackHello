"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, Followers, Comments, Medias, Posts, Characters, CharacterDetails, Planets, PlanetDetails, Starships, StarshipDetails
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]  # List comprehension
        response_body['results'] = results
        response_body['message'] = "GET received"
        return response_body, 200
        #  CREATE USER METHOD
    if request.method == 'POST':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        if not username or not email:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'User already exist'
            response_body['results'] = {}
            return response_body, 404
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "POST received"
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    #  BRING USER METHOD
    if request.method == 'GET':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'User doesnt exist {user_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'GET received {user_id}'
        return response_body, 200
        #  UPDATE USER METHOD
    if request.method == 'PUT':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        if not username or not email:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not user:
            response_body['message'] = f'User doesnt exist {user_id}'
            response_body['results'] = {}
            return response_body, 404
        username_exist = db.session.execute(db.select(Users).where(Users.username == username, Users.id != user_id)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email, Users.id != user_id)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'User already exist'
            response_body['results'] = {}
            return response_body, 409
        user.username = username
        user.email = email
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        db.session.commit()
        response_body['message'] = "User updated successfully"
        response_body['results'] = user.serialize()
        return response_body, 200
        #  DELETE USER METHOD
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body['message'] = f'User doesnt exist {user_id}'
        response_body['results'] = {}
        return response_body, 404
    db.session.delete(user)
    db.session.commit()
    response_body['message'] = f'User {user_id} deleted successfully'
    return response_body, 200
    

@api.route("/favorites", methods=['POST', 'GET', 'PUT', 'DELETE'])
@jwt_required()
def manage_favorites():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
    if not user:
        response_body['results'] = {}
        response_body["message"] = "User not found"
        return response_body, 404
    if request.method == 'POST':
        data = request.json
        item = data.get("item")
        if not item:
            response_body["message"] = "Missing favorite item"
            return response_body, 400
        favorites = Favorites(item=item, user_id=current_user['user_id'])
        db.session.add(favorites)
        db.session.commit()
        response_body["message"] = "Favorite item added successfully"
        return response_body, 201
    if request.method == 'GET':
        favorites = db.session.execute(db.select(Favorites).where(Favorites.user_id == current_user['user_id'])).scalars()
        results = [{"id": row.id, "item": row.item} for row in favorites]
        response_body['results'] = results
        response_body['message'] = f'Favorites for user {current_user["email"]} retrieved successfully'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        favorite_id = data.get("id")
        new_item = data.get("item")
        if not favorite_id or not new_item:
            response_body["message"] = "Missing favorite item ID or new item"
            return response_body, 400
        favorite = db.session.execute(db.select(Favorites).where(Favorites.id == favorite_id, Favorites.user_id == current_user['user_id'])).scalar()
        if not favorite:
            response_body["message"] = "Favorite item not found"
            return response_body, 404
        favorite.item = new_item
        db.session.commit()
        response_body["message"] = "Favorite item updated successfully"
        return response_body, 200
    if request.method == 'DELETE':
        data = request.json
        favorite_id = data.get("id")
        if not favorite_id:
            response_body["message"] = "Missing favorite item ID"
            return response_body, 400
        favorite = db.session.execute(db.select(Favorites).where(Favorites.id == favorite_id, Favorites.user_id == current_user['user_id'])).scalar()
        if not favorite:
            response_body["message"] = "Favorite item not found"
            return response_body, 404
        db.session.delete(favorite)
        db.session.commit()
        response_body["message"] = "Favorite item deleted successfully"
        return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    # TODO: realizar la lógica para verificar en nuestra DB
    email = data.get("email", None).lower()
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body['message'] = 'Authorization denied. email, password incorrect or user inactive'
        return response_body, 401
    access_token = create_access_token(identity={'email': email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get("email").lower()
    new_user = Users(
        email = email,
        password = data.get("password"),
        is_active = True,
        is_admin = False
    )
    print(new_user)
    db.session.add(new_user)
    db.session.commit()
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    access_token = create_access_token(identity={'email': user.email, 
                                                 'user_id': user.id, 
                                                 'is_admin': user.is_admin})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
    if current_user['is_admin']:
        response_body['message'] = f'Acceso concedido a {current_user["email"]}'
        response_body['user_data'] = current_user
        return response_body, 200
    response_body['message'] = f'Acceso dengado porque no eres Administrador'
    response_body['user_data'] = {}
    return response_body, 403


@api.route('/followers', methods=['GET', 'POST'])
def handle_followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "recibí el GET request"
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        following = data.get("following", None)
        follower = data.get("follower", None)
        print(data)
        #  1. Verificar que data follower y following existan
        #  Si no existen devolver un 404 con un mensaje que los datos no han sido recibidos correctamente
        if not follower or not following:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 404
        #  2. Verificar que estoy recibiendo numeros
        if not (isinstance(follower, int) and isinstance(following, int)):
            response_body['message'] = 'Los datos deben ser números'
            response_body['results'] = {}
            return response_body, 404
        #  3. Verificar que los dos id Existant
        #  si no existen devolver un 404 con el mensaje que UNO o los DOS no existen
        #  y si los existen devolver un ok
        following_exist = db.session.get(Followers, following)
        follower_exist = db.session.get(Followers, follower)
        if not follower_exist or not following_exist or following == follower:
            response_body['message'] = 'Algono o Ambos usuarios no existen o son iguales'
            response_body['results'] = {}
            return response_body, 404
        row = Followers(user_from_id = data['following'], 
                        user_to_id = data['follower'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "recibí el POST request"
        return response_body, 200
        