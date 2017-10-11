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
def get_cards_by_board_id(cursor, boardId):
    cursor.execute(''' 
                        SELECT * FROM cards WHERE board_id = {};
    '''.format(boardId))
    cardlist = cursor.fetchall()
    return cardlist