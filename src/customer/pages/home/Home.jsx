import React from 'react'
import Navbar from '../../navbar/Navbar'
import Carousel from './carousel/Carousel'
import './home.css'
import Footer from '../../footer/Footer'
import { Diversity1 } from '@mui/icons-material'
import Recently from './recently/Recently'
export default function Home() {
    return (
        <div>
            <Navbar />
            <div class="carousel-container">
                <div class="carousel mx-auto">
                    <Carousel />
                </div>
            </div>
            <div class="">
                <Recently />
            </div>
            <Footer />
        </div>
    )
}
