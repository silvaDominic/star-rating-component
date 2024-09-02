import React from 'react';
import './App.css';
import 'h8k-components';
import Rating from "./components/Rating";

const title = "Rating Component";

export const EMPTY_ICON_PATH = '/icons/stars/empty.svg';
export const FILLED_ICON_PATH = '/icons/stars/filled.svg';
export const HALF_FILL_ICON_PATH = '/icons/stars/half.svg';

const App = () => {

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>

            <div className="flex align-items-center justify-content-center container">
                <div className="card pa-16">
                  <Rating
                    value={ 3.5 }
                    emptyIcon={ EMPTY_ICON_PATH }
                    filledIcon={ FILLED_ICON_PATH }
                    halfFilledIcon={ HALF_FILL_ICON_PATH }/>
                </div>
            </div>
        </div>
    );
}

export default App;
