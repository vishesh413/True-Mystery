import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"


export async function POST(request: Request){
    await dbConnect()
    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)// ye URL me se encoded characters ko normal string me convert krta hai pehle aise rahega username = "iron%40man%20123" aur phir username = "iron@man 123"  aise hojayega yaha pr waise iski jrurt h nhi
        const user = await UserModel.findOne({username: decodedUsername})

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {status: 500}
            )
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {status: 200}
            )

            
    } else if (!isCodeNotExpired){
        return Response.json(
            {
                success: false,
                message: "Verification code has expired, please signup to get a new code"
            },
            {status: 400}
            )
    }else {
        return Response.json(
            {
                success: false,
                message: "Incorrect Verification code"
            },
            {status: 400}
        )
    }


    } catch (error) {
        console.error("Error verifying user", error)
        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            {status: 500}
        )
        
    }
}