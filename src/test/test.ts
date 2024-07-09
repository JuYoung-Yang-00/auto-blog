import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

export async function createImage(prompt: string) {
    const payload = {
        prompt: prompt,
        output_format: "png",
        seed: 2424,
        guidance_scale: 7.5,
      };
      
      const response = await axios.postForm(
        `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
        axios.toFormData(payload, new FormData()),
        {
          validateStatus: undefined,
          responseType: "arraybuffer",
          headers: { 
            Authorization: process.env.STABILITY_API_KEY, 
            Accept: "image/*" 
          },
        },
      );
      
      if(response.status === 200) {
        fs.writeFileSync("./lighthouse.png", Buffer.from(response.data));
        return response.data;
      } else {
        throw new Error(`${response.status}: ${response.data.toString()}`);
      }
}

