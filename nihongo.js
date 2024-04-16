//const hostIp = "http://192.168.1.124:8080/";
const hostIp = "https://fbfb-175-177-41-59.ngrok-free.app/";
const requestOptions = {
  method: "GET",
  headers: new Headers({"ngrok-skip-browser-warning": "test"}),
  redirect: "follow"
};

function getAnswer() {

    const userInput = document.getElementById("answer").value;
    fetch(hostIp + 'getAnswer' + "?input=" + userInput, requestOptions) // Use your actual endpoint here
        .then(response => response.json())
        .then((data) => {
            // Assuming 'data' is the map/object returned from the server
            const container = document.getElementById('result');
            container.innerHTML = ''; // Clear previous contents
            // Assuming 'container' is the div where you want to add the labels
            const label = document.getElementById('status');
            const value = data["status"];
            label.textContent = `Status: ${value}`;
            label.style.fontSize = '24px';
            console.log(value)
            if (value)
                label.style.color = 'green';
            else
                label.style.color = 'red';
            container.appendChild(document.createElement('br'));

            const correctWordsLabel = document.createElement('label');
            const correctWordsValue = data["correctWords"];
            correctWordsLabel.textContent = `correctWords: ${correctWordsValue}`;
            container.appendChild(correctWordsLabel);

            const row = document.createElement('div'); // Create a new div as a row
            const order = ["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess","note"];
            // Iterate over each entry in the object
            for (const key of order) {
                const value = data[key];
                if (value){
                    // Create a new label element
                    const label = document.createElement('label');
                    // Set the text of the label
                    label.textContent = `${key}: ${value}`;
                    // Append the label to the row

                    row.appendChild(label);

                    // Optional: Add a separator (e.g., comma, space) between labels
                    row.appendChild(document.createTextNode(', ')); // Adds a comma and a space
                }

            }

            // Finally, append the row to the container
            container.appendChild(row);

        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("result").textContent = "ERROR";
        });
}

function getQuestion(){

    const label = document.getElementById('status');
    label.style.color = 'black';
    label.textContent = `Status:`;
    fetch(hostIp + 'getQuestion',requestOptions ) // Use your actual endpoint here
        .then(response => response.json())
        .then((data) => {
            // Assuming 'data' is the map/object returned from the server
            const container = document.getElementById('question');
            container.innerHTML = ''; // Clear previous contents
            const answer = document.getElementById('answer');
            answer.value = ''; // Clear previous contents

            const order2 = ["trueInRow", "currentCorrect", "currentAnswered", "currentSuccess"];
            const row2 = document.createElement('div'); // Create a new div as a row
            // Assuming `data` is your object
            for (const key of order2) {
                const value = data[key];
                // Create a new label element
                const label = document.createElement('label');
                // Set the text of the label
                label.textContent = `${key}: ${value}`;
                // Append the label to the row
                row2.appendChild(label);

                // Optional: Add a separator (e.g., comma, space) between labels
                row2.appendChild(document.createTextNode(', ')); // Adds a comma and a space

            }
            container.appendChild(row2);
            container.appendChild(document.createElement('br'));
            const row = document.createElement('div'); // Create a new div as a row
            const order = ["pickMode", "category"];
            // Assuming `data` is your object
            for (const key of order) {
                const value = data[key];
                // Create a new label element
                const label = document.createElement('label');
                // Set the text of the label
                label.textContent = `${key}: ${value}`;
                // Append the label to the row
                row.appendChild(label);

                // Optional: Add a separator (e.g., comma, space) between labels
                row.appendChild(document.createTextNode(', ')); // Adds a comma and a space

            }


            let correctAnswers = data["correctlyAnswered"];
            let totalAnswered = data["totalAnswered"];
            const label = document.createElement('label');
            label.textContent = `accuracy: ${correctAnswers}/${totalAnswered}`;
            // Append the label to the row
            row.appendChild(label);
            container.appendChild(row);

            const questionLabel = document.createElement('label');
            let question = data["question"];
            questionLabel.textContent = `question: ${question}`;
            questionLabel.style.fontSize = '24px';
            // Finally, append the row to the container
            container.appendChild(questionLabel);

        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById("result").textContent = "ERROR";
        });
}

function getStats(){

    fetch(hostIp + 'getStats', requestOptions) // Use your actual endpoint here
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
            // Assuming 'data' is the map/object returned from the server
            const container = document.getElementById('stats');
            container.innerHTML = ''; // Clear previous contents

            // Assuming 'container' is the div where you want to add the labels
            const row = document.createElement('div'); // Create a new div as a row
            const order = ["vocabularySize", "globalSuccessRate", "trueInARowRecord"];
            // Iterate over each entry in the object
            for (const key of order) {
                const value = data[key];
                // Create a new label element
                const label = document.createElement('label');
                // Set the text of the label
                label.textContent = `${key}: ${value}`;
                // Append the label to the row
                row.appendChild(label);

                // Optional: Add a separator (e.g., comma, space) between labels
                row.appendChild(document.createTextNode(', ')); // Adds a comma and a space

            }

            // Finally, append the row to the container
            container.appendChild(row);

        })
        .catch(error => console.error('Error fetching stats:', error));

}