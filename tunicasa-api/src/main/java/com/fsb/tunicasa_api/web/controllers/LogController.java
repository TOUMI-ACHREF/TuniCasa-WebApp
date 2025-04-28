package com.fsb.tunicasa_api.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fsb.tunicasa_api.business.services.LogService;
import com.fsb.tunicasa_api.dao.entities.ActivityLog;

@RestController
@RequestMapping("/api/logs")
public class LogController {
    @Autowired
    private LogService logService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")

    public List<ActivityLog> getLogs() {
        return logService.getLogs();
    }
}