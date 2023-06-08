export const BASE_URL = '//localhost:3000';

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = ( {password, email, name} ) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
      name: name,
     // birthday: birthday, 
      })
  }).then((res) => {
    console.log(res);
    return checkResponse(res);
  });
}; 

export const authorize = ( {password, email} ) => {
  return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        password: password,
        email: email, 
      })
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
//{name, date, description}
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

export const changeUserInfo = ( {name, birthday} ) => {
  return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        birthday: birthday,
        //password: password,
      })
  })
      .then(checkResponse)
};

export const subscribe = (subscriberId, userId) => {
  return fetch (`${BASE_URL}/subscribe`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subscriberId: subscriberId,
      userId: userId
    })
  })
  .then(checkResponse);
}

export const getAllSubscriptions = (userId) => {
  return fetch(`${BASE_URL}/subscribe/${userId}`, {
    credentials: 'include',
    method:'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse);
}

export const deleteSubscription = (subscriptionId) => {
  return fetch (`${BASE_URL}/unsubscribe/${subscriptionId}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse);
}

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