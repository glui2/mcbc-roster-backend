-- Drops user table
DROP TABLE IF EXISTS user;

-- Creates user table
CREATE TABLE IF NOT EXISTS user (
    user_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , first_name varchar(50) NOT NULL
    , last_name varchar(50) NOT NULL
    , email_address varchar(50) NOT NULL 
    , mobile_number int NOT NULL
);

-- Insert default values
INSERT INTO user 
    (id, first_name, last_name, email_address, mobile_number)
VALUES
    ('Gavin', 'Lui', 'gavin.lui@gmail.com', 123456789),
    ('Chris', 'Yeung', 'chrisyeung@gmail.com', 123456789),
    ('Dragon', 'Poon', 'dragonPoon@gmail.com', 123456789),
