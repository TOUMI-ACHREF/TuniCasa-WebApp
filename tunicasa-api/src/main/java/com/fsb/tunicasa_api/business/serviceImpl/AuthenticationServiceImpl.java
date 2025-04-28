package com.fsb.tunicasa_api.business.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fsb.tunicasa_api.business.services.AuthenticationService;
import com.fsb.tunicasa_api.business.services.LogService;
import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.dao.repositories.UserRepository;
import com.fsb.tunicasa_api.exceptions.DuplicateUserException;
import com.fsb.tunicasa_api.web.dto.AuthenticationUserDTO; 
 
 
@Service 
public class AuthenticationServiceImpl implements AuthenticationService { 
 
    // Repository to handle User entity persistence 
    private final UserRepository userRepository; 
    @Autowired
    private LogService logService;
 
    // Constructor injection for UserRepository 
    public AuthenticationServiceImpl(UserRepository userRepository) { 
        this.userRepository = userRepository; 
    } 
 
    @Override 
    public User register(User user) throws DuplicateUserException { 
        if (user == null) { 
            return null; 
        } 
        try { 
            // Save the user in the repository 
            User registerUser = userRepository.save(user); 
            //adding action to logs
            logService.logEvent("Inscription", user.getEmail(), "nouveau Utilisateur a été inscri");

            return registerUser; 

        } catch (DataIntegrityViolationException e) { 
            // Handle uniqueness constraint violations 
            throw new DuplicateUserException("User already exists"); 
        } 
    } 
 
    @Override 
    public AuthenticationUserDTO login(Authentication authentication) { 
        // Retrieve the user principal from the authentication object after basic authentication 
        User user = (User) authentication.getPrincipal(); 
        // Convert the User entity to AuthenticationUserDTO and return it 
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        logService.logEvent("Connexion", user.getEmail(), "Utilisateur a été connecter");
        return AuthenticationUserDTO.toAuthenticationUserDTO(user); 
    } 
}