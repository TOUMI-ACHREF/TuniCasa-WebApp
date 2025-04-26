package com.fsb.tunicasa_api.web.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.fsb.tunicasa_api.business.services.EstateService;
import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.web.dto.EstateDTO;
import com.fsb.tunicasa_api.web.dto.EstateSummaryDTO;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
//@CrossOrigin(origins = "http://localhost:4200") //acces par l'application Angular
@RequestMapping("/api/estates")
@PreAuthorize("hasAnyRole('ADMIN','USER')") 
public class EstateController {
    
    private final EstateService estateService;

    public EstateController(EstateService estateService) {
    this.estateService = estateService;
    }

    @GetMapping()
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')") 
    public ResponseEntity<?> getAllEstates() {
        List<EstateSummaryDTO> estates = this.estateService.getAllEstates()
                .stream()
                .map(EstateSummaryDTO::toEstateSummaryDTO)
                // .map(estate->EstateSummaryDTO.toEstateSummaryDTO(estate))
                .collect(Collectors.toList()); 
        return new ResponseEntity<>(estates, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')") 
    public ResponseEntity<?> getEstateById(@PathVariable Long id) {
        EstateDTO estate = EstateDTO.toEstateDTO(this.estateService.getEstateById(id));
        return new ResponseEntity<>(estate, HttpStatus.OK);
    }

    @GetMapping("/suggested")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')") 
    public ResponseEntity<List<EstateDTO>> getSuggestedEstates() {
        List<Estate> estates = estateService.getSuggestedEstates();
        List<EstateDTO> estateDTOs = estates.stream()
                .map(estate -> EstateDTO.toEstateDTO(estate))
                .collect(Collectors.toList());
        
            return ResponseEntity.ok(estateDTOs);
    }

    @GetMapping("/filter")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')") 
    public ResponseEntity<List<EstateDTO>> filterEstates(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String rooms,
            @RequestParam(required = false) String priceMin,
            @RequestParam(required = false) String priceMax,
            @RequestParam(required = false) String city) {
        //return ResponseEntity.ok(estateService.filterEstates(status, type, rooms, city, priceMin, priceMax));
            List<Estate> estates = estateService.filterEstates(status, type, rooms, city, priceMin, priceMax);

            List<EstateDTO> estateDTOs = estates.stream()
                .map(estate -> EstateDTO.toEstateDTO(estate))
                .collect(Collectors.toList());
        
            return ResponseEntity.ok(estateDTOs);
    
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')") 
    public List<Estate> search(@RequestParam String keyword) {
        return estateService.searchEstates(keyword);
    }



    @PostMapping()
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')") 
    public ResponseEntity<?> addEstate(@RequestBody EstateDTO estateDTO) {

        Estate estate = EstateDTO.fromEstateDTO(estateDTO);
        return new ResponseEntity<>(this.estateService.addEstate(estate),
                HttpStatus.CREATED);
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')") 
    public ResponseEntity<?> addEstates(@RequestBody List<EstateDTO> estateDTOs) {
        List<Estate> estates = estateDTOs.stream()
                .map(EstateDTO::fromEstateDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(this.estateService.addEstates(estates),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('UPDATE_PRIVILEGE') and hasRole('ADMIN')") 
    public ResponseEntity<?> updateEstate(@PathVariable Long id, @RequestBody EstateDTO estateDTO) {
        Estate estate = EstateDTO.fromEstateDTO(estateDTO);
        return new ResponseEntity<>(this.estateService.updateEstate(id, estate),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')") 
    public ResponseEntity<?> deleteEstate(@PathVariable Long id) {
        this.estateService.deleteEstate(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/clear")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')") 
    public ResponseEntity<?> clearEstates() {
        this.estateService.clearEstates();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
