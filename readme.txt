1. brew tap mongodb/brew
2. brew install mongodb-community@4.0
3. npm install
4. npm run dev


endpoint for all the recipes is at
```http://localhost:3000/api/recipes/```

endpoint for a single recipe is
```http://localhost:3000/api/recipes/:_id

EndPoints for User Creation

Setting a variable for the url

```const apiUrl = "http://localhost:3000/api"```

Setup for creating a user

```const email = "test@gmail.com"
const password = "12345"
const username = "username"

const createUser = (email, password, username) => {
  return fetch(apiUrl + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify({
      user: { email: email, password: password, username: username }
    })
  })
    .then(resp => resp.json())
    .then(data => localStorage.setItem("token", data.user.token));
};```


Expected Returned Promise Which is being set into local storage, or can be stored in state.

```{
    "user": {
        "_id": "5ceda7c082a0498634de5bcc",
        "username": "username",
        "email": "test@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZWRhN2MwODJhMDQ5ODYzNGRlNWJjYyIsInVzZXJuYW1lIjoidXNlcjEyMyIsImV4cCI6MTU2NDI2Mjg1MSwiaWF0IjoxNTU5MDc4ODUxfQ.0ABkj1SOYVuqbrbN0X0MjPScYUiWW_vhk4ZSWMTLRAY"
    }
}```

Login endpoint when there is no token available e.g. fresh load. Only requires email and password

Outcome json is the same as above for this one too. But you need to keep in mind, each time a login is triggered a new token is generated. So thats why I set the token again.

```const loginUser = (email, password) => {
  return fetch(apiUrl + '/users/login', {
  method: 'POST',
  headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: JSON.stringify({
      user: { email: email, password: password}
    })
  })
  .then(resp => resp.json())
  .then(data => localStorage.setItem("token", data.user.token));
  };
}```
Endpoints for User Favorting

To get the users favourites- for now, you only need the username, which you can store in local storage instead of state, so if the user refreshes, itll hold the info

```const getFavorites = () => 
  fetch(apiUrl + `/profiles/${localStorage.getItem("username")}`, { // or can get it from state
  headers: { 
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
    "Authorization": localStorage.getItem('token') // not needed
  },
}).then(resp => resp.json())```
  

To make a favorite recipe

```const favRecipe = id => 
  fetch(apiUrl + `/recipes/${id}/favorite`, {
  method: 'POST',
  headers: { 
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
    "Authorization": localStorage.getItem('token') // this is needed
  },
}).then(resp => resp.json())```
To unfavorite

```const unfavRecipe = id => 
  fetch(apiUrl + `/recipes/${id}/favorite`, {
  method: 'DELETE',
  headers: { 
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
    "Authorization": localStorage.getItem('token') // this is needed
  },
}).then(resp => resp.json())```


New Time Search/Query Search

To search just by time
```http://localhost:3000/api/recipes/search?q=&time=45```
to search with ingredients and time
```http://localhost:3000/api/recipes/search?q=chicken,butter&time=45```
Just by ingredients
```http://localhost:3000/api/recipes/search?q=chicken,butter```