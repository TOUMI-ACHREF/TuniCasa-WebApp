package com.fsb.tunicasa_api.web.dto;

import java.time.LocalDate;

import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.dao.entities.EstateStatus;


import lombok.Builder;

@Builder
public record EstateDTO(
        Long id,
        String name,
        String type,
        EstateStatus status,
        String description,
        Double price,
        Double surface,
        String city,
        String address,
        String imageUrl,
        Integer rooms,
        Integer bathrooms,
        LocalDate datePosted,
        LocalDate availableFrom,
        String ownerName,
        String contactPhone) {

    public static EstateDTO toEstateDTO(Estate estate) {
        return EstateDTO.builder()
                .id(estate.getId())
                .name(estate.getName())
                .type(estate.getType())
                .status(estate.getStatus())
                .description(estate.getDescription())
                .price(estate.getPrice())
                .surface(estate.getSurface())
                .city(estate.getCity())
                .address(estate.getAddress())
                .imageUrl(estate.getImageUrl())
                .rooms(estate.getRooms())
                .bathrooms(estate.getBathrooms())
                .datePosted(estate.getDatePosted())
                .availableFrom(estate.getAvailableFrom())
                .ownerName(estate.getOwnerName())
                .contactPhone(estate.getContactPhone())
                .build();
    } 

    public static Estate fromEstateDTO(EstateDTO estateDTO) {
        return Estate.builder()
                .id(estateDTO.id)
                .name(estateDTO.name)
                .type(estateDTO.type)
                .status(estateDTO.status)
                .description(estateDTO.description)
                .price(estateDTO.price)
                .surface(estateDTO.surface)
                .city(estateDTO.city)
                .address(estateDTO.address)
                .imageUrl(estateDTO.imageUrl)
                .rooms(estateDTO.rooms)
                .bathrooms(estateDTO.bathrooms)
                .datePosted(estateDTO.datePosted)
                .availableFrom(estateDTO.availableFrom)
                .ownerName(estateDTO.ownerName)
                .contactPhone(estateDTO.contactPhone)
                .build();
    }

}
