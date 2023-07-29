import React from 'react';

function Card({ product }) {
  return (
    <a
      key={product._id}
      href={product.href}
      className="group shadow-lg  bg-white rounded"
    >
      <div className="flex justify-center  aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product.img}
          alt="img"
          className="h-60 w-60 object-fill object-center group-hover:opacity-75 "
        />
      </div>
      <h3 className="mt-4 text-m px-2 pl-4 pb-2">{product.name}</h3>
      <p className="mt-4  px-2  text-gray-500 text-sm pl-4 pb-2 h-[150px] ">
        {product.desc}
      </p>
      <p className="px-2 mt-2 text-lg font-medium text-gray-900 pl-4 pb-2 pt-2">
        {product.price} $
      </p>
    </a>
  );
}

export default Card;

// // <button className="bg-[#db4444] hover:bg-[#B43838] text-white font-bold py-2 px-4 rounded w-full mt-4">
// Order now!
// </button>
