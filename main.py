from fastapi import FastAPI, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request

import database as db
from user import User

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse) 
async def home(request: Request):
    """Homepage with a welcome message."""
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/recipes", response_class=HTMLResponse)
async def recipes(request: Request):
    """List all recipes."""
    recipes = db.get_recipies()

    for _ in range(1000): print(f'{recipes = }')
    

    return templates.TemplateResponse(
        "recipes.html",
        {
            "request": request,
            "recipes": recipes['data'],
            "recipe_columns": recipes['columns'],
            "recipe_image_count": 5,
        },
    )


@app.get("/recipe/{id}", response_class=HTMLResponse)
def recipe_detail(request: Request, id: int):
    """Detail page for a single recipe."""
    recipe = db.get_recipe(id)["data"]
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    columns = ["id", "name", "ingredients", "time_to_make"]
    recipe_data = {
        "id": recipe[columns.index("id")],
        "name": recipe[columns.index("name")],
        "ingredients": recipe[columns.index("ingredients")],
        "time_to_make": recipe[columns.index("time_to_make")],
    }

    return templates.TemplateResponse(
        "recipe.html",
        {
            "request": request,
            "recipe": recipe_data,
            "recipe_url": f"/static/recipe_images/{recipe_data['id'] % (5 + 1)}.png",
        },
    )
