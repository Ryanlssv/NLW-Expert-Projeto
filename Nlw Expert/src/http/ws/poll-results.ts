import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import { z } from "zod";

export async function pollResults(app:FastifyInstance){
    app.get('/polls/:pollId/results',{websocket:true},(connection,request) =>{
        
        const getPollParams = z.object({
            pollId: z.string().uuid(),
        })
    
        const { pollId } = getPollParams.parse(request.params)
    
        
        voting.subscriber(pollId,(massage) => {
            connection.socket.send(JSON.stringify(massage))
        })
    })
}