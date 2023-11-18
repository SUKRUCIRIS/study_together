CREATE TABLE "PERSON" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar NOT NULL,
	"surname" varchar NOT NULL,
	"birth_date" timestamp NOT NULL,
	"email" varchar NOT NULL,
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
	"start_date" timestamp NOT NULL,
	"finish_date" timestamp,
	"created_date" timestamp NOT NULL,
	"deleted_date" timestamp
);

CREATE TABLE "PERSON_COLLEGE" (
	"id" SERIAL PRIMARY KEY,
	"person_id" integer NOT NULL,
	"college_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"finish_date" timestamp,
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
	"user_id1" integer NOT NULL,
	"user_id2" integer NOT NULL,
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

ALTER TABLE "CONNECTION" ADD FOREIGN KEY ("user_id1") REFERENCES "USER" ("id");
ALTER TABLE "CONNECTION" ADD FOREIGN KEY ("user_id2") REFERENCES "USER" ("id");

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