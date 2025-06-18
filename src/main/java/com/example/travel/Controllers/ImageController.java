package com.example.travel.Controllers;

import com.example.travel.Config.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.net.URLConnection;

@RestController
public class ImageController {

    @Autowired
    private FileStorageService storageService;

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        Resource file = storageService.loadFileAsResource(filename);
        String contentType = URLConnection.guessContentTypeFromName(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .body(file);
    }
}
