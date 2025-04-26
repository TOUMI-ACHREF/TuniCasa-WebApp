package com.fsb.tunicasa_api.dao.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fsb.tunicasa_api.dao.entities.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserIdAndEstateId(Long userId, Long estateId);

    List<Favorite> findByUserId(Long userId);

}
