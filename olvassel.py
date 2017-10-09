




#                                      !!!!!!!!!!!!!

#                  NEVEZZ ÁT 'config.py'-RA ÍGY A GITIGNORE NEM LÁTJA EZT
#                 VALAMINT ÍRD BE A USERNEVEDET ÉS A JELSZAVADAT A TÁBLÁBA









# This file is version controlled.
# After pulling it, you have to copy and create your 'config.py' out of it.


class Config:
    DB_NAME = "proman"
    DB_USER = ""
    DB_HOST = "localhost"
    DB_PWD = ""
    # example for postgre: "dbname='" + DB_NAME + "' user='" + DB_USER + "' host='" + DB_HOST + "' password='" + DB_PWD + "'"
    DB_CONNECTION_STR = "dbname='" + DB_NAME + "' user='" + DB_USER + "' host='" + DB_HOST + "' password='" + DB_PWD + "'"