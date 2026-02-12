using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using NativeWebSocket;
using System.Resources;
using System.Text;
using UnityEngine.UIElements;
public class WebSocketManager : MonoBehaviour
{

  [SerializeField]
  WebSocket websocket;
  public Device myDevice = new Device();
  public ConfigState configState;
  public TableState tableState;
  public SeatState mySeat;

  public SeatState oppSeat1; 
  public SeatState oppSeat2;
  public SeatState oppSeat3;
  public SeatState oppSeat4;
  public SeatState oppSeat5; 
  public SeatState oppSeat6;
  public SeatState oppSeat7;


  string url;

  GameData gameData;

  private void Awake() {
    Init();
  }

  void Init() {
    gameData = GlobalVariables.Instance.ReadGameData();
    url = $"ws://{gameData.IpAddress}:{gameData.Port}/holdem/wsclient/player2?ip={gameData.Seat}";
    Debug.Log("WebSocketManager : url : "+ url);

    configState = new ConfigState();
    tableState  = new TableState();
    mySeat   = new SeatState();
    oppSeat1 = new SeatState();
    oppSeat2 = new SeatState();
    oppSeat3 = new SeatState();
    oppSeat4 = new SeatState();
    oppSeat5 = new SeatState();
    oppSeat6 = new SeatState();
    oppSeat7 = new SeatState();

  }

  async void Start()
  {

    // Debug.Log(url);
    websocket = new WebSocket(url);

    websocket.OnOpen += () =>
    {
      Debug.Log("Connection open!");
      myDevice.connected = true;

      var msgBytes = Encoding.UTF8.GetBytes("{\"MessageType\":\"INITIALIZE_PLAYER\"}");
      SendWebSocketMessage(msgBytes);
    };

    websocket.OnError += (e) =>
    {
      Debug.Log("Error! " + e);
    };

    websocket.OnClose += (e) =>
    {
      Debug.Log("Connection closed!");
      myDevice.connected = false;
    };

    
    websocket.OnMessage += (bytes) =>
    {
      // getting the message as a string
      var message = System.Text.Encoding.UTF8.GetString(bytes);
      Debug.Log("OnMessage! " + message);


      if(message.Contains("tableDataUpdated")) {
        var msg = TableDataUpdatedMsg.CreateFromJson(message);
        if(myDevice.ClientId != "-1") {


          var mySeatIndex = msg.data.seats.FindIndex((seat) => seat.uid == myDevice.ClientId);
          if(mySeatIndex != -1) {
            configState.CopyFromConfig(msg.data.configData);
            tableState.CopyFromTable(msg.data);
            mySeat.FillFromSeatData(msg.data.seats[mySeatIndex]);

            oppSeat1.FillFromSeatData(msg.data.seats[(mySeatIndex + 1) % 8]);
            oppSeat2.FillFromSeatData(msg.data.seats[(mySeatIndex + 2) % 8]);
            oppSeat3.FillFromSeatData(msg.data.seats[(mySeatIndex + 3) % 8]);
            oppSeat4.FillFromSeatData(msg.data.seats[(mySeatIndex + 4) % 8]);
            oppSeat5.FillFromSeatData(msg.data.seats[(mySeatIndex + 5) % 8]);
            oppSeat6.FillFromSeatData(msg.data.seats[(mySeatIndex + 6) % 8]);
            oppSeat7.FillFromSeatData(msg.data.seats[(mySeatIndex + 7) % 8]);
            
          }
        }

      }

      if(message.Contains("InitialData")) {
        var msg = InitialData.CreateFromJson(message);

        Debug.Log("Player =>" + msg.clientId);

        myDevice.ClientId = msg.clientId;

        var mySeatIndex = msg.data.seats.FindIndex((seat) => seat.uid == myDevice.ClientId);
        if(mySeatIndex != -1) {
          configState.CopyFromConfig(msg.data.configData);
          tableState.CopyFromTable(msg.data);
          mySeat.FillFromSeatData(msg.data.seats[mySeatIndex]);

                      
          oppSeat1.FillFromSeatData(msg.data.seats[(mySeatIndex + 1) % 8]);
          oppSeat2.FillFromSeatData(msg.data.seats[(mySeatIndex + 2) % 8]);
          oppSeat3.FillFromSeatData(msg.data.seats[(mySeatIndex + 3) % 8]);
          oppSeat4.FillFromSeatData(msg.data.seats[(mySeatIndex + 4) % 8]);
          oppSeat5.FillFromSeatData(msg.data.seats[(mySeatIndex + 5) % 8]);
          oppSeat6.FillFromSeatData(msg.data.seats[(mySeatIndex + 6) % 8]);
          oppSeat7.FillFromSeatData(msg.data.seats[(mySeatIndex + 7) % 8]);

        }
      }
    };

    // Keep sending messages at every 0.3s
    // InvokeRepeating("SendWebSocketMessage", 0.0f, 0.3f);

    

    // waiting for messages
    await websocket.Connect();
  }

  void Update()
  {
    #if !UNITY_WEBGL || UNITY_EDITOR
      websocket.DispatchMessageQueue();
    #endif
  }

  public async void SendWebSocketMessage(Byte[] message)
  {
    if (websocket.State == WebSocketState.Open)
    {
      // Sending plain text
      await websocket.Send(message);
    }
  }

  private async void OnApplicationQuit()
  {
    await websocket.Close();
  }
}
