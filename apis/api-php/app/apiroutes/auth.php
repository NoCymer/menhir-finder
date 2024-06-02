<?php

require_once __DIR__ . '/../auth/JwtHandler.php';
require_once __DIR__ . '/../db/DBConnection.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;


/**
 * Post Login , check and return token or error
 */
$app->post('/api/login', function( Request $request, Response $response){
    try {
        $jwtHandler = new AUTH\JwtHandler();

        //connect to DB
        $dbconn = new DB\DBConnection();
        $db = $dbconn->connect();
            
        $stmt = $db->prepare( "SELECT * FROM users WHERE username=:username AND password=:password");
        $stmt->bindParam("username", $request->getParsedBody()["email"]);
        $stmt->bindParam("password", $request->getParsedBody()["pass"]);

        // query
        $stmt->execute();
        $founduser = $stmt->fetch();

        // Invalid creds
        if($founduser == null) return $response->withStatus(401);

        $username = $founduser["username"];
        $isadmin = $founduser["admin"];

        $response->getBody()->write($jwtHandler->_jwt_encode_data(
            "localhost",
            json_encode([
                "username" => $username,
                "isadmin" => $isadmin
            ])
        ));

        return $response;
    }
    catch(PDOException $e) {
        $response->getBody()->write($e->getMessage());
        return $response->withStatus(401);
    }
});

