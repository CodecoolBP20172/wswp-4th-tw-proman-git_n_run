import database_common


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute('''
                        SELECT * FROM boards;
    ''')
    boards = cursor.fetchall()
    return boards


@database_common.connection_handler
def create_new_board(cursor, board_title):
    cursor.execute('''
        INSERT INTO boards (title, user_id) VALUES (%s, 0)
    ''', (board_title,))

@database_common.connection_handler
def create_new_card(cursor, board_id, title):
    cursor.execute('''
        INSERT INTO cards (board_id, status_id, title) VALUES (%s, 1, %s)
    ''', (board_id, title))

@database_common.connection_handler
def edit_card_title(cursor, id, title):
    cursor.execute('''
        UPDATE cards 
        SET title= %s 
        WHERE id= %s
    ''', (title, id))


@database_common.connection_handler
def get_cards_by_board_id(cursor, boardId):
    cursor.execute(''' 
                        SELECT * FROM cards WHERE board_id = {};
    '''.format(boardId))
    cardlist = cursor.fetchall()
    return cardlist