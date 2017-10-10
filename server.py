from flask import Flask, request, render_template, redirect, jsonify
import queries

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("boards.html")


@app.route("/get-boards")
def get_boards():
    print("asdasd")
    boards = queries.get_boards()
    return jsonify(boards)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
