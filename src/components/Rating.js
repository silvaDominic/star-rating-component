import React, { useEffect, useState } from 'react';
import './Rating.css';

const MAX_RATING = 5;

const FILL_TYPE = {
    EMPTY: 0,
    FILLED: 1,
    HALF_FILLED: 0.5,
}

const Rating = ({value = 0, emptyIcon, halfFilledIcon, filledIcon, steps}) => {
    emptyIcon =  '/icons/stars/empty.svg';
    filledIcon =  '/icons/stars/filled.svg';
    halfFilledIcon =  '/icons/stars/half.svg';

    const [valArr, setValArr] = useState([]);

    useEffect(() => {
        setValArr(createRatingArray(value));
    }, [value]);

    function createRatingArray(rating) {
        const temp = new Array(Math.floor(rating)).fill(1);
        if (rating % 1 > 0) {
            temp.push(0.5);
        }
        for (let i = 0; i < MAX_RATING - Math.ceil(rating); i++) {
            temp.push(0);
        }
        return temp;
    }

    // Utility function to calculate if the mouse event happened on the left side of the target or the right side.
    function isLessThanHalf(event){
        const {target} = event;
        const boundingClientRect = target.getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));
        return mouseAt <= boundingClientRect.width / 2;
    }

    function renderSymbol(ratingVal, index) {
        let iconSrc = undefined;
        switch(ratingVal) {
            case FILL_TYPE.FILLED:
                iconSrc = filledIcon;
                break
            case FILL_TYPE.HALF_FILLED:
                iconSrc = halfFilledIcon;
                break;
            case FILL_TYPE.EMPTY:
                iconSrc = emptyIcon;
                break;
            default:
                break;
        }
        return (
          <img src={iconSrc}
               className="rating-image"
               data-testid="rating-icon"
               alt="Rate"
               key={index}
          />
        )
    }

    return (
      <div
        tabIndex="0"
        className="star-rating"
        data-testid="star-rating-container"
      >
          {
              valArr.map((ratingVal, i) => {
                  return renderSymbol(ratingVal, i);
              })
          }
      </div>
    )
};


export default Rating;
