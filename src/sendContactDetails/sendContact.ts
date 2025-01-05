import { Resend } from 'resend';
import { ApiResponse } from '@/types/apiResponse';
import EmailDetailsTemplate from '../../emailComponents/sendContact';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendContsactEmail(
    firstName: string,
    email: string,
    MobileNo: string,
    
):Promise<ApiResponse> {
    try {
            await resend.emails.send({
            from: 'noreply@onwaychat.xyz',
            to: email,
            subject: 'Contact Details',
            react: EmailDetailsTemplate({firstName, email,MobileNo})
          });
          
        return {success:true,message:'email sent successfully'}
    } catch (emailError) {
        console.log('sendVerificationEmail Error', emailError);
        return {success:false,message:'An error occured while sending the verification email'}
        
    }
}

