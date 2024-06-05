<?php namespace DB;

use \PDO;

/**
 * Connect MySQL with PDO - Helper class 
 * 
 * (Use environment variables)
 */
class DBConnection {
  
    private $dbhost ;
    private $dbuser ;
    private $dbpass ;
    private $dbname ;

    public function __construct()
    {
        $this->dbhost = 'db_server';
        $this->dbuser = getenv("MYSQL_USER");
        $this->dbpass = getenv("MYSQL_PASSWORD");
        $this->dbname = getenv("MYSQL_DATABASE");
    }
  

    public function connect() {

        $prepare_conn_str = "mysql:host=$this->dbhost;dbname=$this->dbname";
        $dbConn = new \PDO( $prepare_conn_str, $this->dbuser, $this->dbpass );

        // https://www.php.net/manual/en/pdo.setattribute.php
        $dbConn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

        // return the database connection back
        return $dbConn;
    }
}