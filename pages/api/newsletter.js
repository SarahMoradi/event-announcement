function handler(req, res) {
    if(req.method === "POST"){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes("@")){
            res.status(422).json({message: 'Invalid Email Address.'})
            return;
        }

        console.log(userEmail, 'this is user email.')
    }
}