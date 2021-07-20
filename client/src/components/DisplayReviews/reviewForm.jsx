import React, {useEffect} from 'react';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { values } from 'regenerator-runtime';
import useForm from '../UseForm/useForm';
import axios from 'axios';

const ReviewForm = (props) => {

    const addReview= async ()=>{
        const review = {
            userReview: values.userReview,
            productId: props.productId,
            userId: props.user.id
        }
        let response = await axios.post(`https://localhost:44394/api/reviews`, review);
        console.log(response.data);
        props.getProductReviews(props.productId);
        
    }

    const { values, handleChange, handleSubmit } = useForm(addReview);

    return (
        <div className="reviewForm">
            <form className="review-form" onSubmit={handleSubmit}>
                <label className="review-label">
                    Add Review:
                    <input
                        className="review-bar"
                        type="text"
                        name="userReview"
                        placeholder="Enter your review..."
                        onChange={handleChange}
                        value={values.userReview}
                        required={true}
                    />
                </label>
                <button className="add-review-btn" type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default ReviewForm;