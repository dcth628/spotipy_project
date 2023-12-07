from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError


class SearchForm(FlaskForm):
    searched = StringField('email', validators=[DataRequired()])
    submit = SubmitField('Submit')
