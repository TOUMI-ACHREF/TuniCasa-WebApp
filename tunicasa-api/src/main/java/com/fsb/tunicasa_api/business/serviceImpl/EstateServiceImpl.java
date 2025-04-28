package com.fsb.tunicasa_api.business.serviceImpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.fsb.tunicasa_api.business.services.EstateService;
import com.fsb.tunicasa_api.business.services.FilesStorageService;
import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.dao.repositories.EstateRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class EstateServiceImpl implements EstateService {
    private final EstateRepository estateRepository;
    private final FilesStorageService filesStorageService;

    public EstateServiceImpl(EstateRepository estateRepository, FilesStorageService filesStorageService) {
        this.estateRepository = estateRepository;
        this.filesStorageService = filesStorageService;
    }

    // Sort estates by name in ascending alphabetical order
    @Override
    public List<Estate> getAllEstates() {
        return this.estateRepository.findAll(Sort.by(Direction.ASC, "id"));
    }

    @Override
    public Estate getEstateById(Long id) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        // Retrieve the estate by ID, throw an EntityNotFoundException if not found
        return this.estateRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact with id: " + id +
                        " not found"));
    }

    @Override
    public List<Estate> getSuggestedEstates() {
        // Retrieve the top 8 estates ordered by ID in descending order
        return this.estateRepository.findTop8ByOrderByIdDesc();
    }

    @Override
    public Estate addEstate(Estate estate) {
        // Check if the estate is null and throw an IllegalArgumentException if it is
        if (estate == null) {
            throw new IllegalArgumentException("Estate cannot be null");
        }
        // Save the estate in the repository
        return estateRepository.save(estate);
    }

    @Override
    public List<Estate> addEstates(List<Estate> estates) {
        if (estates == null) {
            throw new IllegalArgumentException("Estates cannot be null");
        }
        return estateRepository.saveAll(estates);
    }

    @Override
    public Estate updateEstate(Long id, Estate estate) {
        // Check if the ID or estate is null and throw an IllegalArgumentException
        // ifthey are
        if (id == null || estate == null) {
            throw new IllegalArgumentException("ID or Estate cannot be null");
        }
        // Verify the existence of the estate
        getEstateById(id);
        // Save the updated contact in the repository
        return estateRepository.save(estate);
    }

    @Override
    @Transactional
    // the deleteContact method executes all its operations (checking for the contact,deleting the file,
    // and deleting the contact record) within a single transaction.If any part of
    // thisprocess fails,
            // the entire transaction will be rolled back, maintaining data consistency and
            //integrity.
    public void deleteEstate(Long id) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        try{
            // Retrieve the contact by ID
            Estate estate = this.getEstateById(id);
            String filename = estate.getImageUrl();
            if (filename != null){
                filesStorageService.delete(filename);
            }
            // Delete the contact from the repository by ID
            estateRepository.delete(estate);
        }catch(DataAccessException e){
            throw new RuntimeException("Failed to delete Estate with id: "+id,e);
        }
        
    }

    @Override
    public void clearEstates() {
        // Clear all estates from the repository
        estateRepository.deleteAll();
    }

    // Filter estates based on the provided criteria
    @Override
    public List<Estate> filterEstates(String status, String type, String rooms, String city, String priceMin,
            String priceMax) {
        List<Estate> filteredEstates;
        try {
            filteredEstates = getAllEstates().stream()
                    .filter(status != null && status != "" ? estate -> estate.getStatus().toString().equals(status)
                            : estate -> true)
                    .filter(type != null && type != "" ? estate -> estate.getType().toString().equals(type)
                            : estate -> true)
                    .filter(rooms != null && rooms != "" ? estate -> estate.getRooms().toString().equals(rooms)
                            : estate -> true)
                    .filter(city != null && city != "" ? estate -> estate.getCity().equals(city) : estate -> true)
                    .filter(priceMax != null && priceMax!=""
                            ? estate -> estate.getPrice() <= Double.parseDouble(priceMax.trim())
                            : estate -> true)
                    .filter(priceMin != null && priceMin!=""
                            ? estate -> estate.getPrice() >= Double.parseDouble(priceMin.trim())
                            : estate -> true)
                    .toList();

        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number format for price or rooms " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while filtering estates", e);
        }

        return filteredEstates;
    }

    public List<Estate> searchEstates(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return Collections.emptyList();
        }

        List<Estate> byTitle = estateRepository.findByNameContainingIgnoreCase(keyword);
        List<Estate> byDescription = estateRepository.findByDescriptionContainingIgnoreCase(keyword);
        List<Estate> byType = estateRepository.findByTypeContainingIgnoreCase(keyword);
        List<Estate> byCity = estateRepository.findByCityContainingIgnoreCase(keyword);

        // A l'aide du methode equals et hashcode et avec hashset le contenu de list
        // sont des elts distinct
        Set<Estate> result = new HashSet<>();
        result.addAll(byTitle);
        result.addAll(byDescription);
        result.addAll(byType);
        result.addAll(byCity);

        return new ArrayList<>(result);
    }

    @Override
    public Estate updateEstateImage(Long id, String filename) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }

        // Retrieve the contact by ID, throw an EntityNotFoundException if the contact
        // is not found
        Estate Estate = getEstateById(id);
        // Check if the contact already has an image
        if (Estate.getImageUrl() == null || Estate.getImageUrl().isEmpty()) {
            // If the contact does not have an image, set the new image
            Estate.setImageUrl(filename);
        } else {
            // If the contact already has an image, delete the old image
            this.filesStorageService.delete(Estate.getImageUrl());
            // Set the new image
            Estate.setImageUrl(filename);
        }
        // Save and return the updated contact in the repository
        return estateRepository.save(Estate);
    }

}
