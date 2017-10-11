from flask import Flask, request, render_template, redirect, jsonify
import queries

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("boards.html")


@app.route("/create-new-board", methods=['POST'])
def add_user():
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
    update_card_status= extract_form()
    queries.update_card_status(update_card_status['id'], update_card_status['status_id'])
    return "1"

def extract_form(): 
    form_input = request.form
    form_dict = {}
    for item in form_input.items():
        form_dict[item[0]] = item[1]

    return form_dict

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
