package com.fsb.tunicasa_api.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsb.tunicasa_api.business.services.FavoriteService;
import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.web.dto.EstateDTO;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Add a favorite
    @PostMapping("/{estateId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> addFavorite(@PathVariable Long estateId, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(favoriteService.addFavorite(userId, estateId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Remove a favorite
    @DeleteMapping("/{estateId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> removeFavorite(@PathVariable Long estateId, @RequestParam Long userId) {
        try {
            favoriteService.removeFavorite(userId, estateId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get all favorites for a user
    @GetMapping("/user/{userId}")
    //@PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<List<EstateDTO>> getFavorites(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getFavorites(userId));
    }
}
