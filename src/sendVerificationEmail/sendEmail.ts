import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { ApiResponse } from '@/types/apiResponse';
import EmailTemplate from '../../emailComponents/sendVerificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendVerificationEmail(
    email: string,
    firstName: string,
    verifyCode: string
):Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'noreply@onwaychat.xyz',
            to: email,
            subject: 'Verification Code',
            react: EmailTemplate({firstName, otp :verifyCode})
          });
        return {success:true,message:'email sent successfully'}
    } catch (emailError) {
        console.log('sendVerificationEmail Error', emailError);
        return {success:false,message:'An error occured while sending the verification email'}
        
    }
}

