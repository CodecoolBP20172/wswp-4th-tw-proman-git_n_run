from flask import Flask, request, render_template, redirect, session, flash, jsonify

import common
import queries


app = Flask(__name__)


def extract_form():
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]
    return form_dict


@app.route("/")
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
        return "/"
    else:
        flash("Wrong username or password")
        return "/login-page"


@app.route('/register-page')
def route_register_page():
    return render_template('register.html')


@app.route('/register', methods=['POST', 'GET'])
def register():
    form_value = extract_form()
    if form_value['username'].strip() != '' and form_value['password'].strip() != '':
        all_username = []
        get_all_username = queries.get_all_username()
        form_value['password'] = common.get_hashed_password(form_value['password'])
        for pack in get_all_username:
            all_username.append(pack['username'])
        if form_value['username'] not in all_username:
            queries.add_user(form_value)
            return "/login-page"
        else:
            return "/register-page"
    else:
        flash("Username and password must be filled!")
        return "/register-page"


@app.route("/create-new-board", methods=['POST'])
def add_board():
    board_title_dict = extract_form()
    queries.create_new_board(board_title_dict['title'])
    return('asd')


@app.route("/create-new-card", methods=['POST'])
def create_new_card():
    card_title_dict = extract_form()
    queries.create_new_card(card_title_dict['board_id'], card_title_dict['title'])
    return('apacukas')


@app.route("/edit-card-title", methods=['POST'])
def edit_card_title():
    edit_card_title_dict = extract_form()
    queries.edit_card_title(edit_card_title_dict['id'], edit_card_title_dict['title'])
    return('apacukas')


@app.route("/get-boards")
def get_boards():
    boards = queries.get_boards()
    return jsonify(boards)


@app.route("/get-cards-by-board-id/<int:boardId>")
def get_cards_by_board_id(boardId):
    card_list = queries.get_cards_by_board_id(boardId)
    return jsonify(card_list)


@app.route("/update-card-status", methods=["POST"])
def update_card_status():
    update_card_status = extract_form()
    queries.update_card_status(update_card_status['id'], update_card_status['status_id'])
    return "1"


def extract_form():
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]

    return form_dict

if __name__ == "__main__":
    app.secret_key = "proman"
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
