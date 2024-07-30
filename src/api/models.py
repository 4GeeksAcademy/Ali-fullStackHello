from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Characters(db.Model):
    __tablename__ = "characters"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<Characters {self.name}>'

    def serialize(self):
        return {"uid": self.uid,
                "name": self.username}


class CharacterDetails(db.Model):
    __tablename__ = "character_details"
    uid = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, unique=True, nullable=False)
    planet_origin = db.Column(db.String, unique=False, nullable=False)
    name = db.Column(db.String, unique=False, nullable=False)
    gender = db.Column(db.String, unique=False, nullable=False)
    height = db.Column(db.String, unique=False, nullable=False)
    eye_color = db.Column(db.String, unique=False, nullable=False)
    hair_color = db.Column(db.String, unique=False, nullable=False)
    transport = db.Column(db.String, unique=False, nullable=False)

    def __repr__(self):
        return f'<Character {self.name} - {self.planet_origin}>'

    def serialize(self):
        return {"id": self.id,
                "username": self.username,
                "firstname": self.firstname,
                "lastname": self.lastname,
                "email": self.email}


class Planets(db.Model):
    __tablename__ = "planets"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    

class PlanetDetails(db.Model):
    __tablename__ = "planet_details"
    uid = db.Column(db.Integer, primary_key=True)
    planet_id = db.Column(db.Integer, unique=True, nullable=False)
    gravity = db.Column(db.String, unique=False, nullable=False)
    diameter = db.Column(db.String, unique=False, nullable=False)
    population = db.Column(db.String, unique=False, nullable=False)
    terrain = db.Column(db.String, unique=False, nullable=False)
    created = db.Column(db.String, unique=False, nullable=False)


class Starships(db.Model):
    __tablename__ = "starships"
    uid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)


class StarshipDetails(db.Model):
    __tablename__ = "starship_details"
    uid = db.Column(db.Integer, primary_key=True)
    starship_id = db.Column(db.Integer, unique=True, nullable=False)
    model = db.Column(db.String, unique=False, nullable=False)
    cargo_capacity = db.Column(db.String, unique=False, nullable=False)
    cost = db.Column(db.String, unique=False, nullable=False)
    passengers = db.Column(db.String, unique=False, nullable=False)


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    firstname = db.Column(db.String, unique=False, nullable=False)
    lastname = db.Column(db.String, unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email} - {self.username}>'

    def serialize(self):
        return {"id": self.id,
                "username": self.username,
                "firstname": self.firstname,
                "lastname": self.lastname,
                "email": self.email}


class Followers(db.Model):
    __tablename__ = "followers"
    id = db.Column(db.Integer, primary_key=True)
    user_from_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_from_to = db.relationship('Users', foreign_keys=[user_from_id])
    user_to_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to_to = db.relationship('Users', foreign_keys=[user_to_id])

    def __repr__(self):
        return f'<Followers {self.user_from_id} - {self.user_to_id}>'

    def serialize(self):
        return {"user_from_id": self.user_from_id,
                "user_to_id": self.user_to_id}


class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('post_to', lazy='select'))

    def __repr__(self):
        return f'<Posts {self.user_id}>'

    def serialize(self):
        return {"user_id": self.user_id}


class Medias(db.Model):
    __tablename__ = "medias"
    id = db.Column(db.Integer, primary_key=True)
    medias_type = db.Column(db.String, unique=True, nullable=False)
    url = db.Column(db.String, unique=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('media_to', lazy='select'))

    def __repr__(self):
        return f'<Medias {self.medias_type}>'

    def serialize(self):
        return {"id": self.id,
                "medias_type": self.medias_type,
                "url": self.url,
                "post_id": self.post_id}


class Comments(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String, unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    author_to = db.relationship('Users', foreign_keys=[author_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comment_to', lazy='select'))

    def __repr__(self):
        return f'<Comments {self.comment_text}>'

    def serialize(self):
        return {"id": self.id,
                "comment_text": self.comment_text,
                "author_id": self.author_id,
                "post_id": self.post_id}


class Authors(db.Model):
    #__tablename__ = "authors"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    lastname = db.Column(db.String, unique=False, nullable=False)
     # Atributo - ForeignKey
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # Relaciones
    user = db.relationship('Users', foreign_keys=[user_id], 
                            backref=db.backref('author_to', lazy='select'))


    def __repr__(self):
        return f'<Author: {self.id} - {self.name}'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'user_id': self.user_id}


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    author_id = db.Column(db.Integer, db.ForeignKey('authors.id'))
    author_to = db.relationship('Authors', foreign_keys=[author_id], 
                                 backref=db.backref('book_to', lazy='select'))

    def __repr__(self):
        return f'<Book: {self.id} - {self.title}'

    def serialize(self):
        return {'id': self.id,
                'titlw': self.title,
                'author_id': self.author_id}
