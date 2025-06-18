package com.example.travel.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;  // e.g. "uploads/images" or "./uploads/images"

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resolve your uploads/images folder on disk:
        String absolutePath = Paths.get(uploadDir)
                .toAbsolutePath()
                .toUri()
                .toString();

        registry
                .addResourceHandler("/images/**")
                .addResourceLocations("file:" + absolutePath);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // API endpoints
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4040")
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);

        // Static images
        registry.addMapping("/images/**")
                .allowedOrigins("http://localhost:4040")
                .allowedMethods("GET");
    }
}
