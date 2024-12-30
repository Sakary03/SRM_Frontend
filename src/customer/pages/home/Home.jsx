import React from 'react'
import Navbar from '../../navbar/Navbar'
import Carousel from './carousel/Carousel'
import './home.css'
import Footer from '../../footer/Footer'
export default function Home() {
    return (
        <div>
            <Navbar />
            <div class="carousel-container">
                <div class="carousel mx-auto">
                    <Carousel />
                </div>
            </div>
            <Footer />
        </div>
    )
}
