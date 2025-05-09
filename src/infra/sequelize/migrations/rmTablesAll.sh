#!/bin/bash

# npm run migrate-rm-meta-seed

source .env
echo "Dropping tables users and purchases"
psql postgres://$COCKROACH_username:$COCKROACH_password@$COCKROACH_host:$COCKROACH_port/defaultdb << EOF
  drop table if exists purchases;
  drop table if exists users;
  drop table if exists purchase_results;
EOF