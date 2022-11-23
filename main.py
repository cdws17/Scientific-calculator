from flask import Flask, render_template, redirect, url_for, request, Blueprint, flash
from flask_login import login_required, current_user
from __init__ import create_app, db

main = Blueprint('main', __name__)


@main.route('/')  # home page that returns 'index'
def index():
    return render_template('index.html')


@main.route('/profile')  # profile page that returns 'profile'
@login_required  # login is required in order to access this page
def profile():
    return render_template('profile.html', name=current_user.name, email=current_user.email)


app = create_app()  # we initialize our flask app using the __init__.py function
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # create the SQLite database
        app.run(debug=True)  # run the flask app on debug mode
