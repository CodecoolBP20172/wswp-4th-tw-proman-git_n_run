from flask import Flask, request, render_template, redirect, session, flash

import common
import queries


app = Flask(__name__)


''' def extract_form():
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]

    return form_dict '''


@app.route("/")
def index():
    return render_template("boards.html")


@app.route('/login-page')
def route_login_page():
    # session['current_page'] = request.path
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def log_in():
    user = queries.get_user(request.form['username'])
    hashed_password_from_db = user['password'] if user is not None else ''

    valid_password = user is not None and 'password' in request.form \
        and request.form['password'].strip() != '' and \
        common.check_password(request.form['password'], hashed_password_from_db)

    if user and valid_password:
        session['logged_in'] = True
        session['username'] = user['username']
        session['id'] = user['id']
        return redirect('/')
    else:
        flash("Wrong username or password")
        return redirect('/login-page')

if __name__ == "__main__":
    app.secret_key = "proman"
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
