

var count1 = 0;
totalr = document.getElementById("total-price");
fetch("/item_cart")
  .then((response) => response.json())
  .then((data) => {
    form(data);
  })
  .catch((err) => "something wrong");

function form(data) {
  data.forEach((item, index) => {
    section = `
    <div class="menu-items">
      <div class="item">
         <img src="${item.img}" alt="${item.name}">
         <h3>${item.name}</h3>
         <p id="price">PESOS :${item.price}</p>
         <input    data-id="${item.id}"    class='button1' data-index="${index}"type="checkbox">
<button class="remove_btn" data-id="${item.id}">remove</button>
           <button class="checkout">check out</button>`;
    document.getElementById("cart-items").innerHTML += section;
  });





// this function is delete all item

  document.querySelectorAll(".button1").forEach((Element) => {
    Element.addEventListener("click", (e) => {

      const itemId = e.target.dataset.id;
  

      let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  
      if (e.target.checked) {
        if (!selectedItems.includes(itemId)) {
          selectedItems.push(itemId);
        }
      } else {
        selectedItems = selectedItems.filter(id => id !== itemId);
      }
  
      
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  
      console.log("Updated selected items:", selectedItems);
    });
  });
  
  function del() {
    document.getElementById("del").addEventListener("click", () => {
      
      let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  
      if (selectedItems.length > 0) {
        console.log("Items to delete:", selectedItems);
  
  
        selectedItems.forEach(itemId => {
          fetch(`/delete2/${itemId}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => console.log(`Item ${itemId} deleted:`, data))
            .catch(error => console.error("Error deleting item:", error));
  
         
          console.log(`Deleting item ID: ${itemId}`);
        });
  
  
        localStorage.removeItem("selectedItems");
        alert("Selected items have been deleted.");
        location.reload(); 
      } else {
        console.log("No items selected for deletion.");
        alert("No items selected for deletion.");
      }
    });
  }
  

  del();
  document.querySelectorAll(".button1").forEach((Element) => {
    Element.addEventListener("click", (e) => {
      id = e.target.dataset.index;
      var price = data[id].price;
      var name1 = data[id].name;
      if (e.target.checked) {
        count1 += price;
        totalr.innerHTML += `<h4 class="count-box ">total price :  ${count1} : ${name1}</h4>`;
      } else {
        count1 -= price;
      }
    });
  });

  log = document.querySelectorAll(".remove_btn").forEach((Element) => {
    Element.addEventListener("click", (e) => {
      remove1 = e.target.dataset.id;
      display1();
      console.log("Deleting ID:", remove1);
      delete1(remove1);
      
    });
  });
}



// this function is delete one item
function delete1(id) {
  fetch(`/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("https is not oke");
      }
      return response.json();
    })

    .then((data) => {
      if (!data) {
        console.log("data not exis");
      } else {
        console.log("Deleted successfully:", data);
        document.querySelector(`[data-id="${id}"]`).parentElement.remove();
        setTimeout(() => {
          window.location.href = "cart.html";
        }, 1000);
      }
    })
    .catch((err) => console.error("Error deleting:", err));
}

function display1() {
  window.location.reload();
  alert("are you sure to remove this item");
 
}
