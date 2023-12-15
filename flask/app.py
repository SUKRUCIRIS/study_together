from flask import Flask, request, jsonify
import query

app = Flask(__name__)
app.config["SECRET_KEY"] = "studytogether"

qh = query.query_helper()


@app.route("/", methods=["POST", "GET"])
def root_flask():
    if request.method == "POST":
        jsonData = request.get_json()
        print(jsonData)
        return jsonify({"response": "Hello studytogether backend."})
    else:
        return "Hello studytogether backend."


@app.route("/query", methods=["POST"])
def query_flask():
    query_param = request.form["query"]
    return jsonify({"list": qh.query(query_param)})


@app.route("/signup", methods=["POST"])
def signup_flask():
    name = request.form["name"]
    surname = request.form["surname"]
    birth_date = request.form["birth_date"]
    email = request.form["email"]
    telephone = request.form["telephone"]
    occupation = request.form["occupation"]
    graduation_level = request.form["graduation_level"]
    about = request.form["about"]
    file_id = request.form["file_id"]
    password = request.form["password"]

    person_query = f"""
    INSERT INTO "PERSON" ("name","surname","birth_date",
    "email","telephone","occupation","graduation_level","about",
    "created_date") 
    VALUES('{name}','{surname}','{birth_date}','{email}','{telephone}',
    '{occupation}','{graduation_level}','{about}',CURRENT_TIMESTAMP) 
    RETURNING "id" 
    """
    person_id = qh.query(person_query)[0]

    user_query = f"""
	INSERT INTO "USER" ("file_id","person_id","tag",
    "password","created_date")
    VALUES({file_id},{person_id},'${person_id}',
    '{password}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    user_id = qh.query(user_query)[0]

    return jsonify({"id": user_id})


@app.route("/getallhs", methods=["POST"])
def getallhs_flask():
    query_str = """
	SELECT "HIGHSCHOOL"."id", "HIGHSCHOOL"."name" FROM "HIGHSCHOOL"
    """
    return jsonify({"list": qh.query(query_str)})


@app.route("/getallcl", methods=["POST"])
def getallcl_flask():
    query_str = """
	SELECT "COLLEGE"."id", "COLLEGE"."name" FROM "COLLEGE"
    """
    return jsonify({"list": qh.query(query_str)})


@app.route("/addhs", methods=["POST"])
def addhs_flask():
    name = request.form["name"]
    telephone = request.form["telephone"]
    email = request.form["email"]
    adresse = request.form["adresse"]
    query_str = f"""
	INSERT INTO "HIGHSCHOOL" ("name","telephone","email","adresse",
    "created_date")
    VALUES ('{name}','{telephone}','{email}','{adresse}',
    CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addcl", methods=["POST"])
def addcl_flask():
    name = request.form["name"]
    telephone = request.form["telephone"]
    email = request.form["email"]
    adresse = request.form["adresse"]
    query_str = f"""
	INSERT INTO "COLLEGE" ("name","telephone","email","adresse",
    "created_date")
    VALUES ('{name}','{telephone}','{email}','{adresse}',
    CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addfile", methods=["POST"])
def addfile_flask():
    name = request.form["name"]
    data = request.form["data"]
    query_str = f"""
	INSERT INTO "FILE" ("name","data","created_date") 
    VALUES ('{name}','{data}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addfilegroup", methods=["POST"])
def addfilegroup_flask():
    group_id = request.form["group_id"]
    name = request.form["name"]
    data = request.form["data"]
    query_str = f"""
	INSERT INTO "FILE" ("group_id","name","data","created_date") 
    VALUES ({group_id},'{name}','{data}',CURRENT_TIMESTAMP) 
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/signin", methods=["POST"])
def signin_flask():
    email = request.form["email"]
    password = request.form["password"]
    query_str = f"""
	SELECT "USER"."id" FROM "USER" LEFT JOIN "PERSON"
    ON "USER"."person_id"="PERSON"."id"
    WHERE "PERSON"."email"='{email}' AND 
    "USER"."password"='{password}'
	"""
    try:
        id = qh.query(query_str)[0]
        return jsonify({"id": id})
    except:
        return jsonify({"id": None})


@app.route("/getuser", methods=["POST"])
def getuser_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "PERSON"."name", "PERSON"."surname", "PERSON"."birth_date", 
    "PERSON"."email", "PERSON"."telephone", "PERSON"."occupation",
    "PERSON"."graduation_level", "PERSON"."about", 
    "PERSON_HIGHSCHOOL"."highschool_id", 
    "PERSON_HIGHSCHOOL"."hs_start_date",
    "PERSON_HIGHSCHOOL"."hs_finish_date",
    "PERSON_COLLEGE"."college_id", 
    "PERSON_COLLEGE"."cl_start_date",
    "PERSON_COLLEGE"."cl_finish_date",
    "USER"."file_id", "USER"."tag", "USER"."password" FROM
    "USER" LEFT JOIN "PERSON" ON "USER"."person_id"="PERSON"."id"
    LEFT JOIN  "PERSON_HIGHSCHOOL" 
    ON "PERSON_HIGHSCHOOL"."person_id"="PERSON"."id"
    LEFT JOIN "PERSON_COLLEGE" 
    ON "PERSON_COLLEGE"."person_id"="PERSON"."id"
    WHERE "USER"."id"={id}
	"""
    row = qh.query(query_str)[0]
    result = {
        "name": row[0],
        "surname": row[1],
        "birth_date": row[2],
        "email": row[3],
        "telephone": row[4],
        "occupation": row[5],
        "graduation_level": row[6],
        "about": row[7],
        "highschool_id": row[8],
        "hs_start_date": row[9],
        "hs_finish_date": row[10],
        "college_id": row[11],
        "cl_start_date": row[12],
        "cl_finish_date": row[13],
        "file_id": row[14],
        "tag": row[15],
        "password": row[16],
    }
    return jsonify(result)


@app.route("/getfile", methods=["POST"])
def getfile_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "FILE"."group_id", "FILE"."name", "FILE"."data" 
    FROM "FILE" WHERE "FILE"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"group_id": row[0], "name": row[1], "data": row[2]}
    return jsonify(result)


@app.route("/geths", methods=["POST"])
def geths_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "HIGHSCHOOL"."name", "HIGHSCHOOL"."telephone", 
    "HIGHSCHOOL"."email", "HIGHSCHOOL"."adresse"
    FROM "HIGHSCHOOL" WHERE "HIGHSCHOOL"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"name": row[0], "telephone": row[1], "email": row[2], "adresse": row[3]}


