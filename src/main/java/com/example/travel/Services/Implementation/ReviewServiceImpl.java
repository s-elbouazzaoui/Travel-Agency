package com.example.travel.Services.Implementation;

import com.example.travel.Entities.Review;
import com.example.travel.Repositories.ReviewRepository;
import com.example.travel.Services.Interface.ReviewService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Transactional
@Service

public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    @Override
    public String addReview(Review review) {
        if(review.getScore()==null||review.getUser().getId()==null||review.getDestination().getId()==null) {
            return "error";
        }
        else{
            reviewRepository.save(review);
            return "success";
        }
    }

    @Override
    public String updateReview(Review review, Integer id) {
        Review oldReview = reviewRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        if(review.getScore()!=null){
            oldReview.setScore(review.getScore());
        }
        if(review.getDescription()!=null){
            oldReview.setDescription(review.getDescription());
        }
        reviewRepository.save(oldReview);
        return "success";
    }

    @Override
    public String deleteReview(Integer id) {
        Review review = reviewRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        reviewRepository.deleteById(id);
        return "success";
    }

    @Override
    public Review getReview(Integer id) {
        Review review = reviewRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("not found"));
        assert review != null;
        return review;
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
