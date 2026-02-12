using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;
using UnityEngine.SceneManagement;

/*
    Requirements
    1. In case gamedata.data exists in the Application persistant folder
        1. Read Data from gamedata.data
        2. Update Global Variables
        3. Load Playing Scene
    2. Provide a public API to write gamedata.data    

*/

public class GameDataController : MonoBehaviour
{
    // Create a field to save the file to write
    string fileName;

    // Create a single FileStream to be overwritten as needed in the class.
    FileStream dataStream;

    // Create a single BinaryFormatter to be used across methods.
    BinaryFormatter converter;

    private GameData gameData;

    public GameObject uiPanel;

    private void Awake()
    {
        fileName = Application.persistentDataPath + "/gamedata.data";
        converter = new BinaryFormatter();
    }

    void Update()
    {
        //Unity provides the static field of the Application class named persistentDataPath. 
        //Does File exist?    
        if (File.Exists(fileName))
        {
            uiPanel.SetActive(false);
            //File exist
            gameData = ReadGameData();

            //Update the Global variables, so that other scenes also access them
            GlobalVariables.Instance.WriteGameData(gameData);
            
            SceneManager.LoadScene("GameScene");
        }
        else
        {
            //File does not exist.
            //
        }
    }

    public void WriteGameData(string IpAddress, string Port, string Seat)
    {
        // Create a FileStream connected to the fileName path.
        // Set the file mode to "Create".
        dataStream = new FileStream(fileName, FileMode.Create);

        gameData = new GameData(IpAddress, Port, Seat);

        //The class BinaryFormatter handles the work of serializing and deserializing data into and out of a binary format. 
        // Serialize GameData into binary data and add it to an existing input stream.
        converter.Serialize(dataStream, gameData);

        Debug.Log("Written data to" + fileName);

        // Close the stream
        dataStream.Close();
    }

    public GameData ReadGameData()
    {
        // Create a FileStream connected to the fileName.
        // Set to the file mode to "Open".
        dataStream = new FileStream(fileName, FileMode.Open);

        // Deserialize binary data 
        //  and convert it into GameData, saving it as part of gameData.
        gameData = converter.Deserialize(dataStream) as GameData;

        Debug.Log("Read data from" + fileName +" IpAddress : "+ gameData.IpAddress + " Port : "+gameData.Port + " Seat: "+gameData.Seat);

        // Close the stream
        dataStream.Close();

        return gameData;
    }

}

[System.Serializable]
public class GameData
{
    public string IpAddress;
    public string Port;
    public string Seat;

    public GameData(string IpAddress, string Port, string Seat)
    {
        this.IpAddress = IpAddress;
        this.Port = Port;
        // this.SeatNo = Int32.Parse(Seat.Split(".")[3]);
        switch (Seat)
        {
            case "1":
                this.Seat = "192.168.1.1";
                break;
            case "2":
                this.Seat = "192.168.1.2";
                break;
            case "3":
                this.Seat = "192.168.1.3";
                break;
            case "4":
                this.Seat = "192.168.1.4";
                break;
            case "5":
                this.Seat = "192.168.1.5";
                break;
            case "6":
                this.Seat = "192.168.1.6";
                break;
            case "7":
                this.Seat = "192.168.1.7";
                break;
            case "8":
                this.Seat = "192.168.1.8";
                break;
            default:
                this.Seat = "192.168.1.1";
                break;
        }
    }
}
