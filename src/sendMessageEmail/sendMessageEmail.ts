import { Resend } from 'resend';
import { ApiResponse } from '@/types/apiResponse';
import EmailMessageTemplate from '../../emailComponents/sendHelpMessageEmail';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendMessageEmail(
    firstName: string,
    email: string,
    Message: string,
    
):Promise<ApiResponse> {
    try {
            await resend.emails.send({
            from: 'noreply@onwaychat.xyz',
            to: email,
            subject: 'Help Message',
            react: EmailMessageTemplate({firstName, email,Message})
          });
          
        return {success:true,message:'email sent successfully'}
    } catch (emailError) {
        console.log('sendVerificationEmail Error', emailError);
        return {success:false,message:'An error occured while sending the verification email'}
        
    }
}

