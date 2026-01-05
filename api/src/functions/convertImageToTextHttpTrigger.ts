import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import {
  ImageAnalysisClient,
  ImageAnalysisResultOutput
} from "@azure-rest/ai-vision-image-analysis";


const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');


export async function convertImageToTextHttpTrigger(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const key = process.env["VISION_KEY"];
    const endpoint = process.env["VISION_ENDPOINT"];

    if(!key || !endpoint){
        context.error("Missing environment variables");
        return {
            status: 500,
            jsonBody:{
                error: "Something went wrong. Contact administrator."
            }
        }
    }

    const credential = new AzureKeyCredential(key);
    const client: ImageAnalysisClient = createClient(endpoint, credential);

    const imageBuffer = await request.arrayBuffer();

    if(!imageBuffer){
        context.error("Missing Image");
        return {
            status: 500,
            jsonBody:{
                error:"Missing image."
            }
        }
    }

    
    const response = await client.path('/imageanalysis:analyze').post({
        body: new Uint8Array(imageBuffer),
        contentType: 'application/octet-stream',
        queryParameters:{
            features:['read']
        },
    });

    const result = response.body as ImageAnalysisResultOutput;

    let output = '';

    for(const block of result.readResult.blocks){
        output += `${block.lines[0].text}\n`;
    }

    context.log(`Http function processed request for url "${request.url}"`);

    return { status:200, body: output };
};

app.http('convertImageToTextHttpTrigger', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: convertImageToTextHttpTrigger
});
