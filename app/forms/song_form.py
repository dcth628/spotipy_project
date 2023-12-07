from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    song_name = StringField('Song Name', validators=[DataRequired()])
    song_length = IntegerField('Song Length in Seconds', validators=[DataRequired()])
    song_src = StringField('Song Source', validators=[DataRequired()])
    # album_id = IntegerField('Album ID', validators=[DataRequired()])
    submit = SubmitField('Submit')
