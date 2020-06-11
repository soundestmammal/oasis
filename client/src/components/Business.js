import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import "../styles/business.css";

const ReturnComponent = (props) => {

    function renderCategories() {
        let returnMe = "";
        for(let i = 0; i < props.rest.categories.length; i++) {
            if(i+1 === props.rest.categories.length) {
                returnMe = returnMe + props.rest.categories[i].title;
            } else {
                returnMe = returnMe + props.rest.categories[i].title + ", ";
            }
        }
        return returnMe;
    }

    console.log(props);
    return(
        <div>
        <div className="business-photos">
            {props.rest.photos.map(pic => <img src={pic} alt="restaurant" className="individual-photo" ></img>)}
            <img src={props.rest.photos[0]} alt="restaurant" className="individual-photo" ></img>
        </div>
        <div className="business-content">
            <div className="business-left">
                <div className="business-title">{props.rest.name}</div>
                <div>
                    <span className="business-price">{props.rest.price}</span>
                    <span className="middle">-</span>
                    <span className="business-categories">{renderCategories()}</span>
                </div>
                <div className="business-interaction">
                    <Link><div className="business-button" style={{background: 'red', color: 'white'}}>Write a Review</div></Link>
                    <Link><div className="business-button">Add Photo</div></Link>
                    <Link><div className="business-button">Share</div></Link>
                    <Link><div className="business-button">Save</div></Link>
                </div>
                <div className="covid-update">
                    <h2>COVID-19 Update: Business operations may be affected</h2>
                    <p>Due to ongoing precautionary measures, please contact the business directly for updated hours and availability</p>
                </div>

                <div className="business-review">
                    <h2>Review Highlights</h2>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                    <div className="business-review-card">
                        <img className="business-review-image" src="https://images.unsplash.com/photo-1516641396056-0ce60a85d49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80" alt="review experience" />
                        <p>	
                            “From pour overs to nitro cold brew to kombucha to even masala chai they seem to have nailed just about anything your caffeine craving heart could desire"</p>
                    </div>
                </div>

                <div className="business-location">
                    <h2>Location & Hours</h2>
                    <div className="business-location-information">
                        <div className="business-minimap">Put a minimap here</div>
                        <div className="business-hours-container">
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                            <span><strong>Mon</strong> 7:00 am - 7:00 pm</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

const Business = (props) => {
    let myComponent;
    console.log(props.rest);
    console.log(props.rest !== null);
    if(props.rest != null) {
        myComponent = <ReturnComponent rest={props.rest}/>
    } else {
        myComponent = <Loading />
    }

    return(
        <div className="business-container">
            {myComponent}
        </div>
    );
}

export default Business;