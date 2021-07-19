import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DisplayProductReviews=(props)=>{
    if(props.productReviews.length > 0){
        const reviews = props.productReviews.map((review)=>
            <div>
                <div>
                    <p>User {review.userId} review:</p>
                </div>
                <div>
                    <h2>{review.userReview}</h2>
                </div>
            </div>
        );
        return(
            <div>
                {reviews}
            </div>
        );
    }else{
        return(
            <div>
                <h1>This product has no reviews.</h1>
            </div>
        )
    }
}

export default DisplayProductReviews;