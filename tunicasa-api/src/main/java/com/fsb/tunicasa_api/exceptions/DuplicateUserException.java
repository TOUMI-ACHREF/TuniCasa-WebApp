package com.fsb.tunicasa_api.exceptions;

public class DuplicateUserException extends Exception { 
    public DuplicateUserException(String message){ 
        super(message); 
    } 
} 
