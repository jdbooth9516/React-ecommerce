import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const DisplayProducts=(props)=>{
    
    const products = props.products.map((product, index)=>
        <div onClick={() => {props.setProductId(index); props.setAll(false)}}>
            <Link className="links" to={"/product/" + index}>
            <h1>{product.name}</h1>
            <h2>{product.price}</h2>
            </Link>
        </div>
    );

    return(
        <div>
            {products}
        </div>
    )
}

export default DisplayProducts;