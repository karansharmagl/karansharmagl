const uuid = require('uuid');
var axios = require('axios');

const confirmToken = async (input) => {
  var data = JSON.stringify({
    ...input,
    confirm_code: 4111,
  });
  //   console.log('DATA.....', data);

  var config = {
    method: 'put',
    url: 'http://localhost/server-api/api/v1/access-request/confirm',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      return response.data.access_token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const createToken = async () => {
  var data = {
    phone_number: Math.random().toString().slice(2, 12),
    device_uuid: uuid.v4(),
  };

  console.log('RANDOM DATA', data);

  var config = {
    method: 'post',
    url: 'http://localhost/server-api/api/v1/access-request',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const createParent = async (data) => {
  var config = {
    method: 'post',
    url: 'http://localhost/server-api/api/v1/user',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  return axios(config)
    .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      return response.data.token;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const createChild = async (authToken) => {
  const fns = [
    'arron',
    'venus',
    'serena',
    'maria',
    'sachin',
    'cristiano',
    'michael',
  ];
  const lns = [
    'jordan',
    'williams',
    'sharapova',
    'tendulkar',
    'sharma',
    'ross',
  ];
  var data = JSON.stringify({
    phone_number: Math.random().toString().slice(2, 12),
    first_name: `${fns[Math.floor(Math.random() * fns.length) - 1]}`,
    last_name: `${lns[Math.floor(Math.random() * lns.length) - 1]}`,
  });

  var config = {
    method: 'post',
    url: 'http://localhost/server-api/api/v1/child',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

const verifyIdentity = async (authToken) => {
  var data = JSON.stringify({
    firstName: 'John',
    lastName: 'Smith',
    addressLine1: '303 Peachtree Street Northeast',
    addressLine2: '123',
    city: 'Atlanta',
    state: 'GA',
    zipCode: '30318',
    dob: '02/28/1975',
    ssnLast4: '3333',
  });

  var config = {
    method: 'post',
    url: 'http://localhost/server-api/api/v1/identity/verify',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // console.log(error);
    });
};

const run = async () => {
  const data = await createToken();
  const token = await confirmToken(data);
  const result = {
    access_token: token,
    email: `user${(Math.random() * 10000000000000000).toString()}@gamil.com`,
    dob: new Date(new Date() - Math.random() * 1e12).toString(),
    password: 'greenlight1',
    role: 'parent',
    source: 'web',
    parental_unit_name: 'DAD',
    partner_name: '',
  };
  //   console.log('TOKEN', token, result);
  const authToken = await createParent(result);
  try {
    await verifyIdentity(authToken);
  } catch (e) {}
  // console.log('authToken', authToken);
  await createChild(authToken).then((d) => {
    console.log('Successfully created child');
  });
};

const run2 = async () => {
  await createChild(
    'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJhczIzNGgyMzNqNDUwODdsa2phc2xramZsYWtzZGYyMzQyM0AjJEAjJEAjJEAjIjo3MiwiYXMyMzRoMjMzajQ1MDg3bGtqYXNsa2pmbGFrc2RmMjM0MjNAIyRAIyRAIyRAIzIiOiJwYXJlbnQiLCJhczIzNGgyMzNqNDUwODdsa2phc2xramZsYWtzZGYyMzQyM0AjJEAjJEAjJEAjNCI6IjE5Mi4xNjguNjUuMyIsImFzMjM0aDIzM2o0NTA4N2xramFzbGtqZmxha3NkZjIzNDIzQCMkQCMkQCMkQCMzIjpbMzldLCJhczIzNGgyMzNqNDUwODdsa2phc2xramZsYWtzZGYyMzQyM0AjJEAjJEAjJEAjNSI6MzYsImFzMjM0aDIzM2o0NTA4N2xramFzbGtqZmxha3NkZjIzNDIzQCMkQCMkQCMkQCM2IjoiMjdjNzdlZDAtMGQyNS0xMWVkLWJhNjctZmQ4ZjgyMmJkNTkxIiwiaWF0IjoxNjU5MDQwMjEwLCJleHAiOjE2NTkwNDc0MTB9.5FUBhWLPXX2pvJ4t_N4GNVzFjk7xvhKB00iz-v9vpOLn0iXYSDMsEFM6gfn6ZNN6'
  ).then((d) => {
    console.log('Successfully created child');
  });
};

if (require.main === module) {
  run2();
}
