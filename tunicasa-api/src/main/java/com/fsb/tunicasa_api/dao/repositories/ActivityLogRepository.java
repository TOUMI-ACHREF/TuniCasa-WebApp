package com.fsb.tunicasa_api.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fsb.tunicasa_api.dao.entities.ActivityLog;

import java.util.List;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findAllByOrderByTimestampDesc();
}
