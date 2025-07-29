package com.neurograph.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class WebConfig implements WebMvcConfigurer {

    /**
     * Configures Cross-Origin Resource Sharing (CORS) settings for the application.
     * This allows the backend to handle requests from specified frontend origins.
     *
     * @param registry The CorsRegistry used to configure the CORS mappings.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configure CORS settings for endpoints matching "/api/**"
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://frontend:3000", "http://85.215.148.123:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowCredentials(true)
                .allowedHeaders("*");
    }
}