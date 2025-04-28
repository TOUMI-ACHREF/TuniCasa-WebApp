package com.fsb.tunicasa_api.web.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsb.tunicasa_api.business.services.ProfileService;
import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.web.dto.ProfileDTO;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> getAllProfiles(Authentication authentication) {
        List<ProfileDTO> profiles = this.profileService.getAllProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> getProfileById(@PathVariable Long id) {
        ProfileDTO profile = ProfileDTO.toProfileDTO(this.profileService.getProfileByIdUser(id));
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    // a user can update and delete his profile
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser, // Changed to User since that's what the service expects
            Authentication authentication) {


        // Update the profile using the service layer
        User updatedProfile = profileService.updateProfile(id, updatedUser);

        // Return the updated user with a 200 OK response
        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<?> deleteProfile(
            @PathVariable Long id,
            Authentication authentication) {

        profileService.deleteProfile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
