import connectDB from "@/lib/dbConnect";
import {BookModel, UserModel} from "@/models/User";
import { UploadImage } from "@/app/utils/cloudinary";




export async function POST(request:Request) {
    await connectDB()
      try {
        const dataform = await request.formData();
        const bookName = dataform.get('bookName')
        const price = dataform.get('price')
        const email = dataform.get('email')
        const image = dataform.getAll('images') as File[]
        const condition = dataform.get('condition')
        const edition = dataform.get('edition')
        const description =dataform.get('description')
        const category = dataform.get('category')
        const subCategory = dataform.get('subCategory')
        const otherCategory = dataform.get('otherCategory')
        const location = dataform.get('location')
        const userId = dataform.get('userId')
        console.log({...image});
        console.log(userId);
        
        
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
        
        const datas = await UploadImage(image as File[], "bookAdda") as { secure_url: string }[];
        // console.log(datas);

        await UserModel.findOne({email})
        // const location = user?.location
        const newBook: { bookName: FormDataEntryValue | null, price: FormDataEntryValue | null, condition: FormDataEntryValue | null, edition: FormDataEntryValue | null, bookImages: string[], description: FormDataEntryValue | null, category: FormDataEntryValue | null, subCategory: FormDataEntryValue | null, otherCategory: FormDataEntryValue | null, location: FormDataEntryValue | null, userId: FormDataEntryValue | null } = {bookName, price,condition,edition, bookImages:[],description,category,subCategory,otherCategory,location,userId}
        for (const data of datas) {
            newBook.bookImages.push(data.secure_url);
        }
        console.log(newBook);
        // console.log();
        
        
        // user?.bookSelling.push(newBook as Book)
        // await user?.save();
        const book = new BookModel({ ...newBook });
        console.log(book);
        
        await book.save();
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