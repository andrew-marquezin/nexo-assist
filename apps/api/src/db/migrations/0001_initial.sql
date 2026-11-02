CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('employee', 'analyst')) DEFAULT 'employee'
);

CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  owner_user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('incident', 'request')),
  category TEXT NOT NULL CHECK (category IN ('hardware', 'software', 'access', 'network', 'other')),
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  due_at INTEGER,
  FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS kb_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hardware', 'software', 'access', 'network', 'other')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('agent', 'waiting_analyst', 'analyst', 'closed')) DEFAULT 'agent',
  assigned_analyst_id INTEGER,
  message_count INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_analyst_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

CREATE TABLE IF NOT EXISTS agent_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  understanding TEXT NOT NULL,
  confidence INTEGER NOT NULL,
  reasoning TEXT NOT NULL,
  payload TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (message_id) REFERENCES messages(id)
);
