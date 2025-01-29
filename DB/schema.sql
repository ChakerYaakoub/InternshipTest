-- Companies table
CREATE TABLE companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Tasks table
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMP,
    completed_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending' or 'completed'
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- Task assignments table (for roles)
CREATE TABLE task_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'responsible', 'reviewer', 'follower'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comments table
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Related tasks table (for linking tasks)
CREATE TABLE related_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER NOT NULL,
    related_task_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (related_task_id) REFERENCES tasks(id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_tasks_creator ON tasks(creator_id);
CREATE INDEX idx_assignments_task ON task_assignments(task_id);
CREATE INDEX idx_assignments_user ON task_assignments(user_id);
CREATE INDEX idx_comments_task ON comments(task_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_related_tasks ON related_tasks(task_id, related_task_id); 