package com.example.travel.Services.Interface;

import com.example.travel.Entities.Review;

import java.util.List;

public interface ReviewService {

    public String addReview(Review review);
    public String updateReview(Review review, Integer id);
    public String deleteReview(Integer id);
    public Review getReview(Integer id);
    public List<Review> getAllReviews();
}
