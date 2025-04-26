package com.fsb.tunicasa_api.business.serviceImpl;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fsb.tunicasa_api.business.services.ProfileService;
import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.dao.repositories.UserRepository;
import com.fsb.tunicasa_api.web.dto.ProfileDTO;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService   {
    private final UserRepository userRepository;

    @Override
    public List<ProfileDTO> getAllProfiles() {
        
        // Retrieve the Profile by ID, throw an EntityNotFoundException if not found
        return this.userRepository.findAll()
                .stream()
                .map(ProfileDTO::toProfileDTO)
                .toList();
                
    }

    @Override
    public User getProfileByIdUser(Long userId) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (userId == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        // Retrieve the Profile by ID, throw an EntityNotFoundException if not found
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Profile of User with id: " +userId +
                        " not found"));
    }

    @Override
    public User updateProfile(Long userId, User updatedUser) {
        
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        
        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setPhone(updatedUser.getPhone());
        
        return userRepository.save(existingUser);
    }
    
    public void deleteProfile(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateProfileImage(Long id, String filename) {
        // TODO Auto-generated method stub
        return null;
    }

    

    

}
