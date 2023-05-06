// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// function RecommendedList({ current, allProducts }) {
//   function shuffle(array) {
//     let currentIndex = array.length,
//       temporaryValue,
//       randomIndex;

//     while (0 !== currentIndex) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;

//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }

//     return array;
//   }

//   const products = shuffle(allProducts)
//     .filter((product) => product.id !== current.id)
//     .slice(0, 4);

//   return (
//     <div className="recommended">
//       <h2>Vous aimerez peut-être aussi</h2>
//       <ul className="recommended__list">
//         {products.map((product) => {
//           const { url, altText } = product.images.edges[0].node;
//           const { handle } = product;

//           return (
//             <li key={
//               product.id
//             }>
//               <Link href={`/products/${handle}`} key={product.id}>
//                 <Image width={200} height={200} src={url} alt={altText} />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default RecommendedList;
