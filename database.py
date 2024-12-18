import psycopg2






conn = psycopg2.connect(user="postgres", password="flithbo3B", host="127.0.0.1", port="5432", database="postgres")


conn2 = psycopg2.connect(
    "postgresql://neondb_owner:IQp4d1ZwzbVm@ep-falling-bird-a8mn4yxu.eastus2.azure.neon.tech/neondb?sslmode=require"
)



def serve():
    cursor = conn2.cursor()



    cursor.execute("select * from users where id between 10 and 20")

    rows = cursor.fetchall()


    return rows





def get_recipies(user_id: int):
    cursor = conn.cursor()
    cursor.execute("select recipies.*, case when recipies.id = any (users.liked_recipes) then 1 else 0 end as is_liked from recipies join users on users.id  = %s;", (user_id,))
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    cursor.close()
    
    return {"data": rows, "columns": columns}

print(get_recipies(1))


def liked_recipies(user_id: int):
    cursor = conn.cursor()
    cursor.execute("select *, 1 as is_liked from recipies where id in (select unnest(liked_recipes) from users where id = %s)", (user_id,))
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    cursor.close()
    
    return {"data": rows, "columns": columns}



def makeable_recipes(ingredients: dict[str, float]):


    """
    Dynamically generate a query from the ingredients object.
    Ensures that if the ingredient exists in a recipe, its value does not exceed the given amount.
    """
    values = []
    conditions = []
    for ingredient, amount in ingredients.items():
        condition = "(ingredients->>%s)::numeric <= %s OR ingredients->>%s IS NULL"
        conditions.append(condition)

        values.append(ingredient)
        values.append(amount)
        values.append(ingredient)
    
    query_conditions = " AND ".join(conditions)
    query = f"SELECT ingredients FROM recipies WHERE {query_conditions};"


    cursor = conn.cursor()
    cursor.execute(query, values)
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    cursor.close()
    
    return {"data": rows, "columns": columns}


def pop_in_the_oven():
    cursor = conn.cursor()
    cursor.execute("SELECT * from recipies order by time_to_make limit 10;")
    rows = cursor.fetchall()
    cursor.close()
    return {"data": rows, "columns": [desc[0] for desc in cursor.description]}




def get_recipe(id: int):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipies WHERE id = %s", (id,))
    row = cursor.fetchone()
    columns = [desc[0] for desc in cursor.description]
    
    cursor.close()
    return {"data": row, "columns": columns}







def get_liked_recipes(user_id: int):
    cursor = conn.cursor()
    cursor.execute("select * from recipies where id in (select unnest(liked_recipes) from users where id = %s);", (user_id,))
    rows = cursor.fetchall()
    cursor.close()
    return rows



def add_like(user_id: int, recipe_id: int):
    cursor = conn.cursor()
    cursor.execute("update users set liked_recipes = array_append(liked_recipes, %s) where id = %s;", (recipe_id, user_id))
    conn.commit()
    cursor.close()


def find_similar_taste_users(user_id: int):
    query = """WITH common_likes AS (
    SELECT user_2.id,
           array_length(array(select unnest(user_1.liked_recipes)
                              intersect
                              select unnest(user_2.liked_recipes)), 1) AS common_liked_recipes_count
    FROM users user_1
    JOIN users user_2
        ON user_1.id != user_2.id
    WHERE user_1.id = %s
    )
    SELECT id
    FROM common_likes
    ORDER BY COALESCE(common_liked_recipes_count, 0) DESC
    LIMIT 10;"""

    cursor = conn.cursor()
    cursor.execute(query, (user_id,))
    rows = cursor.fetchall()
    cursor.close()
    return {"data": rows, "columns": [desc[0] for desc in cursor.description]}

def remove_like(user_id: int, recipe_id: int):
    cursor = conn.cursor()
    cursor.execute("update users set liked_recipes = array_remove(liked_recipes, %s) where id = %s;", (recipe_id, user_id))
    conn.commit()
    cursor.close()

