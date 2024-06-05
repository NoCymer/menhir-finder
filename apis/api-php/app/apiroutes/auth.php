<?php

require_once __DIR__ . '/../auth/JwtHandler.php';
require_once __DIR__ . '/../db/DBConnection.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


/**
 * Post Login
 */
$app->post('/api/login', function( Request $request, Response $response){
    
    //prepar query to check if user exists
    $sql = "SELECT * FROM users where UPPER(username) = :username and password = :password";
 
    try {
        //connect to DB
        $dbconn = new DB\DBConnection();
        $db = $dbconn->connect();
            
        // https://www.php.net/manual/en/pdo.prepare.php
        $stmt = $db->prepare( $sql );

        // bind each paramenter
        // https://www.php.net/manual/en/pdostatement.bindparam.php
        $username = strtoupper($request->getParsedBody()["email"]);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $request->getParsedBody()["pass"]);

        // query
        $stmt->execute();

        // get found user(s) array (should contain 1 entry)
        $foundusers = $stmt->fetchAll( );

        $db = null; // clear db object

        if (count($foundusers)==1)
        {
            // if 1 user found : retrieve user infos
            $username = $foundusers[0]['username'];

            //create a jwt token
            $jwt = new Auth\JwtHandler();

            //build the token
            $token = $jwt->_jwt_encode_data(
                'Toutatix.iutsd', //issuer (just put a uniq string like this)
                array("username"=>$username) // create an array if all user infos 
            );

            //Response 201 : Login Success + Provide the token
            $response->getBody()->write('{"success":true, "message":"Enjoy your token", "token":"'.$token.'"}');
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        }
        else
        {
            //Response 401 : Invalid Credentials
            $response->getBody()->write('{"success": false, "message": "Invalid Username/Password"}');
            return $response->withHeader('Content-Type', 'application/json')->withStatus(401);
        }
    }
    catch( PDOException $e ) {
        echo $e;
        // response : 500 : PDO Error (DB)
        $response->getBody()->write('{"success": false, "message": "' . $e->getMessage() . '"}');
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);

    }
});

