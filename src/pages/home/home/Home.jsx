import React from 'react';
import Banner from '../Banner/Banner';
import Works from './Works';
import Services from '../Services';
import Brand from './Brand';
import Live from '../Live';
import Reviews from '../Reviews';

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
    return (
      <div>
        <Banner></Banner>
        <Works></Works>
        <Services></Services>
        <Brand></Brand>
        <Live></Live>
        <Reviews reviewsPromise={reviewsPromise}></Reviews>
      </div>
    );
};

export default Home;