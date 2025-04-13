package com.fsb.tunicasa_api.business.serviceImpl;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.fsb.tunicasa_api.business.services.EstateService;
import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.dao.repositories.EstateRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EstateServiceImpl implements EstateService {
    private final EstateRepository estateRepository;

    public EstateServiceImpl(EstateRepository estateRepository) {
        this.estateRepository = estateRepository;
    }

    // Sort estates by name in ascending alphabetical order
    @Override
    public List<Estate> getAllEstates() {
        return this.estateRepository.findAll(Sort.by(Direction.ASC, "name"));
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
        // Check if the ID or estate is null and throw an IllegalArgumentException ifthey are
        if (id == null || estate == null) {
            throw new IllegalArgumentException("ID or Estate cannot be null");
        }
        // Verify the existence of the estate
        getEstateById(id);
        // Save the updated contact in the repository
        return estateRepository.save(estate);
    }

    @Override
    public void deleteEstate(Long id) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        // Retrieve the contact by ID
        Estate estate = this.getEstateById(id);
        // Delete the contact from the repository by ID
        estateRepository.delete(estate);
    }

    @Override
    public void clearEstates() {
        // Clear all estates from the repository
        estateRepository.deleteAll();
    }

    
}
