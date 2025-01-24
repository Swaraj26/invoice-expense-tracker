from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/transaction', methods=['POST'])
def add_transaction():
    data = request.json
    # Process data here
    return jsonify({"message": "Transaction added", "data": data}), 200

if __name__ == '__main__':
    app.run(debug=True)
