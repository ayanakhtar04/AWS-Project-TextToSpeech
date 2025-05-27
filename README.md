# AWS Polly Text-to-Speech Web Application

This project is a simple web application that converts text to speech using **AWS Lambda** and **AWS Polly**. Users can enter text, select language and voice, listen to the speech output, and download the generated audio as an MP3 file.

---

## Features

- Input custom text to convert to speech
- Choose from multiple languages and voices supported by AWS Polly
- Play the generated speech audio directly on the webpage
- Download the speech audio as an MP3 file

---

## Technologies Used

- AWS Lambda (Node.js) — Serverless function to interact with AWS Polly
- AWS Polly — Text-to-Speech service
- AWS API Gateway — To expose Lambda as a REST API
- HTML, CSS, JavaScript — Frontend user interface
- Fetch API — To interact with backend Lambda function

---

## Setup Instructions

1. **AWS Setup**

   - Create an AWS Lambda function with the code that calls AWS Polly to synthesize speech.
   - Set up API Gateway to expose the Lambda function as a POST endpoint.
   - Enable CORS on the API Gateway endpoint.

2. **Frontend Setup**

   - Clone this repository.
   - Open `index.html` in your browser or serve via a live server extension.
   - Replace the `API_ENDPOINT` variable in the JavaScript with your deployed API Gateway URL.

3. **Usage**

   - Enter text to convert.
   - Select the language and voice.
   - Click "Convert to Speech" to hear the output.
   - Click "Download MP3" to save the audio file.

---

## Example API Request Payload

```json
{
  "text": "Hello from AWS Polly!",
  "language_code": "en-US",
  "voice_id": "Joanna"
}
```
## Testing with curl

You can test the deployed Lambda function directly from your terminal using the following `curl` command. Replace `<API_ENDPOINT>` with your actual API Gateway invoke URL.

```bash
curl -X POST <API_ENDPOINT> \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Welcome to AWS Polly!",
    "language_code": "en-US",
    "voice_id": "Joanna"
  }'
```
## Structure 
```bash
├── index.html          # Frontend HTML, CSS, JS
├── lambda_function.js  # AWS Lambda function code (Node.js)
└── README.md           # Project documentation

