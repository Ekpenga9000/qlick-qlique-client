import React from 'react';
import "./Loading.scss";
import loadingImg from "../../assets/images/loading.gif";

function Loading() {
  return (
      <section className='loading'>
          <img src={ loadingImg } alt="Loading data"  className='loading__img'/>
        </section>
  )
}

export default Loading