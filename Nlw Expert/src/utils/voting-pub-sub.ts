type Massage = {pollOptionId: string , votes: number}

type Subscriber = (massage: Massage) => void

class VotingPubSub{
   private channels: Record<string, Subscriber[] > ={}
   
   subscriber(pollId:string,subscriber:Subscriber) {
    if(!this.channels[pollId]){
        this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
   }

   publish(pollId:string,message:Massage){
     if (!this.channels[pollId]){
        return;
     }
     for(const subscriber of this.channels[pollId]){
        subscriber(message)
     }
   } 
}

export const voting = new VotingPubSub()