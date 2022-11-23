from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from models import User
from flask_login import login_user, logout_user, login_required, current_user
from __init__ import db
from password_strength import PasswordPolicy, PasswordStats

auth = Blueprint('auth', __name__)  # create a Blueprint object that we name 'auth'

policy = PasswordPolicy.from_names(
    length=8,  # min length: 8
    uppercase=1,  # needs min. 1 uppercase letters
    numbers=1,  # needs min. 1 digits
    strength=0.66  # needs a password that scores at least 0.66 with its entropy bits
)


@auth.route('/login', methods=['GET', 'POST'])  # define login page path
def login():  # define login page function
    if request.method == 'GET':  # if the request is a GET we return the login page
        return render_template('login.html')
    else:  # if the request is POST then we check if the user exist and with te right password
        email = request.form.get('email')
        password = request.form.get('password')
        remember = True if request.form.get('remember') else False
        user = User.query.filter_by(email=email).first()
        # check if the user actually exists
        # take the user-supplied password, hash it, and compare it to the hashed password in the database
        if not user:
            flash('Please sign up before!')
            return redirect(url_for('auth.signup'))
        elif not check_password_hash(user.password, password):
            flash('Please check your login details and try again.')
            return redirect(url_for('auth.login'))  # if the user doesn't exist or password is wrong, reload the page
        # if the above check passes, then we know the user has the right credentials
        login_user(user, remember=remember)
        return redirect(url_for('main.profile'))


@auth.route('/signup', methods=['GET', 'POST'])  # we define the sign-up path
def signup():  # define the sign-up function
    if request.method == 'GET':  # If the request is GET we return the sign-up page and forms
        return render_template('signup.html')
    else:  # if the request is POST, then we check if the email doesn't already exist, and then we save data
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        stats = PasswordStats(password)
        user = User.query.filter_by(
            email=email).first()  # if this returns a user, then the email already exists in database
        if user:  # if a user is found, we want to redirect back to signup page so user can try again
            flash("Email address already exists")
            return redirect(url_for('auth.signup'))
        else:
            if len(email) == 0 or len(password) == 0 or len(name) == 0:
                flash("Please enter details")
                return render_template('signup.html')
            elif len(password) < 8:
                flash("Your password is too short.")
                return render_template('signup.html')
            elif stats.strength() < 0.66:
                flash("Your password is too weak.")
                return render_template('signup.html')
            elif stats.numbers < 1 or stats.letters_uppercase < 1 or stats.special_characters < 1:
                flash("Your password must contain at least one number, capital letter and special character.")
                return render_template('signup.html')
            else:
                # create a new user with the form data. Hash the password so the plaintext version isn't saved.
                new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))  #
                # add the new user to the database
                db.session.add(new_user)
                db.session.commit()
                return redirect(url_for('auth.login'))


@auth.route('/logout')  # define logout path
@login_required
def logout():  # define the logout function
    logout_user()
    return redirect(url_for('main.index'))


@auth.route('/delete')  # define delete path
@login_required
def delete():
    db.session.delete(current_user)
    db.session.commit()
    return redirect(url_for('main.index'))
