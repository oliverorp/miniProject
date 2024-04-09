"""Renders index page on server startup"""

import flask
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    """Initial Render"""
    return flask.render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
