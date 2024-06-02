<?php namespace Auth;

/**
 * Specific Custom Exception to handle UnauthenticatedException (401)
 */
class UnauthenticatedException extends \Exception {};

/**
 * Specific Custom Exception to handle UnauthorizedException (403)
 */
class UnauthorizedException extends \Exception {};