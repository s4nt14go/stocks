#!/bin/bash

# npm run migrate-rm-meta-seed

pwd
source .env
echo "Removing migration 901-seed.js from SequelizeMeta"
psql postgres://$COCKROACH_username:$COCKROACH_password@$COCKROACH_host:$COCKROACH_port/defaultdb << EOF
  DELETE FROM "SequelizeMeta"
  WHERE "name"='901-seed.cjs';
EOF