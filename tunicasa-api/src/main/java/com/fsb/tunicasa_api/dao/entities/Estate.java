package com.fsb.tunicasa_api.dao.entities;

import java.time.LocalDate;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="estates")
public class Estate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    //general information
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EstateStatus status; // FOR_SALE, FOR_RENT, SOLD, etc.

    @Column(nullable = true)
    private String description;
    
    @Column(nullable = false)
    private Double price;
    

    //caracteristics
    @Column(nullable = false)
    private Double surface;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String address;

    @Column(nullable = true)
    private String imageUrl;

    @Column(nullable = true)
    private Integer rooms;

    @Column(nullable = true)
    private Integer bathrooms;


    // Dates
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate datePosted;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate availableFrom;


    //owner
    @Column(nullable = false)
    private String ownerName;

    @Column(nullable = false)
    private String contactPhone;

     @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Estate)) return false;
        Estate estate = (Estate) o;
        return Objects.equals(id, estate.id); // compare par id
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    /*
     @ElementCollection(fetch= FetchType.EAGER)
    @CollectionTable(
        name="projects",
        joinColumns = @JoinColumn(name="contact_id")
        )
    @Column(name="contact_project")
    private List<String> projects;
    @Column(nullable = true)
    private String image;
    @Column(nullable = true)
    private boolean featured;
     */
    

}

