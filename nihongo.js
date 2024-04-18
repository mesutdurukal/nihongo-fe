//let hostIp = "http://192.168.1.124:8080/";
//const hostIp = "localhost:8080/";
let hostIp = "https://d092-2407-c800-1f32-875-4959-f8e7-57c5-c9f1.ngrok-free.app/";
const requestOptions = {
  method: "GET",
  headers: new Headers({"ngrok-skip-browser-warning": "test"}),
  redirect: "follow"
};

function setIp(){
    const ip = document.getElementById("ip").value;
    hostIp = ip;
    document.getElementById('iplabel').innerHTML = hostIp;
    getStats();
    getQuestion();
}

function getAnswer() {
    const userInput = document.getElementById("answer").value;
    const statusCont = document.getElementById('status');
    const result = document.getElementById('result');
    const notes = document.getElementById('notes');

    // Clear Previous Data
    notes.innerHTML = ''; // Clear previous contents

    fetch(hostIp + 'getAnswer' + "?input=" + userInput, requestOptions) // Use your actual endpoint here
        .then(response => response.json())
        .then((data) => {
            // TRUE / FALSE
            const answerStatus = data["status"];
            result.textContent = `Status: ${answerStatus}`;
            result.style.fontSize = '24px';
            if (answerStatus)
                result.style.color = 'green';
            else
                result.style.color = 'red';
            result.appendChild(document.createElement('br'));

            // All correct words
            const correctWordsLabel = document.createElement('label');
            correctWordsLabel.textContent = `correctWords: ${data["correctWords"]}`;
            notes.appendChild(correctWordsLabel);

            // Status
            statusCont.innerHTML = ''; // Clear previous contents
            const statusKeys = ["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess","note"];
            for (const key of statusKeys) {
                const value = data[key];
                if (value != null){
                    const label = document.createElement('label');
                    label.textContent = `${key}: ${value}`;
                    statusCont.appendChild(label).appendChild(document.createTextNode(', ')); // Adds a comma and a space
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("result").textContent = "ERROR";
        });
}

function getQuestion(){

    const previousResult = document.getElementById('result');
    const previousNotes = document.getElementById('notes');
    const answer = document.getElementById('answer');

    // Clear previous data
    previousResult.style.color = 'black';
    previousResult.textContent = `Result:`;
    answer.value = '';
    previousNotes.value = '';
    previousNotes.innerHTML = '';

    // Get Next Question
    fetch(hostIp + 'getQuestion',requestOptions ) // Use your actual endpoint here
        .then(response => response.json())
        .then((data) => {
            const questionDiv = document.getElementById('question');
            questionDiv.textContent = ``;
            // Category
            const questionKeys = ["pickMode", "category"];
            for (const key of questionKeys) {
                const label = document.createElement('label');
                label.textContent = `${key}: ${data[key]}`;
                questionDiv.appendChild(label).appendChild(document.createTextNode(', '));
            }
            // Question Stats
            let correctAnswers = data["correctlyAnswered"];
            let totalAnswered = data["totalAnswered"];
            const label = document.createElement('label');
            label.textContent = `accuracy: ${correctAnswers}/${totalAnswered}`;
            questionDiv.appendChild(label).appendChild(document.createElement('br'));

            // Question Word
            const questionLabel = document.createElement('label');
            questionLabel.textContent = `question: ${data["question"]}`;
            questionLabel.style.fontSize = '24px';
            questionDiv.appendChild(questionLabel);

        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("result").textContent = "ERROR";
        });
}

function getStats(){
    document.getElementById('iplabel').value = hostIp;
    document.getElementById('iplabel').innerHTML = hostIp;

    fetch(hostIp + 'getStats', requestOptions) // Use your actual endpoint here
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
            const stats = document.getElementById('stats');
            stats.innerHTML = ''; // Clear previous contents

            const order = ["vocabularySize", "globalSuccessRate", "trueInARowRecord"];
            // Iterate over each entry in the object
            for (const key of order) {
                const label = document.createElement('label');
                label.textContent = `${key}: ${data[key]}`;
                stats.appendChild(label).appendChild(document.createTextNode(', '));
            }
        })
        .catch(error => console.error('Error fetching stats:', error));

}