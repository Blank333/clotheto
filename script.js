//Fetch API
fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const items = data.categories;
    //Select the html template element and other required elements
    const template = document.getElementById("item-template");
    const container = document.querySelector(".items");
    const categories = document.querySelectorAll(".category");

    //Render the mens section by default
    renderItems(items[0].category_products);

    //Add a click event on all category buttons
    categories.forEach((button) => {
      button.addEventListener("click", () => {
        //Remove the styling for the selected button and add it to the clicked button
        categories.forEach((button) => {
          button.classList.remove("selected");
        });
        button.classList.add("selected");

        //Select the category of the button and get the products for the appropriate category for rendering
        const category = button.classList[1];
        const categoryProducts = items.find((item) => item.category_name.toLowerCase() === category).category_products;
        renderItems(categoryProducts);
      });
    });

    //Render function
    function renderItems(products) {
      //Clear the cards from the html
      container.innerHTML = "";

      products.forEach((item) => {
        //Clone the template for rendering each product
        const card = template.content.cloneNode(true);

        //Get the information
        const title = card.querySelector(".title");
        title.textContent = item.title.length > 10 ? item.title.slice(0, 10) + "..." : item.title;

        const image = card.querySelector(".image");
        image.src = item.image;
        image.alt = item.title;

        const badge = card.querySelector(".badge");
        //Do not render an empty badge
        if (!item.badge_text) badge.style.display = "none";
        else badge.textContent = item.badge_text;

        const price = card.querySelector(".price");
        price.textContent = `Rs. ${item.price}.00`;

        const old_price = card.querySelector(".old-price");
        old_price.textContent = `Rs. ${item.compare_at_price}.00`;

        const discount = card.querySelector(".discount");
        //Calculating the discount to the nearest integer
        const discount_calc = Math.round(
          ((parseInt(item.compare_at_price) - parseInt(item.price)) / parseInt(item.compare_at_price)) * 100
        );
        discount.textContent = `${discount_calc}% Off`;

        const vendor = card.querySelector(".vendor");
        vendor.textContent = item.vendor;

        container.appendChild(card);
      });
    }
  })
  .catch((err) => {
    console.log(`Error fetching from API ${err}`);
  });
