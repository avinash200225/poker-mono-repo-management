using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlobalVariables : MonoBehaviour
{
    public static GlobalVariables Instance;

    public string ipAddress;
    public string port;
    public string seat;

    void Start() {
        if(Instance == null) {
            DontDestroyOnLoad(gameObject);
            Instance = this;
        } else if(Instance != this) {
            Destroy(gameObject);
        }
    }

    public void WriteGameData(GameData gameData)
    {
        this.ipAddress = gameData.IpAddress;
        this.port = gameData.Port;
        this.seat = gameData.Seat;
	}

	public GameData ReadGameData() {
		GameData gameData = new GameData(ipAddress, port, seat);
		gameData.IpAddress = ipAddress;
		gameData.Port = port;
		gameData.Seat = seat;
		return gameData;
	}
}
