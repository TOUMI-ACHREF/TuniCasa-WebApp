package com.fsb.tunicasa_api.dao.entities;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType; // e.g., LOGIN, REGISTER
    private String email;
    private LocalDateTime timestamp;
    private String details;

    // Constructors
    public ActivityLog() {}

    public ActivityLog(String eventType, String email, LocalDateTime timestamp, String details) {
        this.eventType = eventType;
        this.email = email;
        this.timestamp = timestamp;
        this.details = details;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public String getUsername() { return email; }
    public void setUsername(String username) { this.email = username; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
