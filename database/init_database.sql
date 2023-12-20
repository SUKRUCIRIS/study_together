CREATE TABLE "PERSON" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar NOT NULL,
	"surname" varchar NOT NULL,
	"birth_date" timestamp NOT NULL,
	"email" varchar UNIQUE NOT NULL,
	"telephone" varchar NOT NULL,
	"occupation" varchar NOT NULL,
	"graduation_level" varchar NOT NULL,
	"about" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "PERSON_HIGHSCHOOL" (
	"id" SERIAL PRIMARY KEY,
	"person_id" integer NOT NULL,
	"highschool_id" integer NOT NULL,
	"hs_start_date" timestamp NOT NULL,
	"hs_finish_date" timestamp,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "PERSON_COLLEGE" (
	"id" SERIAL PRIMARY KEY,
	"person_id" integer NOT NULL,
	"college_id" integer NOT NULL,
	"cl_start_date" timestamp NOT NULL,
	"cl_finish_date" timestamp,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "HIGHSCHOOL" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar NOT NULL,
	"telephone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"adresse" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "COLLEGE" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar NOT NULL,
	"telephone" varchar NOT NULL,
	"email" varchar NOT NULL,
	"adresse" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "FILE" (
	"id" SERIAL PRIMARY KEY,
	"group_id" integer,
	"name" varchar NOT NULL,
	"data" bytea NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "USER" (
	"id" SERIAL PRIMARY KEY,
	"file_id" integer,
	"person_id" integer NOT NULL,
	"tag" varchar UNIQUE NOT NULL,
	"password" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "GROUP" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer NOT NULL,
	"file_id" integer,
	"name" varchar NOT NULL,
	"about" varchar NOT NULL,
	"taglist" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "USER_GROUP" (
	"id" SERIAL PRIMARY KEY,
	"group_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "TEXT_CHANNEL" (
	"id" SERIAL PRIMARY KEY,
	"group_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "VOICE_CHANNEL" (
	"id" SERIAL PRIMARY KEY,
	"group_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "CONNECTION" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer NOT NULL,
	"connected_user_id" integer NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "MESSAGE" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer NOT NULL,
	"text_channel_id" integer NOT NULL,
	"data" varchar NOT NULL,
	"file_id" integer,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "TEST" (
	"id" SERIAL PRIMARY KEY,
	"group_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "QUESTION" (
	"id" SERIAL PRIMARY KEY,
	"test_id" integer NOT NULL,
	"body" varchar NOT NULL,
	"a" varchar NOT NULL,
	"b" varchar NOT NULL,
	"c" varchar NOT NULL,
	"d" varchar NOT NULL,
	"right" varchar NOT NULL,
	"score" integer NOT NULL,
	"number" integer NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "TEST_USER" (
	"id" SERIAL PRIMARY KEY,
	"test_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"score" integer NOT NULL,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "DIRECT_MESSAGE" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer NOT NULL,
	"connection_id" integer NOT NULL,
	"data" varchar NOT NULL,
	"file_id" integer,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

ALTER TABLE "PERSON_HIGHSCHOOL" ADD FOREIGN KEY ("person_id") REFERENCES "PERSON" ("id");
ALTER TABLE "PERSON_HIGHSCHOOL" ADD FOREIGN KEY ("highschool_id") REFERENCES "HIGHSCHOOL" ("id");

ALTER TABLE "PERSON_COLLEGE" ADD FOREIGN KEY ("person_id") REFERENCES "PERSON" ("id");
ALTER TABLE "PERSON_COLLEGE" ADD FOREIGN KEY ("college_id") REFERENCES "COLLEGE" ("id");

ALTER TABLE "FILE" ADD FOREIGN KEY ("group_id") REFERENCES "GROUP" ("id");

ALTER TABLE "USER" ADD FOREIGN KEY ("file_id") REFERENCES "FILE" ("id");
ALTER TABLE "USER" ADD FOREIGN KEY ("person_id") REFERENCES "PERSON" ("id");

ALTER TABLE "GROUP" ADD FOREIGN KEY ("file_id") REFERENCES "FILE" ("id");

ALTER TABLE "USER_GROUP" ADD FOREIGN KEY ("group_id") REFERENCES "GROUP" ("id");
ALTER TABLE "USER_GROUP" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");

ALTER TABLE "TEXT_CHANNEL" ADD FOREIGN KEY ("group_id") REFERENCES "GROUP" ("id");

ALTER TABLE "VOICE_CHANNEL" ADD FOREIGN KEY ("group_id") REFERENCES "GROUP" ("id");

ALTER TABLE "CONNECTION" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");
ALTER TABLE "CONNECTION" ADD FOREIGN KEY ("connected_user_id") REFERENCES "USER" ("id");

ALTER TABLE "MESSAGE" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");
ALTER TABLE "MESSAGE" ADD FOREIGN KEY ("text_channel_id") REFERENCES "TEXT_CHANNEL" ("id");
ALTER TABLE "MESSAGE" ADD FOREIGN KEY ("file_id") REFERENCES "FILE" ("id");

ALTER TABLE "TEST" ADD FOREIGN KEY ("group_id") REFERENCES "GROUP" ("id");
ALTER TABLE "TEST" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");

ALTER TABLE "QUESTION" ADD FOREIGN KEY ("test_id") REFERENCES "TEST" ("id");

ALTER TABLE "TEST_USER" ADD FOREIGN KEY ("test_id") REFERENCES "TEST" ("id");
ALTER TABLE "TEST_USER" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");

ALTER TABLE "DIRECT_MESSAGE" ADD FOREIGN KEY ("user_id") REFERENCES "USER" ("id");
ALTER TABLE "DIRECT_MESSAGE" ADD FOREIGN KEY ("connection_id") REFERENCES "CONNECTION" ("id");
ALTER TABLE "DIRECT_MESSAGE" ADD FOREIGN KEY ("file_id") REFERENCES "FILE" ("id");

DO $$

DECLARE personid integer;
DECLARE personid2 integer;
DECLARE userid integer;
DECLARE userid2 integer;
DECLARE hsid integer;
DECLARE clid integer;
DECLARE groupid integer;

BEGIN

INSERT INTO "HIGHSCHOOL" ("name","telephone","email","adresse",
"created_date") VALUES ('A Lisesi','212139613','alisesi@lise.com','Cu',
CURRENT_TIMESTAMP) RETURNING "id" INTO hsid;

INSERT INTO "COLLEGE" ("name","telephone","email","adresse",
"created_date") VALUES ('X Üniversitesi','212139513','xuni@uni.com','Cu',
CURRENT_TIMESTAMP) RETURNING "id" INTO clid;

INSERT INTO "PERSON" ("name","surname","birth_date",
"email","telephone","occupation","graduation_level","about",
"created_date") VALUES('ŞÜKRÜ', 'ÇİRİŞ',TO_DATE('2000-02-01','YYYY-MM-DD'),
'sukruciris2000@gmail.com','05370519604','Student','College','Hi',CURRENT_TIMESTAMP) 
RETURNING "id" INTO personid;

INSERT INTO "PERSON_HIGHSCHOOL" ("person_id","highschool_id","hs_start_date","hs_finish_date","created_date")
VALUES (personid,hsid,TO_DATE('2014-02-01','YYYY-MM-DD'),TO_DATE('2018-02-01','YYYY-MM-DD'),CURRENT_TIMESTAMP);

INSERT INTO "PERSON_COLLEGE" ("person_id","college_id","cl_start_date","cl_finish_date","created_date")
VALUES (personid,clid,TO_DATE('2018-02-01','YYYY-MM-DD'),TO_DATE('2024-02-01','YYYY-MM-DD'),CURRENT_TIMESTAMP);

INSERT INTO "USER" ("file_id","person_id","tag","password","created_date")
VALUES(NULL,personid,'$' || personid,'1396',CURRENT_TIMESTAMP) RETURNING "id" INTO userid;

INSERT INTO "PERSON" ("name","surname","birth_date",
"email","telephone","occupation","graduation_level","about",
"created_date") VALUES('Emircan', 'Uzun',TO_DATE('2000-02-01','YYYY-MM-DD'),
'emircanuzun@gmail.com','05370519604','Student','College','Hi',CURRENT_TIMESTAMP) 
RETURNING "id" INTO personid2;

INSERT INTO "PERSON_HIGHSCHOOL" ("person_id","highschool_id","hs_start_date","hs_finish_date","created_date")
VALUES (personid2,hsid,TO_DATE('2014-02-01','YYYY-MM-DD'),TO_DATE('2018-02-01','YYYY-MM-DD'),CURRENT_TIMESTAMP);

INSERT INTO "PERSON_COLLEGE" ("person_id","college_id","cl_start_date","cl_finish_date","created_date")
VALUES (personid2,clid,TO_DATE('2018-02-01','YYYY-MM-DD'),TO_DATE('2024-02-01','YYYY-MM-DD'),CURRENT_TIMESTAMP);

INSERT INTO "USER" ("file_id","person_id","tag","password","created_date")
VALUES(NULL,personid2,'$' || personid2,'1396',CURRENT_TIMESTAMP) RETURNING "id" INTO userid2;

INSERT INTO "CONNECTION" ("user_id","connected_user_id","created_date") VALUES (personid,personid2,CURRENT_TIMESTAMP);

INSERT INTO "CONNECTION" ("user_id","connected_user_id","created_date") VALUES (personid2,personid,CURRENT_TIMESTAMP);

INSERT INTO "GROUP" ("user_id","file_id","name","about","taglist","created_date") 
VALUES (userid,NULL,'Programming Enjoyers','We program','programming,engineering',CURRENT_TIMESTAMP) RETURNING "id" INTO groupid;

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid,CURRENT_TIMESTAMP);

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid2,CURRENT_TIMESTAMP);

INSERT INTO "GROUP" ("user_id","file_id","name","about","taglist","created_date") 
VALUES (userid2,NULL,'Gaming Enjoyers','We game','gaming,lol,ow',CURRENT_TIMESTAMP) RETURNING "id" INTO groupid;

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid,CURRENT_TIMESTAMP);

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid2,CURRENT_TIMESTAMP);

INSERT INTO "GROUP" ("user_id","file_id","name","about","taglist","created_date") 
VALUES (userid,NULL,'MATH GSU CENG 2018','We math','math,linearalgebra,logic',CURRENT_TIMESTAMP) RETURNING "id" INTO groupid;

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid,CURRENT_TIMESTAMP);

INSERT INTO "GROUP" ("user_id","file_id","name","about","taglist","created_date") 
VALUES (userid2,NULL,'PHYSICS GSU CENG 2018','Hi','physics,circuits,quantum',CURRENT_TIMESTAMP) RETURNING "id" INTO groupid;

INSERT INTO "USER_GROUP" ("group_id","user_id","created_date") 
VALUES (groupid,userid2,CURRENT_TIMESTAMP);

END $$;