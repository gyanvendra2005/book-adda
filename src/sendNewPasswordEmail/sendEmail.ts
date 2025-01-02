import { Resend } from 'resend';
import { ApiResponse } from '@/types/apiResponse';
import EmailTemplate from '../../emailComponents/newPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendNewPasswordEmail(
    email: string,
    firstName: string,
    verifyCode: string
):Promise<ApiResponse> {
    console.log('sendVerificationEmail', email, firstName, verifyCode);
    
    try {   
        await resend.emails.send({
            from: 'noreply@onwaychat.xyz',
            to: email,
            subject: 'Verification Code',
            react: EmailTemplate({firstName, otp :verifyCode})
          });
          console.log('email sent successfully');
        return {success:true,message:'email sent successfully'}
    } catch (emailError) {
        console.log('sendVerificationEmail Error', emailError);
        return {success:false,message:'An error occured while sending the verification email'}
        
    }
}

