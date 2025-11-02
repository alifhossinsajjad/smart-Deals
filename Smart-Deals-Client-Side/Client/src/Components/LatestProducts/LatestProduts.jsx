import React, { use } from 'react';
import Product from "../Product/Product"

const LatestProduts = ({latestProductsPromise}) => {

    const products = use(latestProductsPromise);
    console.log(products);

    return (
        <div className='w-10/12 mx-auto'>
            <h2 className='text-5xl text-center my-10 font-bold'>Recent<span className='text-primary'>Products</span></h2>
            <div className='grid xl:lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-center gap-5'>
            {
                products.map(product => <Product key={product._id} product={product}/>)
            }
        </div>
        </div>
    );
};

export default LatestProduts;