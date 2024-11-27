class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.available_ingredients = {
            "eggs": 2,
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