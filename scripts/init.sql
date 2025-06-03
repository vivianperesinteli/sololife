CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)    NOT NULL,
  email VARCHAR(100)   NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100)    NOT NULL,
  description TEXT,
  event_date DATE       NOT NULL,
  event_time TIME,
  created_at TIMESTAMP  NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100)    NOT NULL,
  description TEXT,
  task_date DATE        NOT NULL,
  task_time TIME,
  status VARCHAR(20)    NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shopping_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_name VARCHAR(100) NOT NULL,
  quantity INTEGER      NOT NULL DEFAULT 1,
  category VARCHAR(50),
  status VARCHAR(20)    NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP  NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100),
  content TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP  NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS meal_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_date DATE        NOT NULL,
  meal_type VARCHAR(50) NOT NULL,  
  description TEXT,
  created_at TIMESTAMP  NOT NULL DEFAULT NOW()
);