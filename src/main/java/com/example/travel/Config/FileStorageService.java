package com.example.travel.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path rootLocation;

    @Autowired
    public FileStorageService(FileStorageProperties props) {
        this.rootLocation = Paths.get(props.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    /**
     * Store a MultipartFile on disk and return the relative filename.
     * Returns something like "item-12345.png".
     */
    public String storeFile(MultipartFile file, String fileName) {
        // Normalize file name (remove path components)
        String cleanFileName = Paths.get(fileName).getFileName().toString();

        try {
            if (file.isEmpty()) {
                throw new IOException("Failed to store empty file " + cleanFileName);
            }
            Path targetLocation = this.rootLocation.resolve(cleanFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return cleanFileName;
        } catch (IOException e) {
            throw new RuntimeException("Could not store file " + cleanFileName, e);
        }
    }

    /**
     * Load as a Resource .
     */
    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.rootLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }
            throw new RuntimeException("File not found " + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found " + fileName, e);
        }
    }

    /**
     * Delete file (optional).
     */
    public void deleteFile(String fileName) {
        try {
            Path filePath = this.rootLocation.resolve(fileName).normalize();
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file " + fileName, e);
        }
    }
}
