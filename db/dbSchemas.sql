DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account (
	account_id INTEGER PRIMARY KEY AUTOINCREMENT,
	email VARCHAR(254) NOT NULL,
	last_login DATETIME, 
	firstname VARCHAR(150),
	lastname VARCHAR(150),
	user_password VARCHAR(128) NOT NULL,
	is_superuser BOOLEAN NOT NULL,
	date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS user_profile;
CREATE TABLE user_profile (
	user_id INTEGER PRIMARY KEY,
	picture BLOB,
	nickname VARCHAR(60),
	bio VARCHAR(300),
	birthday VARCHAR(10) UNIQUE,
    
    CONSTRAINT accounts_fk
		FOREIGN KEY(user_id)
		REFERENCES user_account(account_id)
	
);


DROP TABLE IF EXISTS habits;
CREATE TABLE daily_habit_user (
	daily_habit_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_habit_id INTEGER,
	day_date DATE, 
	completed BOOLEAN DEFAULT 0,

	CONSTRAINT user_fk
		FOREIGN KEY(user_habit_id)
			REFERENCES user_habit(user_habit_id) ON DELETE CASCADE
	
);

DROP TABLE IF EXISTS user_habit;
CREATE TABLE user_habit (
	user_habit_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER,
	habit_name VARCHAR(30) NOT NULL,
	goal INTEGER NOT NULL,
	quantity INTEGER NOT NULL,
	frequency INTEGER, 
	initial_date DATE NOT NULL,
	end_date DATE NOT NULL,
	CONSTRAINT user_fk
		FOREIGN KEY(user_id)
			REFERENCES user_profile(user_id) ON DELETE CASCADE
		
);



INSERT INTO user_account (email, firstname, lastname, user_password, is_superuser) VALUES (
	'allanstocco@hotmail.com', 'Allan', 'Stocco', '123456', '1'
);

INSERT INTO user_profile (user_id, nickname, bio, birthday) VALUES (
	1, 'Buuh', "I'm really cool", "13/06/1990"
);


INSERT INTO  habits (habit_name, goal, quantity, frequency) VALUES (
	'Water', 5, 0, 3
);

INSERT INTO  user_habit (user_id, habits_id, initial_date, end_date) VALUES (
	1, 1, '2022-07-18', '2022-07-25'
);

SELECT
  initial_date,
  end_date,
  JULIANDAY(end_date) - JULIANDAY(initial_date) AS INTEGER
FROM user_habit;


INSERT INTO habits (user_id, habit_name, goal, quantity, frequency) VALUES (
	1,WATER,8,0,3
)


SELECT user_account.firstname, habit_name, goal, quantity, frequency, daily_habit_user.day_date, daily_habit_user.completed FROM user_account, user_habit INNER JOIN daily_habit_user ON user_habit.user_id = daily_habit_user.user_habit_id;


### QUERY EXACLY THE PERSON HABITS DAYS
select firstname, user_habit.habit_name, user_habit.goal, daily_habit_user.day_date, daily_habit_user.completed from user_account inner join user_habit ON user_account.account_id = user_habit.user_id INNER JOIN daily_habit_user ON user_habit.user_habit_id = daily_habit_user.user_habit_id WHERE user_habit.user_habit_id = 10;
