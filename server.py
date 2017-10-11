from flask import Flask, request, render_template, redirect, session, flash

import common
import queries


app = Flask(__name__)


def extract_form():
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]
    return form_dict


@app.route("/boards")
def index():
    return render_template("boards.html")


@app.route('/login-page')
def route_login_page():
    return render_template('login.html')


@app.route('/login', methods=['POST', 'GET'])
def log_in():
    form_value = extract_form()
    user = queries.get_user(form_value['username'])
    hashed_password_from_db = user['password'] if user is not None else ''

    valid_password = user is not None and 'password' in form_value \
        and form_value['username'].strip() != '' and \
        common.check_password(form_value['password'], hashed_password_from_db)

    if valid_password:
        session['logged_in'] = True
        session['username'] = user['username']
        session['id'] = user['id']
        return "/boards"
    else:
        flash("Wrong username or password")
        return "/login-page"


@app.route('/register-page')
def route_register_page():
    return render_template('register.html')


if __name__ == "__main__":
    app.secret_key = "proman"
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
