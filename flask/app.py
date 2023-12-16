from flask import Flask, request, jsonify
import query

app = Flask(__name__)
app.config["SECRET_KEY"] = "studytogether"

qh = query.query_helper()


@app.route("/", methods=["POST", "GET"])
def root_flask():
    return "Hello studytogether backend."


@app.route("/query", methods=["POST"])
def query_flask():
    jsonData = request.get_json()
    query_param = jsonData["query"]
    return jsonify({"list": qh.query(query_param)})


@app.route("/signup", methods=["POST"])
def signup_flask():
    jsonData = request.get_json()
    name = jsonData["name"]
    surname = jsonData["surname"]
    birth_date = jsonData["birth_date"]
    email = jsonData["email"]
    telephone = jsonData["telephone"]
    occupation = jsonData["occupation"]
    graduation_level = jsonData["graduation_level"]
    about = jsonData["about"]
    file_id = jsonData["file_id"]
    password = jsonData["password"]

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
    jsonData = request.get_json()
    name = jsonData["name"]
    telephone = jsonData["telephone"]
    email = jsonData["email"]
    adresse = jsonData["adresse"]
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
    jsonData = request.get_json()
    name = jsonData["name"]
    telephone = jsonData["telephone"]
    email = jsonData["email"]
    adresse = jsonData["adresse"]
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
    jsonData = request.get_json()
    name = jsonData["name"]
    data = jsonData["data"]
    query_str = f"""
	INSERT INTO "FILE" ("name","data","created_date") 
    VALUES ('{name}','{data}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addfilegroup", methods=["POST"])
def addfilegroup_flask():
    jsonData = request.get_json()
    group_id = jsonData["group_id"]
    name = jsonData["name"]
    data = jsonData["data"]
    query_str = f"""
	INSERT INTO "FILE" ("group_id","name","data","created_date") 
    VALUES ({group_id},'{name}','{data}',CURRENT_TIMESTAMP) 
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/signin", methods=["POST"])
def signin_flask():
    jsonData = request.get_json()
    email = jsonData["email"]
    password = jsonData["password"]
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
    jsonData = request.get_json()
    id = jsonData["id"]
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
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "FILE"."group_id", "FILE"."name", "FILE"."data" 
    FROM "FILE" WHERE "FILE"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"group_id": row[0], "name": row[1], "data": row[2]}
    return jsonify(result)


@app.route("/geths", methods=["POST"])
def geths_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "HIGHSCHOOL"."name", "HIGHSCHOOL"."telephone", 
    "HIGHSCHOOL"."email", "HIGHSCHOOL"."adresse"
    FROM "HIGHSCHOOL" WHERE "HIGHSCHOOL"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"name": row[0], "telephone": row[1], "email": row[2], "adresse": row[3]}


@app.route("/getcl", methods=["POST"])
def getcl_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "COLLEGE"."name", "COLLEGE"."telephone", 
    "COLLEGE"."email", "COLLEGE"."adresse"
    FROM "COLLEGE" WHERE "COLLEGE"."id"={id} 
	"""
    row = qh.query(query_str)[0]
    result = {"name": row[0], "telephone": row[1], "email": row[2], "adresse": row[3]}


@app.route("/getconnections", methods=["POST"])
def getconnections_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
    SELECT "CONNECTION"."connected_user_id" FROM "CONNECTION"
    WHERE "CONNECTION"."user_id"={id}
    """
    return jsonify({"list": qh.query(query_str)})


@app.route("/getgroups", methods=["POST"])
def getgroups_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "USER_GROUP"."group_id" FROM "USER_GROUP" WHERE
    "USER_GROUP"."user_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/addhsuser", methods=["POST"])
def addhsuser_flask():
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    highschool_id = jsonData["highschool_id"]
    start_date = jsonData["start_date"]
    finish_date = jsonData["finish_date"]
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
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    college_id = jsonData["college_id"]
    start_date = jsonData["start_date"]
    finish_date = jsonData["finish_date"]
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
    jsonData = request.get_json()
    id = jsonData["id"]
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
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "TEXT_CHANNEL"."id", "TEXT_CHANNEL"."name" FROM 
    "TEXT_CHANNEL" WHERE "TEXT_CHANNEL"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getvoicechannels", methods=["POST"])
