// fetch("http://localhost:3000/item_cart")

fetch("/item_cart")
  .then((res) => res.json())
  .then((data) => {
    renderCartItems(data);
  })
  .catch((err) => console.error("Fetch error:", err));

function renderCartItems(data){

  
  let result = [];
  // console.log('reder data' ,result);
  

  

  data.forEach((item) => {
    const existing = result.find( (i) => i.name === item.name && i.price === item.price && i.img === item.img
    );
    if (existing) {
      existing.quantity++;
      existing.totalPrice += item.price;
      existing.ids.push(item.id); 
    } else {
      result.push({ ...item,    quantity: 1,  totalPrice: item.price, ids: [item.id],});
    }
  });

  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  result.forEach((item, index) => {
    const section = `
      <div class="menu-items">
        <div class="item">
          <img src="${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>Total price: ₱${item.totalPrice}</p>
          <p>Quantity: ${item.quantity}</p>
          <input class="button1" data-index="${index}" data-ids='${JSON.stringify(
      item.ids
    )}'type="checkbox">
          <button class="remove_btn" data-ids='${JSON.stringify(
            item.ids
          )}'>Remove</button>
          <button class="checkoutOne" data-index="${index}">Check out</button>
        </div>
      </div>
    `;
    cartContainer.innerHTML += section;
  });

  attachEventListeners(result);
  chechBx(result);
}

// mag sesenden ng item mula sa cart
function chechBx(result) {
  var btnCk = document.querySelectorAll(".button1");
  let allItem = JSON.parse(localStorage.getItem("selectedItemsIndex")) || [];

  console.log(allItem);
  
  
  btnCk.forEach((element) => {
    element.addEventListener("click", (e) => {
      var index1 = e.target.dataset.index;
      var index1 = e.target.dataset.index;
      const value1 = { 
        name : result[index1]. name,
        quantity : result[index1].quantity,
        price: result[index1].totalPrice,
        img: result[index1].img,      
        id: result[index1].id          
      };
      if (e.target.checked) {
        allItem.push(value1);
      } else {
        localStorage.removeItem('selectedItemsIndex')
        allItem = allItem.filter((item) => item.id !== value1.id);
      }
      localStorage.setItem("selectedItemsIndex", JSON.stringify(allItem)); // Diretso ang pag-save sa localStorage
    });
  });
}

// para mas sure lagay natin function para acess yong mga data galing sa chechBx na func
// chechout

  var checkoutall_items = document.getElementById("checkoutall_items");
  checkoutall_items.addEventListener("click", () => {
    window.location.href = "/checkout2";
  });


function attachEventListeners(groupedData) {
  // Remove na button (delete grouped na lahat ng na item)
  document.querySelectorAll(".remove_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ids = JSON.parse(e.target.dataset.ids);
      if (confirm("Are you sure to delete all quantities of this item?")) {
        ids.forEach((id) => {

          fetch(`/delete/${id}`, { method: "DELETE" })
          // fetch(`http://localhost:3000/delete/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => console.log(`Deleted id: ${id}`))
            .catch((err) => console.error("Delete error:", err));
        });
        localStorage.removeItem('selectedItemsIndex')
        // localStorage.removeItem("selectedItems");
        // localStorage.removeItem("selectedItemsIndex");
        setTimeout(() => location.reload(), 1000);
      }
    });
  });

  // Delete all selected items
  document.getElementById("del").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".button1:checked");
    let allIdsToDelete = [];

    checkboxes.forEach((cb) => {
      const ids = JSON.parse(cb.dataset.ids);
      allIdsToDelete.push(...ids);
    });

    if (allIdsToDelete.length > 0) {
      if (confirm("Delete all selected items?")) {
        allIdsToDelete.forEach((id) => {
          
          fetch(`/delete2/${id}`, { method: "DELETE" })
          // fetch(`http://localhost:3000/delete2/${id}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => console.log(`Deleted id: ${id}`))
            .catch((err) => console.error("Error deleting:", err));
        });
        localStorage.removeItem("selectedItems");
        localStorage.removeItem("selectedItemsIndex");
        setTimeout(() => location.reload(), 1000);
      }
    } else {
      alert("No items selected for deletion.");
    }
  });
}
