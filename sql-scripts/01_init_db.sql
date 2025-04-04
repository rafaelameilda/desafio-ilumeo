CREATE SCHEMA IF NOT EXISTS inside;

CREATE TABLE IF NOT EXISTS inside.users_surveys_responses_aux (
    id SERIAL PRIMARY KEY,
    origin TEXT,
    response_status_id INT
);
