<?php

require_once __DIR__ . '/../db/DBConnection.php';

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\UploadedFileInterface as UploadFile;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;

/**
 *  Post Image and Make a guess ('Asterix' or 'Obelix') :
**/
$app->post('/api/guesses', function (Request $request, Response $response) {
    $supportedMediaTypes = ["image/jpeg", "image/jpg", "image/png"];

    //retrieve upload directory from config ==> $directory
    $directory = '/data/';

    //get files from multipart request
    $files = $request->getUploadedFiles();

    // get 'guessimage' uploaded file (if field doesn't exist ==> status http 400)
    //test if uploadedFile error === UPLOAD_ERR_OK (everything OK)
    if ($files["guessimage"] != null) {

        //test media type == 'image/jpeg' or 'image/jpg' or 'image/png'
        if (array_search($files["guessimage"]->getClientMediaType(), $supportedMediaTypes))
        {
            //generate guess id = time in MilliSeconds (use microtime function)
            $guessId = floor(microtime(true) * 1000);
            //generate current date
            $date = date("");

            //write image locally 

            // - change filename from 'xxxx.ext' to <guess_id>.ext
            // - move file into $directory folder (see below)
            $file = $files["guessimage"];
            $ext = explode("/", $file->getClientMediaType())[1];
            $filePath = $directory.$guessId.".".$ext;
            $file->moveTo($filePath);

            //call node api for prediction :
            //- use GuzzleHttp\Client class : https://odan.github.io/slim4-skeleton/http-client.html / https://docs.guzzlephp.org/en/stable/psr7.html#requests
            //- node js api url : 'http://node:3000/api/' 
            //- upload file into a multipart body parameter
            //- store nodejs api response into $response2
            $client = new GuzzleHttp\Client([
                // Base URI is used with relative requests
                'base_uri' => 'http://node:3000/api/'
            ]);

            $response2 = $client->request('POST', 'guesses', [
                'multipart' => [
                    [
                        'name'     => 'guessimage',
                        'contents' => Psr7\Utils::tryFopen($filePath, 'r')
                    ]
                ]
            ]);

            $requestStatus = $response2->getStatusCode();
            //check $response2 status code == 201 or 200
            if ($requestStatus == 201 || $requestStatus == 200)
            {
                //PROCESS IA ANSWER : 
                //- decode ia answer (use json_decode php function)
                $answer = json_decode($response2->getBody()->getContents(), true)["guess"];

                //- store answer in database (use DBConnection - see tests route in index.php) into table 'guesses' (check already created table 'guesses' in the database)
                //- catch PDO exception and if error, return suitable json response with status 500 
                try {
                    //connect to DB
                    $dbconn = new DB\DBConnection();
                    $db = $dbconn->connect();
                        
                    $stmt = $db->prepare( "INSERT INTO guesses (id, imagepath, guess) VALUES (:id, :imagepath, :guess)");
                    $stmt->bindParam("id", $guessId);
                    $stmt->bindParam("imagepath", $filePath);
                    $stmt->bindParam("guess", $answer);

                    // query
                    $stmt->execute();

                    //return suitable json response with status 201 (CREATED)
                    $response->getBody()->write(json_encode([
                        "id" => $guessId,
                        "date" => $date,
                        "imagepath" => $filePath,
                        "guess" => $answer,
                    ]));
                    return $response->withStatus(201);
                }
                catch(PDOException $e) {
                    $response->getBody()->write($e->getMessage());
                    return $response->withStatus(500);
                }

            }
            else{
                //return suitable json response with status 500 
                $response->getBody()->write('{
                    "success": false,
                    "message": "Internal server error"
                }');
                return $response->withStatus(500);
            }

        }
        else{
            //return suitable json response with status 415 (unsupported Media Type) 
            $response->getBody()->write('{
                "success": false,
                "message": "Unsupported Media Type : Image must be \'jpg / jpeg / png\'"
            }');
            return $response->withStatus(415);
        }
        
    }
    else{
        //return suitable json response with status 400 (Bad Request)
        $response->getBody()->write('{
            "success": false,
            "message": "Bad Request : Missing \'guessimage\' formdata field
        }');
        return $response->withStatus(400);
    }
});





/**
 * Put Guess Feedback (if AI Win or Not)
**/
$app->put('/api/guesses/{guessid}', function (Request $request, Response $response) {
    // retrieve path param : guessid
    /*TODO*/

    //connect to DB and check guess already exists or not (by guessid)
    /*TODO*/

    //If guesse not exist ==> return suitable json response with status code 404 (not found)
    //Else : 
    //- retrieve the body parameter 'win' if exists (else return suitable json response with code 400)
    //- update the row in table 'guesses' in DB
    //- return suitable json answer counting total feedbacked guesses and  number of winned guesses - with the code 200
    //- catch PDO exception and if error,  return suitable json response with status 500 
    /*TODO*/
    
    
    return $response;
});
