package com.fsb.tunicasa_api.dao.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fsb.tunicasa_api.dao.entities.Estate; 


public interface EstateRepository extends JpaRepository<Estate, Long>{
    public List<Estate> findTop8ByOrderByIdDesc();

    public List<Estate> findByTypeContainingIgnoreCase(String keyword);

    public List<Estate> findByDescriptionContainingIgnoreCase(String keyword);

    public List<Estate> findByNameContainingIgnoreCase(String keyword);

    public List<Estate> findByCityContainingIgnoreCase(String keyword);

    @Query("SELECT f.estate FROM Favorite f WHERE f.user.id = :userId")
    List<Estate> findAllEstatesByUserId(@Param("userId") Long userId);

}
