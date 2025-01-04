import razorpay from 'razorpay';

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET as string,
});

export async function POST(request: Request) {
    const { amount } = await request.json();

    const payment = await razorpayInstance.orders.create({
        amount,
        currency:"INR",
        receipt:"12345678"
    });

    return  Response.json(payment);
}