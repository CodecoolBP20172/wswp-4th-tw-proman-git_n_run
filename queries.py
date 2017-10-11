import database_common


@database_common.connection_handler
def get_user(cursor, username):
    cursor.execute("SELECT id, username, password FROM users WHERE username = %s", (username,))
    return cursor.fetchone()


# getBoards for actual user
