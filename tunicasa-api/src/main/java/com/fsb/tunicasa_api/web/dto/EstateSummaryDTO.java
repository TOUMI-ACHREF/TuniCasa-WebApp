package com.fsb.tunicasa_api.web.dto;

import com.fsb.tunicasa_api.dao.entities.Estate;
import com.fsb.tunicasa_api.dao.entities.EstateStatus;

import lombok.Builder;
@Builder
public record EstateSummaryDTO(
                Long id,
                String name,
                String city,
                String imageUrl,
                Double price,
                EstateStatus status) {
    public static EstateSummaryDTO toEstateSummaryDTO(Estate estate) {
        EstateSummaryDTO estateSummaryDTO = EstateSummaryDTO.builder()
                        .id(estate.getId())
                        .name(estate.getName())
                        .city(estate.getCity())
                        .imageUrl(estate.getImageUrl())
                        .price(estate.getPrice())
                        .status(estate.getStatus()).build();
        return estateSummaryDTO; 
    }
}