def getvoicechannels_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "VOICE_CHANNEL"."id", "VOICE_CHANNEL"."name" FROM 
    "VOICE_CHANNEL" WHERE "VOICE_CHANNEL"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/gettextchannelmessages", methods=["POST"])
def gettextchannelmessages_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "MESSAGE"."user_id", "MESSAGE"."data","MESSAGE"."file_id",
    "MESSAGE"."created_date" FROM "MESSAGE" 
    WHERE "MESSAGE"."text_channel_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getdirectmessages", methods=["POST"])
def getdirectmessages_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "DIRECT_MESSAGE"."user_id", "DIRECT_MESSAGE"."data",
    "DIRECT_MESSAGE"."file_id", "DIRECT_MESSAGE"."created_date" 
    FROM "DIRECT_MESSAGE" 
    WHERE "DIRECT_MESSAGE"."connection_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/addconnection", methods=["POST"])
def addconnection_flask():
    jsonData = request.get_json()
    user_id1 = jsonData["user_id1"]
    user_id2 = jsonData["user_id2"]
    query_str = f"""
	INSERT INTO "CONNECTION" ("user_id","connected_user_id",
    "created_date") VALUES ({user_id1},{user_id2},CURRENT_TIMESTAMP)
    RETURNING "id"
	"""
    qh.query(query_str)
    query_str = f"""
	INSERT INTO "CONNECTION" ("user_id","connected_user_id",
    "created_date") VALUES ({user_id2},{user_id1},CURRENT_TIMESTAMP)
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addusertogroup", methods=["POST"])
def addusertogroup_flask():
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    group_id = jsonData["group_id"]
    query_str = f"""
	INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
    VALUES ({group_id},{user_id},CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addgroupmessage", methods=["POST"])
def addgroupmessage_flask():
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    tc_id = jsonData["tc_id"]
    data = jsonData["data"]
    file_id = jsonData["file_id"]
    query_str = f"""
	INSERT INTO "MESSAGE" ("user_id","text_channel_id","data",
    "file_id","created_date") VALUES ({user_id},{tc_id},'{data}',
    {file_id},CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addconnectionmessage", methods=["POST"])
def addconnectionmessage_flask():
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    connection_id = jsonData["connection_id"]
    data = jsonData["data"]
    file_id = jsonData["file_id"]
    query_str = f"""
	INSERT INTO "DIRECT_MESSAGE" ("user_id","connection_id","data",
    "file_id","created_date") VALUES ({user_id},{connection_id},
    '{data}',{file_id},CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addgroup", methods=["POST"])
def addgroup_flask():
    jsonData = request.get_json()
    user_id = jsonData["user_id"]
    file_id = jsonData["file_id"]
    name = jsonData["name"]
    about = jsonData["about"]
    taglist = jsonData["taglist"]
    query_str = f"""
	INSERT INTO "GROUP" ("user_id","file_id","name","about","taglist",
    "created_date") VALUES ({user_id},{file_id},'{name}','{about}',
    '{taglist}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addtextchannel", methods=["POST"])
def addtextchannel_flask():
    jsonData = request.get_json()
    group_id = jsonData["group_id"]
    name = jsonData["name"]
    query_str = f"""
	INSERT INTO "TEXT_CHANNEL" ("group_id","name","created_date")
    VALUES ({group_id},'{name}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addvoicechannel", methods=["POST"])
def addvoicechannel_flask():
    jsonData = request.get_json()
    group_id = jsonData["group_id"]
    name = jsonData["name"]
    query_str = f"""
	INSERT INTO "VOICE_CHANNEL" ("group_id","name","created_date")
    VALUES ({group_id},'{name}',CURRENT_TIMESTAMP) RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/getgroupfiles", methods=["POST"])
def getgroupfiles_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "FILE"."id" FROM "FILE" WHERE "FILE"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getgroupusers", methods=["POST"])
def getgroupusers_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "USER_GROUP"."user_id" WHERE "USER_GROUP"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getgrouptests", methods=["POST"])
def getgrouptests_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "TEST"."id" FROM "TEST" WHERE "TEST"."group_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/gettest", methods=["POST"])
def gettest_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "TEST"."group_id", "TEST"."user_id", "TEST"."name", 
    "TEST"."created_date" FROM "TEST" WHERE "TEST"."id"={id}
	"""
    row = qh.query(query_str)[0]
    result = {
        "group_id": row[0],
        "user_id": row[1],
        "name": row[2],
        "created_date": row[3],
    }
    return jsonify(result)


@app.route("/addtest", methods=["POST"])
def addtest_flask():
    jsonData = request.get_json()
    group_id = jsonData["group_id"]
    user_id = jsonData["user_id"]
    name = jsonData["name"]
    query_str = f"""
	INSERT INTO "TEST" ("group_id","user_id","name","created_date")
    VALUES({group_id},{user_id},'{name}',CURRENT_TIMESTAMP)
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/gettestquestions", methods=["POST"])
def gettestquestions_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "QUESTION"."id" FROM "QUESTION" WHERE 
    "QUESTION"."test_id"={id}
	"""
    return jsonify({"list": qh.query(query_str)})


@app.route("/getquestion", methods=["POST"])
def getquestion_flask():
    jsonData = request.get_json()
    id = jsonData["id"]
    query_str = f"""
	SELECT "QUESTION"."body", "QUESTION"."a", "QUESTION"."b",
    "QUESTION"."c", "QUESTION"."d", "QUESTION"."right", 
    "QUESTION"."score", "QUESTION"."number"
    FROM "QUESTION" WHERE "QUESTION"."id"={id}
	"""
    row = qh.query(query_str)[0]
    result = {
        "body": row[0],
        "a": row[1],
        "b": row[2],
        "c": row[3],
        "d": row[4],
        "right": row[5],
        "score": row[6],
        "number": row[7],
    }
    return jsonify(result)


@app.route("/addquestion", methods=["POST"])
def addquestion_flask():
    jsonData = request.get_json()
    test_id = jsonData["test_id"]
    body = jsonData["body"]
    a = jsonData["a"]
    b = jsonData["b"]
    c = jsonData["c"]
    d = jsonData["d"]
    right = jsonData["right"]
    score = jsonData["score"]
    number = jsonData["number"]
    query_str = f"""
	INSERT INTO "QUESTION" ("test_id","body","a","b","c","d","right"
    "score","number","created_date") VALUES ({test_id},'{body}','{a}',
    '{b}','{c}','{d}','{right}',{score},{number},CURRENT_TIMESTAMP)
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/addscore", methods=["POST"])
def addscore_flask():
    jsonData = request.get_json()
    test_id = jsonData["test_id"]
    user_id = jsonData["user_id"]
    score = jsonData["score"]
    query_str = f"""
	INSERT INTO "TEST_USER" ("test_id","user_id","score","created_date")
    VALUES ({test_id},{user_id},{score},CURRENT_TIMESTAMP)
    RETURNING "id"
	"""
    id = qh.query(query_str)[0]
    return jsonify({"id": id})


@app.route("/getscores", methods=["POST"])
def getscores_flask():
    jsonData = request.get_json()
    test_id = jsonData["test_id"]
    user_id = jsonData["user_id"]
    query_str = f"""
	SELECT "TEST_USER"."score", "TEST_USER"."created_date" FROM
    "TEST_USER" WHERE "TEST_USER"."test_id"={test_id} AND
    "TEST_USER"."user_id"={user_id}
	"""
    return jsonify({"list": qh.query(query_str)})


if __name__ == "__main__":
    from waitress import serve

    print("Flask started to serve.")
    serve(app, host="0.0.0.0", port=80)
