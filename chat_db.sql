CREATE TABLE conversations (
    id serial PRIMARY KEY
);

CREATE TABLE conversations_to_users (
    id serial PRIMARY KEY ,
    conversation_id int REFERENCES conversations(id) NOT NULL ,
    user_id int REFERENCES users(id) NOT NULL ,
    favourite boolean DEFAULT false,
    blocked boolean DEFAULT false,
    UNIQUE (conversation_id, user_id)
);

CREATE TABLE messages (
    id serial PRIMARY KEY ,
    body text NOT NUll,
    conversation_to_user_id int REFERENCES conversations_to_users(id) NOT NULL
);

CREATE TABLE catalogs (
    id serial PRIMARY KEY ,
    user_id int REFERENCES users(id) NOT NULL ,
    catalog_name varchar(250) NOT NULL
);

CREATE TABLE conversations_to_catalogs (
    id serial PRIMARY KEY ,
    catalog_id int REFERENCES catalogs(id) NOT NULL ,
    conversation_id int REFERENCES conversations(id) NOT NULL,
    UNIQUE (conversation_id, catalog_id)
);

