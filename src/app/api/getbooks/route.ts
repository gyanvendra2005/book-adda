import { UserModel } from "@/models/User";
import {BookModel} from "@/models/User"
import connectDB from "@/lib/dbConnect";

export async function GET(request:Request) {
        await connectDB();
        try {
            // const { category, subCategory, otherCategory, location } = request.query;

            const url = new URL(request.url);  // Get the full URL
            const category = url.searchParams.get('category');
            const condition= url.searchParams.get('condition');
            const otherCategory = url.searchParams.get('otherCategory');
            const location = url.searchParams.get('location');

            console.log(category,location);

            let books = await BookModel.aggregate([
                {
                  $match: {
                    ...(location && { location: location }), 
                    ...(category && { category: category }), 
                    ...(condition && { condition: condition }), 
                  }
                }
              ]);
              console.log(books);
              if(!books||books.length ===0){
                return Response.json({
                    success: false,
                    message:'No Books found'
                })
            }
            return Response.json({
                success: true,
                books:  books
            })
        
        } catch (error) {
            console.log(error);
            
            return Response.json({
                success: false,
                message:'Server error'
            })
        }
}