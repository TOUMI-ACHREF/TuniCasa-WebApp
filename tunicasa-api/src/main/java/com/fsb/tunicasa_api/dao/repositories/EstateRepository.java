package com.fsb.tunicasa_api.dao.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fsb.tunicasa_api.dao.entities.Estate; 


public interface EstateRepository extends JpaRepository<Estate, Long>{
    public List<Estate> findTop8ByOrderByIdDesc();
}
