from flask import Flask, request, jsonify
import query

app = Flask(__name__)
app.config["SECRET_KEY"] = "studytogether"

qh = query.query_helper()


@app.route("/", methods=["POST", "GET"])
def root():
    if request.method == "POST":
        jsonData = request.get_json()
        print(jsonData)
        return jsonify({"response": "Hello studytogether backend."})
    else:
        return "Hello studytogether backend."


@app.route("/query", methods=["POST"])
def query_flask():
    query_param = request.form["query"]
    return jsonify({"response": qh.query(query_param)})


if __name__ == "__main__":
    from waitress import serve

    print("Flask started to serve.")
    serve(app, host="0.0.0.0", port=80)
