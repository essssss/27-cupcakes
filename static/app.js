// $('#cupcake-list')
const $list = $("#cupcake-list");
const form = document.querySelector("form");
const flavorInput = document.getElementById("flavor");
const ratingInput = document.getElementById("rating");
const sizeInput = document.getElementById("size");
const imageInput = document.getElementById("image");

async function getCupcake() {
    $list.empty();
    const res = await axios.get("/api/cupcakes");

    renderCupcakes(res.data.cupcakes);
}

function renderCupcakes(cupcakes) {
    for (let cupcake of cupcakes) {
        $list.append(cupcakeCard(cupcake));
    }
}

function cupcakeCard(cupcake) {
    const newLI = document.createElement("LI");
    const cupcakeBody = document.createElement("P");
    cupcakeBody.innerHTML = `<p><b>FLAVOR</b> - ${cupcake.flavor}, <b>RATING</b> - ${cupcake.rating}, <b>SIZE</b> - ${cupcake.size}</p><img src= "${cupcake.image}" height = "200px">`;
    newLI.append(cupcakeBody);
    return newLI;
}

async function handleSubmit(event) {
    event.preventDefault();
    const flavor = flavorInput.value;
    const rating = ratingInput.value;
    const image = imageInput.value;
    const size = sizeInput.value;
    const config = { "content-type": "application/json" };
    await axios.post(
        "/api/cupcakes",
        {
            flavor: flavor,
            rating: rating,
            image: image,
            size: size,
        },
        config
    );
    $list.innerHTML = "";
    getCupcake();
}

form.addEventListener("submit", handleSubmit);

getCupcake();
