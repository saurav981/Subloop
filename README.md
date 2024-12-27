# Subloop, a creator fan chat app

A full-stack MERN app that connects creators with fans through one time payment and chat. This is specifically for micro influencers with 1-10k followers, who usually don't get sponsors/deal, hence less monetization options. And stats show, 49% of Instagram accounts have followers between 1-10k, and India alone has 362.9 million monthly active users, which is a big market. Creators can earn 90% of the revenue, which may motivate them to share their Subloop profile link on socials, and help us grow organically. Because if creators make money, so do we. But if they don't, they don't have to pay any fees.

## Problem it solves

1. Creators can make money for their efforts/service
2. Super fans can directly chat with creators they love
3. Eliminates low quality messages, because fans who pay are usually quality fans

## Features

1. Authentication- Login, Signup using JWT, Verify email, Forget password, and Reset password. Full end to end authentication.

2. Real Time Chat- Using websocket and also for fans it shows the messages left, regardless of the plan they choose.

3. Payment- Integrated Razorpay for easy payment with options like UPI, credit/debit card, net banking and more.

   **Note-** My Razorpay isn't approved yet, it got stuck in KYC, hence payment is not working in production.

   Reason for using Razorpay is the UPI option, earlier I'd used Stripe, but Stripe doesn't have UPI yet. Might switch to Paytm is Razorpay doesn't respond.

4. Dark Mode- Complete light and dark mode, for good user experience.

5. Responsive- Fully responsive for all devices.

6. Email notification- on signup, verify email, forget password, and reset password link

## Tech Stack

1. Frontend- React, Tailwind CSS, Daisy UI for dark theme only, rest using Tailwind
2. Backend- Node.js, Express, MongoDB
3. Real time chat- Using socket io
4. Authentication: JWT and cookies for better security
5. Payments: Razorpay for UPI option
6. Email- SendGrid for ease of use and no domain linkage required, before was using Mailtrap
7. State Management- Zustand
8. Deployed on Render .com
9. File upload- Cloudinary

## Usage

1. You can visit [live app](https://subloop-frontend.onrender.com/) to try it out.
2. Or you can check the [demo video](https://youtu.be/9SHkXQzMqik) as well.

Hope you like it, thank you!

Would appreciate any feedback!
