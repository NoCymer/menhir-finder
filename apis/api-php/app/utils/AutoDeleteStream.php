<?php

use GuzzleHttp\Psr7\Stream;
use Psr\Http\Message\StreamInterface;

/**
 * Special Implementation of File Stream which automatically delete src file after destruct (after Download)
 */
class AutoDeleteStream extends Stream implements StreamInterface
{
    private $filepath = NULL;

    
    /**
    * @param resource $body
    */
    public function __construct($body, $filepath)
    {
        parent::__construct($body);
        $this->filepath = $filepath;
    }


    /**
     * Creates a new PSR-7 stream.
     *
     * @param string|resource|StreamInterface $body
     *
     * @throws \InvalidArgumentException
     */
    public static function createFromFilePath($filepath): StreamInterface
    {

        $body = fopen($filepath, 'rb') ;

        if ($body instanceof StreamInterface) {
            return $body;
        }

        if (\is_string($body)) {
            if (200000 <= \strlen($body)) {
                $body = self::openZvalStream($body);
            } else {
                $resource = \fopen('php://memory', 'r+');
                \fwrite($resource, $body);
                \fseek($resource, 0);
                $body = $resource;
            }
        }

        if (!\is_resource($body)) {
            throw new \InvalidArgumentException('First argument to Stream::create() must be a string, resource or StreamInterface');
        }

        return new self($body, $filepath);
    }



    /**
     * Closes the stream when the destructed.
     */
    public function __destruct()
    {
        parent::__destruct();
        unlink($this->filepath);
    }
}