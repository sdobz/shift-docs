#!/bin/sh
########################################################
# - create a test database if it does not exist.
# if necessary some variables may be passed
# with arguments; db password, path to psql,
# name of the database, db owner... anything else
#-----------------------------------------------------

# sql to check whether given database exist
sql_check="select count(1) from pg_catalog.pg_database where datname = '$CALDAV_DB'"

# sql to create database (add other params as needed)
sql_create="create database $CALDAV_DB;"

# grant the user access
sql_grant="GRANT ALL PRIVILEGES ON DATABASE $CALDAV_DB TO $POSTGRES_USER"

# depending on how PATH is set psql may require a fully qualified path
cmd="psql -t -c \"$sql_check\""

db_exists=`eval $cmd`

echo "About to check existence of db: $CALDAV_DB"
if [ $db_exists -eq 0 ] ; then
  echo "About to create existence of db: $CALDAV_DB"

  # create the database, discard the output
  cmd="psql -t -c \"$sql_create\" > /dev/null 2>&1"
  eval $cmd

  echo "About to grant access to db: $CALDAV_DB for user $POSTGRES_USER"
  cmd="psql -t -c \"$sql_grant\" > /dev/null 2>&1"
  eval $cmd

fi

# exit with success status
exit 0