package com.fsb.tunicasa_api.web.dto;

import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.dao.enums.Role;

import lombok.Builder;

@Builder
public record ProfileDTO(
        Long id,
        String firstname,
        String lastname,
        String email,
        String phone,
        String imageUrl,
        Role role
) {

    public static ProfileDTO toProfileDTO(User user) {
        return ProfileDTO.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .imageUrl(user.getProfileImage())
                .role(user.getRole())
                .build();
    } 

    public static User fromProfileDTO(ProfileDTO profileDTO) {
        return User.builder()
                .id(profileDTO.id)
                .firstname(profileDTO.firstname)
                .lastname(profileDTO.lastname)
                .email(profileDTO.email)
                .phone(profileDTO.phone)
                .profileImage(profileDTO.imageUrl)
                .role(profileDTO.role)
                .build();
    }

   
}
