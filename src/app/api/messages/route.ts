import connectDB from "@/lib/dbConnect";
import {Message, MessageModel, UserMessage, UserModel} from "@/models/User";

export async function POST(request: Request) {
    await connectDB();
  
    const { userFirstName, userLastName, senderEmail, reciverEmail, mobileNo, message } = await request.json();
  
    try {
      const existingUser = await MessageModel.findOne({ reciverEmail, senderEmail, mobileNo });
  
      if (existingUser) {
        const newMessage = { content: message }; // Ensure it follows the schema
        existingUser.messages.push(newMessage);

  
        await existingUser.save();
        return new Response(
          JSON.stringify({ success: true, message: 'Message added to existing user.' }),
          { status: 200 }
        );
      } else {
        const newUser = new MessageModel({
            userFirstName,
            userLastName,
            reciverEmail,
            senderEmail,
            mobileNo,
            messages: [{ content: message }], // Correct structure
          });
          
  
        await newUser.save();
        // const newMessage = { content: message }; // Ensure it follows the schema
        // newUser.messages.push(newMessage);
        await newUser.save();
        return new Response(
          JSON.stringify({ success: true, message: 'New user created and message added.' }),
          { status: 201 }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500 }
      );
    }
  }
  