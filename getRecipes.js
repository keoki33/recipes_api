const getFromApi = () => {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(resp => resp.json())
    .then(data =>
      fetch("http://localhost:3000/api/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.13.0",
          Accept: "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token": "34fce84a-24cd-4d88-9831-7419ec29d89a",
          Host: "www.themealdb.com",
          cookie: "__cfduid=da418e97965fa0c1f592e17b516e0b44c1558626641",
          "accept-encoding": "gzip, deflate",
          Connection: "keep-alive"
        },
        body: JSON.stringify(convertOutput(data))
      }).then(resp => resp.json())
    );
};

const randomMultiple = (min, max, multiple) => {
  return (
    Math.floor(Math.random() * ((max - min) / multiple + 1)) * multiple + min
  );
};

const convertOutput = ({ meals }) => {
  const data = meals[0];
  const lowerCaseIng = () => {
    let ingredients = [
      data.strIngredient1,
      data.strIngredient2,
      data.strIngredient3,
      data.strIngredient4,
      data.strIngredient5,
      data.strIngredient6,
      data.strIngredient7,
      data.strIngredient8,
      data.strIngredient9,
      data.strIngredient10,
      data.strIngredient11,
      data.strIngredient12,
      data.strIngredient13,
      data.strIngredient14,
      data.strIngredient15,
      data.strIngredient16,
      data.strIngredient17,
      data.strIngredient18,
      data.strIngredient19,
      data.strIngredient20
    ];
    ingredients = ingredients.map(ing =>
      ing ? ing.toLowerCase() : (ing = "")
    );
    return ingredients;
  };

  let hash = {
    recipe: {
      idMeal: parseInt(data.idMeal),
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strArea: data.strArea,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealThumb,
      strTags: data.strTags,
      strYoutube: data.strYoutube,
      IngredientsArr: lowerCaseIng(),
      time: randomMultiple(10, 60, 5),
      MeasurementsArr: [
        data.strMeasure1,
        data.strMeasure2,
        data.strMeasure3,
        data.strMeasure4,
        data.strMeasure5,
        data.strMeasure6,
        data.strMeasure7,
        data.strMeasure8,
        data.strMeasure9,
        data.strMeasure10,
        data.strMeasure11,
        data.strMeasure12,
        data.strMeasure13,
        data.strMeasure14,
        data.strMeasure15,
        data.strMeasure16,
        data.strMeasure17,
        data.strMeasure18,
        data.strMeasure19,
        data.strMeasure20
      ],
      strSource: data.strSource
    }
  };
  return hash;
};

for (let i = 0; i < 10; i++) {
  getFromApi();
}

// const token = localStorage.getItem("token");

// const signout = () => {
//   this.setState({ username: "" });
//   localStorage.removeItem("token");
// };

// const signin = (username, token) => {
//   localStorage.setItem("token", token);
//   this.setState({ username }, () => {
//     this.props.history.push("/inventory");
//   });
// };
