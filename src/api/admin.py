import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Favorites, Authors, Books, Followers, Comments, Medias, Posts, Characters, CharacterDetails, Planets, PlanetDetails, Starships, StarshipDetails


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    # admin.add_view(ModelView(YourModelName, db.session)). You can duplicate that line to add mew models
    admin.add_view(ModelView(Authors, db.session))
    admin.add_view(ModelView(Books, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Followers, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Medias, db.session))
    admin.add_view(ModelView(Posts, db.session))
    admin.add_view(ModelView(Characters, db.session))
    admin.add_view(ModelView(CharacterDetails, db.session))
    admin.add_view(ModelView(Planets, db.session))
    admin.add_view(ModelView(PlanetDetails, db.session))
    admin.add_view(ModelView(Starships, db.session))
    admin.add_view(ModelView(StarshipDetails, db.session))
