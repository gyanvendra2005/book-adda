import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/User";
import cloudinary, { UploadImage } from "@/app/utils/cloudinary";



export async function POST(request) {
    await connectDB()
      try {
        const dataform = await request.formData();
        const bookName = dataform.get('bookName')
        const price = dataform.get('price')
        const email = dataform.get('email')
        const image = dataform.getAll('images')
        const condition = dataform.get('condition')
        const edition = dataform.get('edition')
        // const description =dataform.get('description')
        console.log(image);
        
        if(!image){
            return Response.json(
                {
                success:false,
                message: "No image found",
                },
                {
                    status:200
                }
            )
        }
        
        const datas = await UploadImage(image,"bookAdda")
        console.log(datas);

        const user = await UserModel.findOne({email})
        let newBook = {bookName, price,condition,edition, bookImages:[]}
        for (const data of datas) {
            newBook.bookImages.push(data.secure_url);
        }
    console.log(newBook);
    

        user.bookSelling.push(newBook)
        await user.save();
        return Response.json({
            success: true,
            message:'Book is ready to sell'
        })
        

      } catch (error) {
        console.log(error);
        return Response.json(
            {
            success:false,
            message: "Not uploaded",
            },
            {
                status:200
            }
        )
      }
}