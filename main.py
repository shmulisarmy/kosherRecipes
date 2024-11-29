from fastapi import FastAPI, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from fastapi.responses import RedirectResponse

import database as db
from user import User


current_user = None


all_users = [
    User("shmuli", "i like dogs"),
    User("shmuli2", "i like dogs"),
]


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
partials = Jinja2Templates(directory="templates")


@app.get("/") 
async def home(request: Request):
    """Homepage with a welcome message."""
    from database import serve
    return serve()
    return templates.TemplateResponse("home.html", {"request": request})


@app.get("/recipes", response_class=HTMLResponse)
async def recipes(request: Request):
    if current_user is None:
        return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
    """List all recipes."""

    for _ in range(1000): print(f'{recipes = }')
    

    return templates.TemplateResponse(
        "recipes.html",
        {
            "request": request,
            "all_recipes": db.get_recipies(user_id=current_user.id),
            "liked_recipes": db.liked_recipies(user_id=current_user.id),
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



@app.post("/like-recipe/{recipe_id}", response_class=HTMLResponse)
async def like_recipe(request: Request, recipe_id: int):
    """Like a recipe."""
    import time
    time.sleep(1)

    db.add_like(current_user.id, recipe_id)
    return partials.TemplateResponse("like.html", {"request": request, "recipe_id": recipe_id})


@app.post("/unlike-recipe/{recipe_id}", response_class=HTMLResponse)
async def unlike_recipe(request: Request, recipe_id: int):
    import time
    time.sleep(1)
    """Like a recipe."""
    db.remove_like(current_user.id, recipe_id)
    return partials.TemplateResponse("unliked.html", {"request": request, "recipe_id": recipe_id})



@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("auth/login.html", {"request": request})



@app.post("/login", response_class=HTMLResponse)
async def login(request: Request):
    username = (await request.form()).get("username")
    password = (await request.form()).get("password")

    attempted_user = next(
        (user for user in all_users if user.username == username), None
    )
    if not attempted_user:
        return "Invalid username"

    if attempted_user.password != password:
        return "Invalid password"

    global current_user
    current_user = attempted_user

    return RedirectResponse(url="/recipes", status_code=status.HTTP_302_FOUND)
