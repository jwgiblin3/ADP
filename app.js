import  fetch  from 'node-fetch'

const getTaskURL = 'https://interview.adpeai.com/api/v1/get-task';
const submitTaskURL = 'https://interview.adpeai.com/api/v1/submit-task';

(async function() {
    const response = await getTask();

})();

async function getTask() {
    const response = await fetch(getTaskURL)
    .then(response => response.json())
    .then(data =>
    {
        // Run the task
        const results = runTask(data.operation, data.left, data.right);

        // submit task results
        postResults(data.id, results);

    });

}

function postResults(id, results) {
    const post  = {
        id: id,
        result: results
    }

    fetch(submitTaskURL, {
        method: 'post',
        body:    JSON.stringify(post),
        headers: { 'Content-Type': 'application/json' },
        }).then(checkStatus)
        .then(status => {
            // Return submitted task results
            if (status) {
                console.log('Task was successfully submitted');
            } else {
                console.log('Task was NOT successfully submitted');
            }
        });
}

function runTask(operation, left, right) {

    if ( operation === 'addition') {
        return left + right;
    } else if ( operation === 'subtraction') {
        return left - right;
    } else if ( operation === 'multiplication') {
        return left*right;
    } else if ( operation === 'division') {
        return left/right;
    } else if ( operation === 'divissubtractionion') {
        return left - right;
    } else if ( operation === 'remainder') {
        return left % right;
    }
    return -1;
}
function checkStatus(res) {
    if(res.ok) {
        return true;
    } else {
        return false;
    }
}
