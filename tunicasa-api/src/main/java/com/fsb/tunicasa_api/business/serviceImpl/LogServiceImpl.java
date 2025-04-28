package com.fsb.tunicasa_api.business.serviceImpl;

import com.fsb.tunicasa_api.business.services.LogService;
import com.fsb.tunicasa_api.dao.entities.ActivityLog;
import com.fsb.tunicasa_api.dao.repositories.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private ActivityLogRepository repository;

    @Override
    public void logEvent(String eventType, String username, String details) {
        ActivityLog log = new ActivityLog(eventType, username, LocalDateTime.now(), details);
        repository.save(log);
    }

    @Override
    public List<ActivityLog> getLogs() {
        return repository.findAllByOrderByTimestampDesc();
    }
}