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
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (list_to_write['username'], list_to_write['password']))




# getBoards for actual user
