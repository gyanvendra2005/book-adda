import mongoose, { Schema, Document } from 'mongoose';

// Interfaces
export interface Book extends Document {
  bookImages: string[];
  bookName: string;
  author: string;
  edition?: string;
  price: string;
  condition: string;
  description?: string;
  category: string;
  location: string;
  userId: string;
}

export interface UserMessage extends Document {
  content: string;
}

export interface Message extends Document {
  userFirstName: string;
  userLastName: string;
  reciverEmail: string;
  senderEmail: string;
  mobileNo: string;
  messages: UserMessage[];
}

export interface User extends Document {
  userFirstName: string;
  userLastName: string;
  email: string;
  mobileNo: string;
  password: string;
  location: string;
  verifyEmailCode: string;
  verifyEmailCodeExpiry: Date;
  isVerifiedEmail: boolean;
  bookSelling: Book[];
}

// Schemas
const BookSchema: Schema<Book> = new Schema({
  bookImages: {
    type: [String],
    required: true,
  },
  bookName: { type: String, required: true },
  author: { type: String, required: false },
  edition: { type: String, required: false },
  price: { type: String, required: true },
  condition: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  location: { type: String, required: true },
  // userId: { type: String, required: true },
});

// const userMessageSchema: Schema<UserMessage> = new Schema({
//   content: { type: String, required: true },
// });


// const MessageSchema: Schema<Message> = new Schema({
//     userFirstName: { type: String, required: true },
//     userLastName: { type: String, required: true },
//     reciverEmail: { type: String, required: true },
//     senderEmail: { type: String, required: true },
//     mobileNo: { type: String, required: true },
//     messages: { type: [userMessageSchema], default: [] },
//   });
  

const UserSchema: Schema<User> = new Schema({
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNo: { type: String, required: true },
    location: { type: String, required: true },
    verifyEmailCode: { type: String, required: true },
    verifyEmailCodeExpiry: { type: Date, required: true },
    isVerifiedEmail: { type: Boolean, default: false },
    bookSelling: { type: [BookSchema], default: [] },
  });
  

// Models
const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema);
const BookModel = mongoose.models.Book as mongoose.Model<Book> || mongoose.model<Book>('Book', BookSchema);
// const MessageModel = mongoose.models.Message as mongoose.Model<Message> || mongoose.model<Message>('Message', MessageSchema);

export { UserModel, BookModel };
