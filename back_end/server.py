from flask import Flask,jsonify,request,send_from_directory,render_template
from database import add_spending
import database
from database import remove_item_by_id
#from flask_cors import CORS
from bson.objectid import ObjectId
import os


app = Flask(__name__, static_folder='/Users/alif/Desktop/catalyst/flask-server/front-end/build')

#Will BREAK everything do not uncomment
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "DELETE"]}})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

""" @app.route('/')
def index():
    return render_template('homepage.html') """

#to retrieve all the spending from the database

@app.route('/list', methods=['GET'])
def get_all_list_route():
    expenses = database.get_all_list()
    for expense in expenses:
        expense['_id'] = str(expense['_id'])
    return jsonify(expenses)

#to add a expenditure to the database

@app.route('/api/add-transaction', methods=['POST'])
def add_spending_route():
    """
    Flask route to handle adding a new spending.
    Expects the spending data to be sent as JSON in the request body.
    """
    if not request.is_json:
        return jsonify({"message": "Missing JSON in request"}), 400
    data = request.json
    if not all(key in data for key in ["amount", "category", "description"]):
        return jsonify({"message": "Missing required fields"}), 400

    result = add_spending(data)
    if "id" in result:
        return jsonify(result), 201
    else:
        return jsonify({"message": "Failed to add data."}), 500


 #to remove expenditure from the database

@app.route('/api/list/<item_id>', methods=['DELETE'])
def delete_spending_route(item_id):
    try:
        deleted_count = remove_item_by_id(ObjectId(item_id))
        if deleted_count:
            return jsonify({"message": "Data deleted successfully!"}), 200
        else:
            return jsonify({"message": "Failed to delete data."}), 404
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

 #to call and display the different categories in a dropdown menu

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = ["Eat_Out", "Utilities", "Groceries", "Departmental", "Miscellaneous"]
    return jsonify(categories)

 

if __name__ == "__main__":
    app.run(debug=True)
