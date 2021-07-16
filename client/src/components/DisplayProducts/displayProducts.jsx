import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DisplayProducts=(props)=>{
    const products = props.products.map((product)=>
            <div>
                <h1>{product.name}</h1>
                <h2>{product.price}</h2>
            </div>
    );

    return(
        <div>
            {products}
        </div>
    )
}

export default DisplayProducts;