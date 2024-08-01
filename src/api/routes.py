"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Followers, Comments, Medias, Posts, Characters, CharacterDetails, Planets, PlanetDetails, Starships, StarshipDetails
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
        response_body['message'] = "recibí el GET request"
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        # Validate the received data
        if not username or not email:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 400
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'El usuario ya existe'
            response_body['results'] = {}
            return response_body, 404
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "recibí el POST request"
        return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    username = data.get("username", None)
    password = data.get("password", None)
    #  TODO: Realizar la logica para verificar en nuestro DB
    if username != "test" or password != "test":
        response_body["message"] = "Bad username or password"
        return response_body, 404
    access_token = create_access_token(identity={"username": username, "user_id": 30})
    response_body["message"] = "User Logged"
    response_body["access_token"] = access_token
    #  return jsonify(access_token=access_token)
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()  # Access the identity of the current user with get_jwt_identity
    if current_user["user_id"] == 30:
        response_body['message'] = f'Access granted to {current_user}'
        response_body['user_data'] = current_user
        return response_body, 200
    response_body['message'] = f'Access denied'
    response_body['user_data'] = {}
    return response_body, 403
        
    #  return jsonify(logged_in_as=current_user), 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe el usuario {user_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'recibí el GET request {user_id}'
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'recibí el PUT request {user_id}'
        return response_body, 200
    if request.method == 'DELETE':
        response_body['message'] = f'recibí el DELETE request {user_id}'
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        username = data.get('username', None)
        email = data.get('email', None)
        # Validate the received data
        if not username or not email:
            response_body['message'] = 'Faltan datos'
            response_body['results'] = {}
            return response_body, 400
        username_exist = db.session.execute(db.select(Users).where(Users.username == username)).scalar()
        email_exist = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
        if username_exist or email_exist:
            response_body['message'] = 'El usuario ya existe'
            response_body['results'] = {}
            return response_body, 404
        row = Users(username = data['username'], 
                    email = data['email'],
                    firstname = data['firstname'],
                    lastname = data['lastname'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "recibí el POST request"
        return response_body, 200

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
        