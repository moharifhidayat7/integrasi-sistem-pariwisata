import { Options } from '@splidejs/splide'
import React, { ReactNode, ReactNodeArray } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import Image from 'next/image'
export default class ThumbnailsExample extends React.Component {
  /**
   * The main Splide component.
   */
  mainRef = React.createRef()

  /**
   * The thumbnail Splide component.
   */
  thumbsRef = React.createRef()

  /**
   * Set the sync target right after the component is mounted.
   */
  componentDidMount() {
    if (
      this.mainRef.current &&
      this.thumbsRef.current &&
      this.thumbsRef.current.splide
    ) {
      this.mainRef.current.sync(this.thumbsRef.current.splide)
    }
  }

  /**
   * Render slides.
   *
   * @return Slide nodes.
   */
  renderSlides() {
    return this.props.images.map((slide) => (
      <SplideSlide className='rounded overflow-hidden' key={slide.src}>
        <Image
          src={slide.src}
          alt={slide.alt}
          className='rounded p-3'
          layout='fill'
          objectFit='contain'
        />
      </SplideSlide>
    ))
  }
  renderSlides2() {
    return this.props.images.map((slide) => (
      <SplideSlide className='rounded overflow-hidden' key={slide.src}>
        <Image
          src={slide.src}
          alt={slide.alt}
          layout='fill'
          objectFit='cover'
        />
      </SplideSlide>
    ))
  }

  /**
   * Render the component.
   *
   * @return A React node.
   */
  render() {
    const mainOptions = {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      gap: '1rem',
      pagination: false,
      height: '25rem',
    }

    const thumbsOptions = {
      type: 'slide',
      perPage: 4,
      rewind: true,
      arrows: false,
      gap: '1rem',
      pagination: false,
      fixedHeight: 80,
      cover: true,
      isNavigation: true,
      breakpoints: {
        576: {
          perPage: 2,
        },
        768: {
          perPage: 2,
        },
        992: {
          perPage: 2,
        },
        1200: {
          perPage: 4,
        },
        1400: {
          perPage: 4,
        },
      },
    }

    return (
      <div className='wrapper'>
        <Splide className='border' options={mainOptions} ref={this.mainRef}>
          {this.renderSlides()}
        </Splide>

        <Splide className='mt-3' options={thumbsOptions} ref={this.thumbsRef}>
          {this.renderSlides2()}
        </Splide>
      </div>
    )
  }
}
