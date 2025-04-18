// const express = require('express');
// const routes = express.Router();

// // Define the /cart_items route to handle GET requests





// routes.get('/cart_items', (req, res) => {
//     const {img , name , price } = req.query;

//     res.send(img , name  , price)

//         if(img || name || price){
//             console.log(`this is all items ${img} and name${name} and ${price}`);
//             res.json( name ,  price , img);
//         }else{ 
//             console.log('no itms ');
            
//         }
// }
// )

// module.exports = routes;
// // routes.get('/cart_items', (req, res) => {
// //     try {
// //       const { img, name, price } = req.query;
  
// //       // If any query parameter is missing, respond with an error
// //       if (!img || !name || !price) {
// //         return res.status(400).json({
// //           error: 'Missing required parameters (img, name, price)',
// //         });
// //       }
  
// //       // Log the values (for debugging purposes)
// //       console.log(`Name: ${name}, Price: ${price}, Image: ${img}`);
  
// //       // Send a JSON response back to the client
// //       res.json({
// //         message: "Item added to cart",
// //         item: { img, name, price },
// //       });
// //     } catch (error) {
// //       // Handle any unexpected errors and return a 500 error
// //       console.error('Server Error:', error);
// //       res.status(500).json({
// //         error: 'Internal Server Error',
// //       });
// //     }
// //   });

// // Export the routes to be used in your main app

