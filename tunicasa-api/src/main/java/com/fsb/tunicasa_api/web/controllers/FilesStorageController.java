package com.fsb.tunicasa_api.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fsb.tunicasa_api.business.services.EstateService;
import com.fsb.tunicasa_api.business.services.FilesStorageService;
import com.fsb.tunicasa_api.business.services.ProfileService;
import com.fsb.tunicasa_api.web.dto.ResponseMessage;

@Controller
@RequestMapping("/api/storage")
public class FilesStorageController {
    @Autowired
    FilesStorageService storageService;
    @Autowired
    EstateService estateService;
    @Autowired
    ProfileService profileService;
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("/upload/{id}")
    public ResponseEntity<ResponseMessage> uploadFile(@PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        String message = "";
        System.out.println("!---request recieved successfully-1");

        try {
            System.out.println("!---request recieved successfully-2");
            String filename = storageService.save(file);
            System.out.println("!---filename: "+filename);
            // update contact
            this.estateService.updateEstateImage(id, filename);
            System.out.println("!---estate successfully updated");
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " +
                    e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping("/upload/user/{id}")
    public ResponseEntity<ResponseMessage> uploadUserFile(@PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        String message = "";
        System.out.println("!---request recieved successfully-1");

        try {
            System.out.println("!---request recieved successfully-2");
            String filename = storageService.save(file);
            System.out.println("!---filename: "+filename);
            // update contact
            this.profileService.updateProfileImage(id, filename);
            System.out.println("!---user image successfully updated");
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " +
                    e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/files/{filename:.+}")
    // The ".+" pattern in @PathVariable captures the full filename, including
    // extensions.
    @ResponseBody
    public ResponseEntity<?> getFile(@PathVariable String filename) {
        String message = "";
        try {
            Resource file = storageService.load(filename);
            return ResponseEntity.ok().body(file);
        } catch (Exception e) {
            message = "Could not get the file: " + filename;
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
        }
    }
}
