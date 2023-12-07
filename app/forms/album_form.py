from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import data_required
from app.models import Album

class CreateAlbumForm(FlaskForm):
    album_name = StringField('Album Name', validators=[data_required()])
    year_recorded = IntegerField('Year Recorded', validators=[data_required()])
    album_img = StringField('Album Image', validators=[data_required()])
    submit = SubmitField('Submit')
