package com.example.travel.Controllers;

import com.example.travel.Entities.Review;
import com.example.travel.Services.Interface.ReviewService;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@RestController
@RequestMapping("/api/reviews")
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(reviewService.getReview(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@Validated @RequestBody Review review) {
        String result = reviewService.addReview(review);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message","success");
        }
        else{
            response.put("message","failed");
        }
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReview(@PathVariable("id") Integer id, @RequestBody Review review) {
        String result = reviewService.updateReview(review,id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message","success");
        }
        else{
            response.put("message","failed");
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable("id") Integer id) {
        String result = reviewService.deleteReview(id);
        Map<String,String> response = new HashMap<>();
        if(result.equals("success")){
            response.put("message","success");
        }
        else{
            response.put("message","failed");
        }
        return ResponseEntity.ok(response);
    }
}
