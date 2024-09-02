import React, { useEffect, useState } from 'react';
import './Rating.css';

const MAX_RATING = 5;
const EMPTY_RATING = [0,0,0,0,0];

const FILL_TYPE = {
    EMPTY: 0,
    FILLED: 1,
    HALF_FILLED: 0.5,
}

const Rating = ({value = 0, emptyIcon, halfFilledIcon, filledIcon, steps}) => {
    const [valArr, setValArr] = useState([]);
    const [prevValArr, setPrevValArr] = useState([]);

    useEffect(() => {
        setPrevValArr(createRatingArray(value));
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

    function onClick(e, rating) {
        if (isLessThanHalf(e)) {
            rating = rating - 0.5;
        }
        setValArr((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(prevValArr)) {
                setPrevValArr(EMPTY_RATING);
                return EMPTY_RATING;
            }
            setPrevValArr(createRatingArray(rating));
            return createRatingArray(rating);
        });
    }

    function onHover(e, rating) {
        if (isLessThanHalf(e)) {
            rating = rating - 0.5;
        }
        setValArr(createRatingArray(rating));
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
               onMouseEnter={(e) => onHover(e, index + 1)}
               onMouseLeave={() => setValArr(prevValArr)}
               onClick={(e) => onClick(e, index + 1)}
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
