from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    # Atributos
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(),  unique=False, nullable=False)
    # Relaciones

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                "is_active": self.is_active,
                "is_admin": self.is_admin}

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