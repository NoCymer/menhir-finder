<?php namespace Auth;


use \Firebase\JWT\JWT;



/**
 * Class which implements token coder/decoder using Firebase JWT
 */
class JwtHandler {
    const TOKEN_PASSPHRASE = "iutsd";  // Const used to encode the token 

    protected $jwt_secrect;
    protected $token;
    protected $issuedAt;
    protected $expire;
    protected $jwt;

    /**
     * Class constructor
     */
    public function __construct()
    {
        // set token's issue date (creation date)
        $this->issuedAt = time();
        
        // Token Validity (3600 second = 1hr)
        $this->expire = $this->issuedAt + 3600*24;

        // Set your secret or signature
        $this->jwt_secrect = self::TOKEN_PASSPHRASE;
    }

    /**
     * Method to encode the token using : 
     *   - $iss : issuer string
     *   - $data : data array that you want to encode in the token
     */ 
    public function _jwt_encode_data($iss,$data){

        $this->token = array(
            //Adding the identifier to the token (who issue the token)
            "iss" => $iss,
            "aud" => $iss,
            // Adding the current timestamp to the token, for identifying that when the token was issued.
            "iat" => $this->issuedAt,
            // Token expiration
            "exp" => $this->expire,
            // Payload
            "data"=> $data
        );

        $this->jwt = JWT::encode($this->token, $this->jwt_secrect);
        return $this->jwt;

    }
    
    /**
     * Method to decode the token using : 
     *   - $jwt_token : the token :)

     * Throw Exceptions :
     *   - ExpiredException
     *   - SignatureInvalidException
     *   - BeforeValidException
     *   - DomainException
     *   - UnexpectedValueException

     */ 
    public function _jwt_decode_data($jwt_token){
        try{
            $decode = JWT::decode($jwt_token, $this->jwt_secrect, array('HS256'));
            
            return $decode->data;
        }
        catch(\Firebase\JWT\ExpiredException $e){
            throw $e;
        }
        catch(\Firebase\JWT\SignatureInvalidException $e){
            throw $e;
        }
        catch(\Firebase\JWT\BeforeValidException $e){
            throw $e;
        }
        catch(\DomainException $e){
            throw $e;
        }
        catch(\InvalidArgumentException $e){
            throw $e;
        }
        catch(\UnexpectedValueException $e){
            throw $e;
        }

    }
}