package com.fsb.tunicasa_api.business.services;

import java.util.List;

import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.web.dto.ProfileDTO;

public interface ProfileService {
    public List<ProfileDTO> getAllProfiles();
    public User getProfileByIdUser(Long userId);
    public User updateProfile(Long userId, User updatedUser);
    public User updateProfileImage(Long id,String filename);
    public void deleteProfile(Long id);

}

