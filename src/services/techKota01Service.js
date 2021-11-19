
export async function postSubscriber(url = '', data = {}) {
    console.log(`url: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify(data),
    });
    return(response);
  }

  export async function getSubscriber(id) {
    let url = 'http://localhost:8080/api/subscribers/' + id;
    const response = await fetch(url, {
      headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000',
      },
      mode: 'cors'
    })
    .then(response => {
    if (response.status >= 200 && response.status <= 299) {
      return response;
    }
    else 
      throw Error(response.statusText);
    });
    return(response);
  }
  