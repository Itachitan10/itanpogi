function placeOrder() {
    alert("Order placed! We'll process it now 🧁");
  }  


  window.addEventListener('DOMContentLoaded', () => {
    const item = JSON.parse(localStorage.getItem("selectedItem"));
    console.log(item);
    count_num  = 0
    
    if (item) {
      count_num ++;

      
     
      document.getElementById('checkout-container').innerHTML = `
      <h2>Checkout Summary</h2>
      <div class="order-summary">
        <table>
          <tr>
            <th>Item</th>
            <th>Image</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>${item.name}</td>
            <td><img src="${item.img}" alt="${item.name}" width="50"></td>
            <td>${count_num}</td>
            <td>₱${item.price}</td>
          </tr>
          <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>₱${item.price}</strong></td>
          </tr>
        </table>
      </div>
           <button class="btn" id="deleteItem">delete</button>
      <button class="btn" id="btn">Place Order</button>
    `;


    const del = document.getElementById('deleteItem'); 
    del.addEventListener('click' , ()=>{ 
      window.location.reload()
      localStorage.removeItem('selectedItem')
    })
    
    } else {
      document.body.innerHTML = "<p>No item selected.</p>";
    }
  });

 



