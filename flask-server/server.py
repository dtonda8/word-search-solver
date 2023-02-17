from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
@app.route('/index', methods=["GET", "POST"])
def index():
    if request.method == "POST":
        jsonData = request.get_json()
        print(jsonData)
        return {
            'response' : 'I am the response'
        }
    return {'index': 'hello'}


if __name__ == '__main__':
    app.run(debug=True)