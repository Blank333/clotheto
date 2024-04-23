//Fetch API
fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const items = data.categories;
    const container = document.querySelector(".items");
    const template = document.getElementById("item-template");

    items[0].category_products.forEach((item) => {
      const card = template.content.cloneNode(true);

      const title = card.querySelector(".title");
      title.textContent = item.title;

      const image = card.querySelector(".image");
      image.src = item.image;
      image.alt = item.title;

      const badge = card.querySelector(".badge");
      if (!item.badge_text) badge.style.display = "none";
      else badge.textContent = item.badge_text;

      const price = card.querySelector(".price");
      price.textContent = `Rs. ${item.price}.00`;

      const old_price = card.querySelector(".old-price");
      old_price.textContent = `Rs. ${item.compare_at_price}.00`;

      const discount = card.querySelector(".discount");
      const discount_calc = Math.round(
        ((parseInt(item.compare_at_price) - parseInt(item.price)) / parseInt(item.compare_at_price)) * 100
      );
      discount.textContent = `${discount_calc}% Off`;

      const vendor = card.querySelector(".vendor");
      vendor.textContent = item.vendor;

      container.appendChild(card);
    });
  });
