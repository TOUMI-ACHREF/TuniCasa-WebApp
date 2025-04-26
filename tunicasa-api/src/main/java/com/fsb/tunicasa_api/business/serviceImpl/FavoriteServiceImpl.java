package com.fsb.tunicasa_api.business.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fsb.tunicasa_api.business.services.FavoriteService;
import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.dao.entities.Favorite;
import com.fsb.tunicasa_api.dao.entities.User;
import com.fsb.tunicasa_api.dao.repositories.EstateRepository;
import com.fsb.tunicasa_api.dao.repositories.FavoriteRepository;
import com.fsb.tunicasa_api.dao.repositories.UserRepository;
import com.fsb.tunicasa_api.web.dto.EstateDTO;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private EstateRepository estateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite addFavorite(Long userId, Long estateId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Estate> estate = estateRepository.findById(estateId);

        if (user.isPresent() && estate.isPresent()) {
            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setEstate(estate.get());
            return favoriteRepository.save(favorite);
        } else {
            throw new IllegalArgumentException("User or Estate not found.");
        }
    }

    public void removeFavorite(Long userId, Long estateId) {
        Optional<Favorite> favorite = favoriteRepository.findByUserIdAndEstateId(userId, estateId);
        
        if (favorite.isPresent()) {
            favoriteRepository.delete(favorite.get());
        } else {
            throw new IllegalArgumentException("Favorite not found.");
        }
    }

    public List<EstateDTO> getFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId).stream()
                .map(Favorite::getEstate)
                .map(EstateDTO::toEstateDTO)
                .collect(Collectors.toList());
    }
}
