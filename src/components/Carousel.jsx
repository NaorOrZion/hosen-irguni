import * as React from 'react';
import "../style/Carousel.css";
import "../style/flickity.css"

function Carousel() {
    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                <div class="swiffy-slider">
                    <ul class="slider-container">
                        <li><img src="https://picsum.photos/200"  /></li>
                        <li><img src="https://picsum.photos/200"  /></li>
                        <li><img src="https://picsum.photos/200"  /></li>
                    </ul>

                    <button type="button" class="slider-nav"></button>
                    <button type="button" class="slider-nav slider-nav-next"></button>

                    <div class="slider-indicators">
                        <button class="active"></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;