@app.route("/getcl", methods=["POST"])
def getcl_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "COLLEGE"."name", "COLLEGE"."telephone", 
    "COLLEGE"."email", "COLLEGE"."adresse"
    FROM "COLLEGE" WHERE "COLLEGE"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"name": row[0], "telephone": row[1], "email": row[2], "adresse": row[3]}


@app.route("/getconnections", methods=["POST"])
def getconnections_flask():
    id = request.form["id"]
    query_str = f"""
    SELECT "CONNECTION"."connected_user_id" FROM "CONNECTION"
    WHERE "CONNECTION"."user_id"={id}
    """
    return jsonify({"list": qh.query(query_str)})


@app.route("/getgroups", methods=["POST"])
def getgroups_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "USER_GROUP"."group_id" FROM "USER_GROUP" WHERE
    "USER_GROUP"."user_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/addhsuser", methods=["POST"])
def addhsuser_flask():
    user_id = request.form["user_id"]
    highschool_id = request.form["highschool_id"]
    start_date = request.form["start_date"]
    finish_date = request.form["finish_date"]
    query_str = f"""
	SELECT "USER"."person_id" FROM "USER" WHERE
    "USER"."id"={user_id}
	"""
    person_id = qh.query(query_str)[0]
    query_str = f"""
	INSER INTO "PERSON_HIGHSCHOOL" ("person_id","highschool_id",
    "hs_start_date","hs_finish_date","created_date")
    VALUES ({person_id},{highschool_id},'{start_date}','{finish_date}',
    CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addcluser", methods=["POST"])
def addcluser_flask():
    user_id = request.form["user_id"]
    college_id = request.form["college_id"]
    start_date = request.form["start_date"]
    finish_date = request.form["finish_date"]
    query_str = f"""
	SELECT "USER"."person_id" FROM "USER" WHERE
    "USER"."id"={user_id}
	"""
    person_id = qh.query(query_str)[0]
    query_str = f"""
	INSER INTO "PERSON_COLLEGE" ("person_id","college_id",
    "cl_start_date","cl_finish_date","created_date")
    VALUES ({person_id},{college_id},'{start_date}','{finish_date}',
    CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/getgroupinfo", methods=["POST"])
def getgroupinfo_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "GROUP"."user_id", "GROUP"."file_id", "GROUP"."name",
    "GROUP"."about", "GROUP"."taglist" FROM "GROUP" WHERE
    "GROUP"."id"={id}
	"""
    row = qh.query(query_str)[0]
    result = {
        "user_id": row[0],
        "file_id": row[1],
        "name": row[2],
        "about": row[3],
        "taglist": row[4],
    }
    return jsonify(result)


@app.route("/gettextchannels", methods=["POST"])
def gettextchannels_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "TEXT_CHANNEL"."id", "TEXT_CHANNEL"."name" FROM 
    "TEXT_CHANNEL" WHERE "TEXT_CHANNEL"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getvoicechannels", methods=["POST"])
def getvoicechannels_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "VOICE_CHANNEL"."id", "VOICE_CHANNEL"."name" FROM 
    "VOICE_CHANNEL" WHERE "VOICE_CHANNEL"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/gettextchannelmessages", methods=["POST"])
def gettextchannelmessages_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "MESSAGE"."user_id", "MESSAGE"."data","MESSAGE"."file_id",
    "MESSAGE"."created_date" FROM "MESSAGE" 
    WHERE "MESSAGE"."text_channel_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getdirectmessages", methods=["POST"])
def getdirectmessages_flask():
    id = request.form["id"]
    query_str = f"""
	SELECT "DIRECT_MESSAGE"."user_id", "DIRECT_MESSAGE"."data",
    "DIRECT_MESSAGE"."file_id", "DIRECT_MESSAGE"."created_date" 
    FROM "DIRECT_MESSAGE" 
    WHERE "DIRECT_MESSAGE"."connection_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


if __name__ == "__main__":
    from waitress import serve

    print("Flask started to serve.")
    serve(app, host="0.0.0.0", port=80)
