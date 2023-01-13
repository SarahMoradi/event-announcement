function handler(req, res){
    const eventId = req.query.enetId;
     
    if(req.method === "POST"){
        const  {email, name, text} = req.body;
    }
    if(req.method === "GET"){}
}



export default handler