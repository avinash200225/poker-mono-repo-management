using UnityEngine;

public class PokerBetMessage {
    public string MessageType;
    public string uid;
    public int amount;

    public PokerBetMessage(string MessageType, string uid, int amount = 0){
        this.MessageType = MessageType; 
        this.uid = uid; 
        this.amount = amount; 
    }

    public string SaveToString() {
        return JsonUtility.ToJson(this);
    }
}