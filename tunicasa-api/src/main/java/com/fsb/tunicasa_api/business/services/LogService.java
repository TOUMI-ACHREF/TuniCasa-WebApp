package com.fsb.tunicasa_api.business.services;

import java.util.List;


import com.fsb.tunicasa_api.dao.entities.ActivityLog;


public interface LogService {
    void logEvent(String eventType, String username, String details);
    List<ActivityLog> getLogs();
}