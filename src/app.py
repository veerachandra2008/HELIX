from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Veera@2008",
    database="helix"
)

cursor = db.cursor()


def get_identity(data):
    return data.get("username") or data.get("email")


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(silent=True) or {}
    username = get_identity(data)
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "status": "fail",
            "message": "Username/email and password are required"
        }), 400

    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "status": "fail",
            "message": "User already exists. Please sign in."
        }), 409

    cursor.execute(
        "INSERT INTO users (username, password) VALUES (%s, %s)",
        (username, password)
    )
    db.commit()

    return jsonify({
        "status": "success",
        "message": "Signup successful",
        "user": {
            "username": username
        }
    }), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    username = get_identity(data)
    password = data.get("password")

    if not username or not password:
        return jsonify({
            "status": "fail",
            "message": "Username/email and password are required"
        }), 400

    query = "SELECT * FROM users WHERE username=%s AND password=%s"
    cursor.execute(query, (username, password))

    user = cursor.fetchone()

    if user:
        return jsonify({
            "status": "success",
            "message": "Login successful",
            "user": {
                "username": username
            }
        }), 200
    else:
        return jsonify({
            "status": "fail",
            "message": "Invalid username or password"
        }), 401

if __name__ == "__main__":
    app.run(debug=True)
