package com.fsb.tunicasa_api.business.services;

import java.util.List;

import com.fsb.tunicasa_api.dao.entities.Favorite;
import com.fsb.tunicasa_api.web.dto.EstateDTO;

public interface FavoriteService {
    public Favorite addFavorite(Long userId, Long estateId);
    public void removeFavorite(Long userId, Long estateId);
    public List<EstateDTO> getFavorites(Long userId);

}
