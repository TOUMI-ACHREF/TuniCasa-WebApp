package com.fsb.tunicasa_api.business.services;
import java.util.List;

import com.fsb.tunicasa_api.dao.entities.Estate; 

public interface EstateService {
    public List<Estate> getAllEstates();
    public Estate getEstateById(Long id);
    public List<Estate> getSuggestedEstates();
    public Estate addEstate(Estate estate);
    public List<Estate> addEstates(List<Estate> estates);
    public Estate updateEstate(Long id,Estate estate);
    public void deleteEstate(Long id);
    public void clearEstates();
}
