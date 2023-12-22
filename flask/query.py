import psycopg2 as ps


class query_helper:
    def __init__(self):
        self.conn = ps.connect(
            host="postgres",
            dbname="studytogether",
            user="studytogether",
            port="5432",
            password="studytogether",
        )
        self.conn.autocommit = True
        self.cur = self.conn.cursor()

    def __del__(self):
        self.cur.close()
        self.conn.close()

    def query(self, q_str: str):
        q_str = q_str.replace("None,", "NULL,")
        q_str = q_str.replace(",None", ",NULL")
        i = 0
        print(f"Query: {q_str}")
        while (
            i < 5
        ):  # try to reconnect 5 time, if the connection between database and app is dropped
            i += 1
            try:
                self.cur.execute(q_str)
                self.conn.commit()
            except ps.OperationalError:
                self.cur.close()
                self.conn.close()
                self.conn = ps.connect(
                    host="postgres",
                    dbname="studytogether",
                    user="studytogether",
                    port="5432",
                    password="studytogether",
                )
                self.conn.autocommit = True
                self.cur = self.conn.cursor()
                continue
            break
        try:
            x = self.cur.fetchall()
            print(f"Result: {x}")
            return x
        except Exception as e:
            print(f"Result: None, Exception: {e}")
            return None
