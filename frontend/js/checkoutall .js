window.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('selectedItemsIndex')) || [];
    let count_num = 1;
  
    if (items.length > 0) {
      let tableRows = items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td><img src="${item.img}" alt="${item.name}" width="50"></td>
          <td>${count_num}</td>
          <td>₱${item.price}</td>
        </tr>
      `).join('');
  
      let total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
  
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
            ${tableRows}
            <tr>
              <td colspan="3"><strong>Total</strong></td>
              <td><strong>₱${total.toFixed(2)}</strong></td>
            </tr>
          </table>
        </div>
        <button class="btn" id="btn">Place Order</button>
      `;
    } else {
      document.body.innerHTML = "<p>No item selected.</p>";
    }
  });
  