$(document).ready(function () {
  const prevButton = $(".prev");
  const nextButton = $(".next");
  const list = $(".list");
  const pokemonPerPage = 20;
  let offset = 0;

  prevButton.on("click", function () {
    if (offset > 0) {
      offset -= pokemonPerPage;
      updateList();
    }
  });

  nextButton.on("click", function () {
    offset += pokemonPerPage;
    updateList();
  });

  function updateList() {
    list.empty();

    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonPerPage}`;

    $.getJSON(pokemonURL, function (data) {
      const pokemons = data.results;

      pokemons.forEach(function (pokemon) {
        const pokemonURL = pokemon.url;

        $.getJSON(pokemonURL, function (data) {
          const name = data.name;
          const imageUrl = data.sprites.front_default;
          const types = data.types.map((type) => type.type.name);
          const height = data.height;
          const weight = data.weight;

          const card = $("<div>").addClass("myCard");
          const innerCard = $("<div>").addClass("innerCard");
          const frontSide = $("<div>").addClass("frontSide");
          const backSide = $("<div>").addClass("backSide");

          const frontImg = $("<img>").attr("src", imageUrl);
          const backName = $("<p>").text(name);
          const backTypes = $("<p>").text("Type: " + types.join(", "));
          const backHeight = $("<p>").text("Height: " + height);
          const backWeight = $("<p>").text("Weight: " + weight);

          frontSide.append(frontImg);
          backSide.append(backName);
          backSide.append(backTypes);
          backSide.append(backHeight);
          backSide.append(backWeight);

          innerCard.append(frontSide);
          innerCard.append(backSide);

          card.append(innerCard);
          list.append(card);
        });
      });
    });

    updatePagination();
  }

  function updatePagination() {
    prevButton.prop("disabled", offset === 0);
    nextButton.prop("disabled", offset + pokemonPerPage >= 1118);
  }

  updateList();
});
