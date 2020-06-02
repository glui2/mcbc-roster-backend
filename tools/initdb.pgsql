-- Drops user table
DROP TABLE IF EXISTS user;

-- Creates user table
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , first_name varchar(50) NOT NULL
    , last_name varchar(50) NOT NULL
    , email_address varchar(50) NOT NULL 
    , mobile_number int NOT NULL
);