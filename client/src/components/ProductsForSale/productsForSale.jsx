import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DisplayProductsForSale=(props)=>{
    const products = props.products.filter((product)=> product.userId === props.user.Id );
    if(products.length > 0){
        const productsForSale = products.map((product)=>
            <div>
                <h1>{product.name}</h1>
                <h2>{product.price}</h2>
            </div>
        );
        return(
            <div>
                {productsForSale}
            </div>
        )
    }else{
        return(
            <div>
                <h1>You have 0 products for sale.</h1>
            </div>
        )
    }
}

export default DisplayProductsForSale;