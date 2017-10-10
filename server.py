from flask import Flask, request, render_template, redirect, jsonify
import queries

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("boards.html")


@app.route("/get-boards")
def get_boards():
    boards = queries.get_boards()
    return jsonify(boards)


@app.route("/get-cards-by-board-id/<int:boardId>")
def get_cards_by_board_id(boardId):
    card_list = queries.get_cards_by_board_id(boardId)
    return jsonify(card_list)




if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
