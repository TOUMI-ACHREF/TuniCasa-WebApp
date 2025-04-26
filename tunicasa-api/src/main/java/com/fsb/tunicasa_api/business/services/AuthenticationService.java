package com.fsb.tunicasa_api.business.services;

import org.springframework.security.core.Authentication;

import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.exceptions.DuplicateUserException;
import com.fsb.tunicasa_api.web.dto.AuthenticationUserDTO;

public interface AuthenticationService { 
    User register(User user) throws DuplicateUserException;
    AuthenticationUserDTO login(Authentication authentication); 
}