from flask import Flask, jsonify, render_template, send_from_directory
import os

from data import all_recipies

app = Flask(__name__, 
    static_folder='dist/assets',  # Point to the assets directory
    template_folder='dist'        # Point to the dist directory
)

@app.route('/')
def home():
    return "fuck you"
    return render_template('index.html')

@app.route('/api/recipies/all')
def recipies():
    return jsonify(all_recipies)

# Serve assets from the dist/assets directory
@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('dist/assets', path)
