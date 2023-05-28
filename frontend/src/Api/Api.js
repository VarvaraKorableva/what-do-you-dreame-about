export const BASE_URL = '//localhost:3000';

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = ( {password, email, name} ) => {
  return fetch(`${BASE_URL}/signup`, {
    //credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: name 
      })
  }).then((res) => {
    console.log(res);
    return checkResponse(res);
  });
}; 

export const authorize = ( password, email ) => {
  return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
  })
      .then(checkResponse)
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse)
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse)
      
};

export const getMyDates = () => {
  return fetch(`${BASE_URL}/importantdates/myimportantdates`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse)
};

export const addMyNewDate = (data) => {
  return fetch(`${BASE_URL}/importantdates`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      date: data.date,
      description: data.description,
    })
  })
    .then(checkResponse);
}

export const getOneFriendImportantDates = (id) => {
  return fetch(`${BASE_URL}/importantdates/${id}`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

  })
  .then(checkResponse);
}

export const addMyDream = (data) => {
  return fetch(`${BASE_URL}/dreams`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      imgLink: data.imgLink,
      price: data.price,
      dreamLink: data.dreamLink,
    })
  })
    .then(checkResponse);
}

export const getInitialMyDreams = () => {
  return fetch(`${BASE_URL}/dreams/mydreams`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
  })
  .then(checkResponse);
}
/*{id}
body: JSON.stringify({
  _id: id
})*/
export const getOneFriendDreams = (id) => {
  return fetch(`${BASE_URL}/forAllDreams/${id}`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

  })
  .then(checkResponse);
}

export const getUsers = () => {
  return fetch(`${BASE_URL}/users`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

export const deleteDream = (id) => {
  return fetch (`${BASE_URL}/dreams/${id}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse);
}

export const changeUserInfo = ( userData ) => {
  return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
        birthday: userData.birthday,
      })
  })
      .then(checkResponse)
};

export const updateUserAvatar = (formData) => {
  return fetch (`${BASE_URL}/upload`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: formData
  })
  .then(checkResponse)
}

//body: formData

//name, about, birthday, avatar

/*

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method:'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method:'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }



  deleteCard(id) {
    return fetch (`${this._url}/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeStatus(id, isLiked) {
    return fetch (`${this._url}/cards/${id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
        .then(this._checkResponse);
  }

  updateUserAvatar(data) {
    return fetch (`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url:'//localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export {api};*/

export const getDinamicUser = (id) => {
  return fetch(`${BASE_URL}/usersopenrouter/${id}`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

 /* export const subscribe = (userId) => {
    return fetch(`${BASE_URL}/subscribe`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: userId })
    })
      .then(checkResponse);
  }

  export const unsubscribe = (userId) => {
    return fetch(`${BASE_URL}/unsubscribe`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: userId })
    })
      .then(checkResponse);
  }


  export const getAllSubsriptions = () => {
    return fetch(`${BASE_URL}/users`, {
      credentials: 'include',
      method:'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(checkResponse);
  }

  ///subscriptions/:userId*/