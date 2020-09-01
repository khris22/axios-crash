// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  console.log('GET Request');
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   // can be able to pass in any params here
  //   // limit data:
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   // error handling
  //   .catch((err) => console.log(err));

  // Refactor:
  // add/set TimeOut
  // axios('https://jsonplaceholder.typicode.com/todos?_limit=5', { timeout: 5000})

  // axios.get('https://jsonplaceholder.typicode.com/todos', {params: {_limit = 5}})
  axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  // axios({
  //   method: 'POST',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title: 'Khris To Dos',
  //     completed: false,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.log(err));

  // Refactor:
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'Todos for today',
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
// put - edits/changes the whole object
// patch - edits only sepcific parts of the data
function updateTodo() {
  console.log('PUT/PATCH Request');

  // axios({
  //   // method: 'PUT',
  //   method: 'PATCH',
  //   // needs to have an id ; make it dynamic ${}
  //   url: 'https://jsonplaceholder.typicode.com/todos/1',
  //   data: {
  //     title: 'Updated To do - Khris',
  //     completed: true,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((err) => console.log(err));

  axios
    // .put('https://jsonplaceholder.typicode.com/todos/1', {
    .patch('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'NEW UPDATE',
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
// get datas simultaneoously with nested get request
// use axios.all() takes in an array of requests
function getData() {
  console.log('Simultaneous Request');
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    ])
    // .then(res => {
    //   console.log(res[0]);
    //   console.log(res[1]);
    //   showOutput(res[0])
    // })
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch((err) => console.log(res));
}

// CUSTOM HEADERS
// send data in the headers; authorization - for webtoken
function customHeaders() {
  console.log('Custom Headers');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'YOUR_TOKEN_HERE',
    },
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'Todos for today',
        completed: false,
      },
      config,
    )
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World',
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      // don't forget to return ||= undefined
      return data;
    }),
  };
  axios(options)
    .then((res) => showOutput(res))
    .catch((err) => console.log(err));
}

// ERROR HANDLING
// 404 page
function errorHandling() {
  console.log('Error Handling');

  // limit catch to certain status
  // axios.get('https://jsonplaceholder.typicode.com/todoss', {
  //   validateStatus: function() {
  //     return status < 500;
  //     // Reject only if status is greater or equal to 500
  //   }
  // })

  // wrong spelling on the url will return 404
  axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        // window.alert not working
        if (err.response.status === 404) {
          alert('Error: Page Not Found');
        }
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');

  // axios method: CancelToken
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request Cancelled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
// interceptors/logger on console
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`,
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  // other custom setting
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// axiosInstance.get('/comments').then((res) => {
//   showOutput(res);
// });

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
