#!/bin/bash

# npm run migrate-rm-meta-seed

source .env
echo "Removing all rows from SequelizeMeta"
psql postgres://$COCKROACH_username:$COCKROACH_password@$COCKROACH_host:$COCKROACH_port/defaultdb << EOF
  DELETE FROM "SequelizeMeta"
EOF