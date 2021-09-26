import fetch from 'node-fetch';

const getTaskURL = 'https://interview.adpeai.com/api/v1/get-task';
const submitTaskURL = 'https://interview.adpeai.com/api/v1/submit-task';

getTask();

async function getTask() {
  await fetch(getTaskURL)
    .then((response) => response.json())
    .then((data) => {
      // Run the task
      const results = runTask(data.operation, data.left, data.right);

      // submit task results
      postResults(data.id, results);
    });
}

function postResults(id, results) {
  const post = {
    id,
    result: results,
  };

  fetch(submitTaskURL, {
    method: 'post',
    body: JSON.stringify(post),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(checkStatus);
}

function runTask(operation, left, right) {
  if (operation === 'addition') {
    return left + right;
  } if (operation === 'subtraction') {
    return left - right;
  } if (operation === 'multiplication') {
    return left * right;
  } if (operation === 'division') {
    return left / right;
  } if (operation === 'divissubtractionion') {
    return left - right;
  } if (operation === 'remainder') {
    return left % right;
  }
  return -1;
}

function checkStatus(res) {
  if (res.status === 200) {
    console.info('Task was successfully submitted');
  } else if (res.status === 400) {
    console.error('Task was unsuccessfully: Incorrect value in result; no ID specified; value is invalid');
  } else if (res.status === 500) {
    console.error('Task was unsuccessfully: ID cannot be found');
  } else {
    console.error('Task was unsuccessfully: Unknow error');
  }
}
