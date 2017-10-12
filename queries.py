import database_common


@database_common.connection_handler
def get_user(cursor, username):
    cursor.execute("SELECT id, username, password FROM users WHERE username = %s", (username,))
    return cursor.fetchone()


@database_common.connection_handler
def get_all_username(cursor):
    cursor.execute("SELECT username FROM users;")
    return cursor.fetchall()


@database_common.connection_handler
def add_user(cursor, list_to_write):
    cursor.execute('''INSERT INTO users (username, password)
        VALUES(%s, %s)''', (list_to_write['username'], list_to_write['password']))


@database_common.connection_handler
def get_boards(cursor, session_id):
    cursor.execute('SELECT * FROM boards WHERE user_id = %s;', (str(session_id), ))
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def create_new_board(cursor, board_title, session_id):
    cursor.execute('''
        INSERT INTO boards (title, user_id) VALUES (%s, %s)
    ''', (board_title, str(session_id)))


@database_common.connection_handler
def create_new_card(cursor, board_id, title):
    cursor.execute('''
        INSERT INTO cards (board_id, status_id, title) VALUES (%s, 1, %s)
    ''', (board_id, title))


@database_common.connection_handler
def edit_card_title(cursor, id, title):
    cursor.execute('UPDATE cards SET title= %s WHERE id= %s', (title, id))


@database_common.connection_handler
def get_cards_by_board_id(cursor, boardId):
    cursor.execute('SELECT * FROM cards WHERE board_id = {};'.format(boardId))
    cardlist = cursor.fetchall()
    return cardlist


@database_common.connection_handler
def update_card_status(cursor, card_id, status_id, board_id):
    cursor.execute(''' 
                        UPDATE cards SET status_id = {}, board_id = {}
                        WHERE id = %s;
    '''.format(status_id, board_id), (card_id,))

