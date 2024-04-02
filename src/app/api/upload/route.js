import { NextResponse } from "next/server";  // para enviar una respuesta
import {writeFile} from 'fs/promises'
import {v2 as cloudinary} from 'cloudinary';
import path from "path";

          
cloudinary.config({ 
  cloud_name: 'dqcxir7zr', 
  api_key: '389244843955516', 
  api_secret: 's2EvLSflIZqsI71hI5iIPbaUA7A' 
});

export async function POST(request) {
   const data = await request.formData();
   const image = data.get('picture')

   if (!image) {
    return NextResponse.json("no se ha subido ninguna imagen", { status: 400})
    console.log("Donde mierda estoyy")
   }

   const bytes = await image.arrayBuffer();
   const buffer = Buffer.from(bytes)
   
    //! guardar en un archivo
  //  const filePath = path.join(process.cwd(), 'public', image.name)
  //  await writeFile(filePath, buffer)

   const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    }).end(buffer);
   });

   // Aqui se puede hacer lo siguiente
   // 1. guardar en base de datos
   // 2. procesar imagen 
   console.log(response.secure_url)

return NextResponse.json({
    message: "Imagen subida - Funcion POST()",
    url: response.secure_url
});
}