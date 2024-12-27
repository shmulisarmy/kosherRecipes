import psycopg2
import json


class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.id: int = 11
        self.available_ingredients = {
            "eggs": 0,
            "pasta": 200,
            "bacon": 100,
            "pepper": 1,
            "parmesan": 50,
            "salt": 10,
            "bread": 10,
            "lemon": 1,
            "avocado": 10,
            "blueberries": 500,
            "strawberries": 500,
            "basil": 100,
            "flour": 2000,
            "yeast": 10,
            "mozzarella": 500,
            "tomato_sauce": 500
        }


    # def add_to_database(self):
    #     conn = psycopg2.connect(user="postgres", password="flithbo3B", host="127.0.0.1", port="5432", database="postgres")
    #     cursor = conn.cursor()
    #     cursor.execute("INSERT INTO users (name, available_ingredients) VALUES (%s, %s)", (self.username, json.dumps(self.available_ingredients)))
    #     conn.commit()
    #     cursor.close()
    #     conn.close()