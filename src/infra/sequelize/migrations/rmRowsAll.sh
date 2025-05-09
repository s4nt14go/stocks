#!/bin/bash

# npm run migrate-rm-meta-seed

source .env
echo "Removing all rows from users and purchases tables"
psql postgres://$COCKROACH_username:$COCKROACH_password@$COCKROACH_host:$COCKROACH_port/defaultdb << EOF
  DELETE FROM users;
  DELETE FROM purchases;
  DELETE FROM purchase_results;
EOF