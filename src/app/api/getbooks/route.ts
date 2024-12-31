import { UserModel } from "@/models/User";
import {BookModel} from "@/models/User"
import connectDB from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request:Request) {
        await connectDB();
        try {
            // const { category, subCategory, otherCategory, location } = request.query;

            const url = new URL(request.url); // Get the full URL
            const category = url.searchParams.get('category');
            const condition = url.searchParams.get('condition');
            const _id = url.searchParams.get('_id');
            const location = url.searchParams.get('location');
          
            console.log("Received _id:", _id);
          
            // Validate and parse _id if provided
            let objectId = null;
            if (_id) {
              if (ObjectId.isValid(_id)) {
                objectId = new ObjectId(_id);
              } else {
                throw new Error(`Invalid ObjectId format: ${_id}`);
              }
            }
          
            console.log("Parsed ObjectId:", objectId);
          
            // Aggregation pipeline
            const books = await BookModel.aggregate([
              {
                $match: {
                  ...(location && { location: location }),
                  ...(category && { category: category }),
                  ...(condition && { condition: condition }),
                  ...(objectId && { _id: objectId }), // Use the parsed ObjectId
                },
              },
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