-- TASK #9
SELECT users.role, count(users.role) FROM users
GROUP BY role;

-- TASK #10
UPDATE users
SET balance = balance + prizeSum FROM (SELECT users.id as customer_id, users.first_name, sum(c.prize) * 0.1 as prizeSum FROM users
                             JOIN contests AS c ON users.id = c.user_id
                             WHERE users.role='customer' AND (extract('month' from c.created_at) = 12 AND extract('day' from c.created_at) > 25)
                                OR (extract('month' from c.created_at) = 1 AND extract('day' from c.created_at) < 14)
                             GROUP BY users.id, users.first_name) as "newtable"
WHERE users.id = customer_id;

-- TASK #11

UPDATE users
SET balance = balance + 10
FROM (
         SELECT id
         FROM users
         WHERE role = 'creator'
         ORDER BY rating DESC
         LIMIT 3
     ) AS top_creative_users
WHERE users.id = top_creative_users.id;
