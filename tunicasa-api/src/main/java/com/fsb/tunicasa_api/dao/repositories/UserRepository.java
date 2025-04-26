package com.fsb.tunicasa_api.dao.repositories;

import java.util.Optional; 
 
import org.springframework.data.jpa.repository.JpaRepository; 
 
import com.fsb.tunicasa_api.dao.entities.User; 
 
public interface UserRepository extends JpaRepository<User, Long> { 
    Optional<User> findByEmail(String email); 
} 
