import json
import boto3
import base64

polly = boto3.client('polly')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])

        text = body.get('text', 'Hello from AWS Polly!')
        language_code = body.get('language_code', 'en-US')
        voice_id = body.get('voice_id', 'Joanna')

        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId=voice_id,
            LanguageCode=language_code
        )

        # Read audio stream and encode it in base64
        audio_stream = response['AudioStream'].read()
        audio_base64 = base64.b64encode(audio_stream).decode('utf-8')

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'audio/mpeg',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',  # Or your frontend domain
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'isBase64Encoded': True,
            'body': audio_base64
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Access-Control-Allow-Origin': '*'
            }
        }
