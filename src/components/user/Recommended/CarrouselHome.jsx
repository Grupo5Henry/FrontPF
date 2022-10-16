import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import s from "./carrouselHome.module.css"

export default function CarrouselHome() {
  var {products} = useSelector(state => state)
  return (
    <>
    <div className={s.chico}>
        <CarouselProvider
            naturalSlideWidth={500}
            naturalSlideHeight={200}
            totalSlides={10}
            infinite
            isIntrinsicHeight
            visibleSlides={1.25}
            interval={3000}
            isPlaying
          >
                  <ButtonBack>Back</ButtonBack>
                  <ButtonNext>Next</ButtonNext>
            <div style={{height:"300px",border:"solid red 1px"}}>
                <Slider>
                    {
                      products.map((p,i) => {
                        return (
                          <Slide index={i} key={i}>
                                <div>
                                  <h1>{p.name}</h1>
                                  <img style={{outline:"solid 1px yellow",height:"200px"}} src={p.thumbnail} alt={p.name} />

                                </div>
                          </Slide>
                        )
                      })
                    }
                  </Slider>
                </div>   
          </CarouselProvider>
    </div>

    <div className={s.grande}>
        <CarouselProvider
        naturalSlideWidth={500}
        naturalSlideHeight={200}
        totalSlides={10}
        infinite
        isIntrinsicHeight
        step={2}
        visibleSlides={2.25}
        interval={3000}
        isPlaying
        >
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        <div>
          <Slider>
              {
                products.map((p,i) => {
                  return (
                    <Slide index={i} key={i}>
                      <div style={{outline:"solid 2px blue",margin:"5px"}}>
                        <h1>{p.name}</h1>
                        <img style={{outline:"solid 1px yellow",height:"200px"}} src={p.thumbnail} alt={p.name} />

                      </div>
                    </Slide>
                  )
                })
              }
          </Slider>
        </div>
    </CarouselProvider>
    </div>
    </>
   
    );
}
