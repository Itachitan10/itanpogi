window.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(localStorage.getItem("selectedItemsIndex")) || [];

  const contain = [];

  if (items.length > 0) {
    items.forEach((item) => {
      const dis = contain.find(
        (value) =>
          value.name === item.name &&
          value.quantity === item.quantity &&
          value.img === item.img &&
          value.price === item.price &&
          value.id === item.id
      );

      if (dis) {
        dis.quantity += item.quantity;
      } else {
        contain.push({ ...item });
      }
    });
  } else {
    console.log("walang item");
  }

  displayItem(contain);
});

function displayItem(dataItem) {

  console.log(dataItem);
  
  let tableRows = "";
  let total = 0;

  dataItem.forEach((value, index) => {
    const itemTotal = value.price 
    total += itemTotal;

    tableRows += `
      <tr>
        <td>${value.name}</td>
        <td><img src="${value.img}" alt="${value.name}" width="50"></td>
        <td>${value.quantity}</td>
        <td>₱${itemTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById("checkout-container").innerHTML = `
    <h2>Checkout Summary</h2>
    <div class="order-summary">
      <table>
        <tr>
          <th>Item</th>
          <th>Image</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        ${tableRows}
        <tr>
          <td colspan="3"><strong>Total</strong></td>
          <td><strong>₱${total.toFixed(2)}</strong></td>
        </tr>
      </table>
    </div>
    <button class="btn" id="btn">Place Order</button>
  `;
}





// window.addEventListener("DOMContentLoaded", () => {
//   const items = JSON.parse(localStorage.getItem("selectedItemsIndex"));

//     let count_num = 1;

//     if (items.length > 0) {
//       let tableRows = items.map(item => `
//         <tr>
//           <td>${item.name}</td>
//           <td><img src="${item.img}" alt="${item.name}" width="50"></td>
//           <td>${count_num}</td>
//           <td>₱${item.totalPrice}</td>
//         </tr>
//       `).join('');

//       let total = items.reduce((sum, item) => sum + parseFloat(item.total), 0);

//       document.getElementById('checkout-container').innerHTML = `
//         <h2>Checkout Summary</h2>
//         <div class="order-summary">
//           <table>
//             <tr>
//               <th>Item</th>
//               <th>Image</th>
//               <th>Qty</th>
//               <th>Price</th>
//             </tr>
//             ${tableRows}
//             <tr>
//               <td colspan="3"><strong>Total</strong></td>
//               <td><strong>₱${total.toFixed(2)}</strong></td>
//             </tr>
//           </table>
//         </div>
//         <button class="btn" id="btn">Place Order</button>
//       `;
//     } else {
//       document.body.innerHTML = "<p>No item selected.</p>";
//     }
//   });
