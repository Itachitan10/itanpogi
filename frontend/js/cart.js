

var count1 = 0;
totalr = document.getElementById("total-price");

// diplay cart items
fetch("/item_cart")
// fetch("http://localhost:3000/item_cart")
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
         <input  data-id="${item.id}"    class='button1' data-index="${index}"type="checkbox">
<button class="remove_btn" data-id="${item.id}">remove</button>
           <button class="checkoutOne"  data-index="${index}">check out</button>`;
    document.getElementById("cart-items").innerHTML += section;
  });


  


  // checkout solo

  const checkoutOnes  = document.querySelectorAll('.checkoutOne');
  checkoutOnes.forEach(element => {
    element.addEventListener('click' , (e)=> { 
      const index = e.target.dataset.index;
    

      if(data[index] || data[index] === 0 ){

        value ={ 
          img  : data[index].img, 
          name : data[index].name, 
          price : data[index].price,
        }

        //  const item = JSON.parse(localStorage.getItem("selectedItem"));
        localStorage.setItem('selectedItem', JSON.stringify(value))
    
      
      }else{ 
        alert("item not found");
      }

      if(confirm("are you sure to checkout this itmem")){ 
        window.location.href = "/checkout"
        val = JSON.parse(localStorage.getItem('selectedItem'))
        console.log(val);
        
      }
      
      

    })    
  });
 



  // checkout all
  checkoutAll = document.getElementById('checkoutall_items'); 
// Event listener para sa button click lang
checkoutAll.addEventListener('click', () => {
  if(confirm,(" are you sure checkout this all item")){ 
    setTimeout(() => {
      window.location.href = '/checkout2'

      
    }, 1000);
  }
});


// this function is checkout all item

  document.querySelectorAll(".button1").forEach((Element) => {
    Element.addEventListener("click", (e) => {
      // for id
      const itemId = e.target.dataset.id;
       // FOR ALL ITEM IMG, PIC AND PRICE
      const itemIndex = e.target.dataset.index;
      // FOR ID ONLY 
      let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            // FOR ALL ITEM IMG, PIC AND PRICE
      let selectedItemsIndex = JSON.parse(localStorage.getItem('selectedItemsIndex')) || [];
      if (e.target.checked) {        
        if (!selectedItems.includes(itemId)) {
          selectedItems.push(itemId);
        
        }
        if(!selectedItems.includes(itemIndex)){ 
          selectedItemsIndex.push(data[itemIndex])
        }
      } else {

              // FOR ALL ITEM IMG, PIC AND PRICE
        selectedItemsIndex = selectedItemsIndex.filter(val => val !== itemIndex);
        // FOR ID ONLY
        selectedItems = selectedItems.filter(id => id !== itemId);
      }


      // FOR ID ONLY
      localStorage.setItem("selectedItemsIndex" , JSON.stringify(selectedItemsIndex))
      localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

      console.log("Updated selected index:",  selectedItemsIndex);

      console.log("Updated selected :",selectedItems);
    });
  });



// delete all itmes
  
  function del() {
    document.getElementById("del").addEventListener("click", () => {
      
      let selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  
      if (selectedItems.length > 0) {
        console.log("Items to delete:", selectedItems);
  
  
        selectedItems.forEach(itemId => {

          fetch(`/delete2/${itemId}`, { method: "DELETE" })
          // fetch(`http://localhost:3000/delete2/${itemId}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => console.log(`Item ${itemId} deleted:`, data))
            .catch(error => console.error("Error deleting item:", error));
  
         
          console.log(`Deleting item ID: ${itemId}`);
        });
        localStorage.removeItem("selectedItems");
        localStorage.removeItem("selectedItemsIndex");
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
      const id = e.target.dataset.index;
      const price = data[id].price;
      const name = data[id].name;
  
      if (e.target.checked) {
        selectedForTable.push({ name, price });
      } else {
        localStorage.removeItem("selectedItemsIndex")
        localStorage.removeItem("selectedItems")
        selectedForTable = selectedForTable.filter(item => item.name !== name);
      }
  
      updatePriceTable();
    });
  });

  let selectedForTable = [];

  function updatePriceTable() {
    let total = 0;
    let tableHTML = `
      <table style="border-collapse: collapse; width: 90%; max-width: 500px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <thead style="background-color: #f5baba;">
          <tr>
            <th style="padding: 10px; border: 1px solid #ccc;">Item Name</th>
            <th style="padding: 10px; border: 1px solid #ccc;">Price (₱)</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    selectedForTable.forEach(item => {
      tableHTML += `
        <tr>
          <td style="padding: 10px; border: 1px solid #ccc;">${item.name}</td>
          <td style="padding: 10px; border: 1px solid #ccc;">₱${item.price}</td>
        </tr>
      `;
      total += item.price;
    });
  
    tableHTML += `
        </tbody>
        <tfoot style="background-color: #ffe0e0;">
          <tr>
            <td style="padding: 10px; font-weight: bold;">Total</td>
            <td style="padding: 10px; font-weight: bold;">₱${total}</td>
          </tr>
        </tfoot>
      </table>
    `;
  
    document.getElementById("price-table").innerHTML = tableHTML;
  }
  

  

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
  
  // fetch(`http://localhost:3000/delete/${id}`, {
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
        localStorage.removeItem('selectedItemsIndex')
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




