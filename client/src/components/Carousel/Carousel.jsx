import React from "react";
import Slider from 'react-slick';
import './Carousel.css'
import imagen1 from './img/Component5.jpg'
import imagen2 from './img/Component6.png'
import imagen3 from './img/Component7.jpg'

export default function CarouselBook() {

    const images = [
        imagen1,
        imagen2,
        imagen3
    ];

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <div className="carousel">
            {
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            }
            {
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            }

            <Slider {...settings}>
                {images.map(image => (
                    <div key={image}>
                        <img className="imgCarousel" src={image} alt="Imagen"/>
                    </div>
                ))}
            </Slider>
        </div>
    )
}
