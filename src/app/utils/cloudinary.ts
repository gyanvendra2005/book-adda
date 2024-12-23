import {v2 as cloudinary} from 'cloudinary'

    cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    })

    export const UploadImage = async (files: File[], folder: string) => {
        const uploadPromises = files.map((file) => {
            return new Promise(async (resolve, reject) => {
                try {
                    // Convert the file to a buffer
                    const byteData = await file.arrayBuffer();
                    const buffer = Buffer.from(byteData);
    
                    // Upload image to Cloudinary using the upload_stream method
                    cloudinary.uploader.upload_stream(
                        {
                            resource_type: "image",
                            folder: folder,
                        },
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    ).end(buffer);
                } catch (error) {
                    reject(error); 
                }
            });
        });
    
        const uploadResults = await Promise.all(uploadPromises);
        return uploadResults;  
    }

// export const UploadImage = async(files:File,folder:string) => {
     
//     // const byteData = await file.arrayBuffer();
//     // const buffer = Buffer.from(byteData);


// for (const file of files) {
//     const byteData = await file.arrayBuffer();

//     const buffer = Buffer.from(byteData);
//     console.log(buffer);  
//      return new Promise(async(resolve,reject)=>{
//         await cloudinary.uploader.upload_stream({
//             resource_type:"image",
//             folder: folder,
//         },async(err,result)=>{
//             if(err){
//                 return reject(err);
//             }
//             return resolve(result);
//         }).end(buffer)
//     })
// }
  
// }