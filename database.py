import psycopg2 as psycopg2






conn = psycopg2.connect(user="postgres", password="flithbo3B", host="127.0.0.1", port="5432", database="postgres")






def get_recipies():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipies")
    rows = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    cursor.close()
    
    return {"data": rows, "columns": columns}

def generate_query_from_ingredients(ingredients: dict[str, float]):
    """
    Dynamically generate a query from the ingredients object.
    Ensures that if the ingredient exists in a recipe, its value does not exceed the given amount.
    """
    values = []
    conditions = []
    for ingredient, amount in ingredients.items():
        condition = "(ingredients->>'%s')::numeric <= %s OR ingredients->>'%s' IS NULL"
        conditions.append(condition)

        values.append(ingredient)
        values.append(amount)
        values.append(ingredient)
    
    query_conditions = " AND ".join(conditions)
    query = f"SELECT * FROM recipes WHERE {query_conditions};"
    return query



def get_recipe(id: int):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipies WHERE id = %s", (id,))
    row = cursor.fetchone()
    columns = [desc[0] for desc in cursor.description]
    for _ in range(1000): print(f'{row = }')
    
    cursor.close()
    return {"data": row, "columns": columns}



print(get_recipies())




def get_liked_recipes(user_id: int):
    cursor = conn.cursor()
    cursor.execute("select * from recipies where id in (select unnest(liked_recipes) from users where id = %s);", (user_id,))
    rows = cursor.fetchall()
    cursor.close()
    return rows

