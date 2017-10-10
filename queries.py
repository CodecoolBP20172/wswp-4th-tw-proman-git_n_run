import database_common


@database_common.connection_handler
def get_boards(cursor):
    cursor.execute('''
                                SELECT * FROM boards;
    ''')
    boards = cursor.fetchall()
    return boards