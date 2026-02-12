using System.Collections;
using System.Collections.Generic;
using System.Net;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class SetupUIController : MonoBehaviour
{

    [Header("Internal UI Elements")]
    [SerializeField] TMP_InputField ipAddress;
    [SerializeField] TMP_InputField port;
    [SerializeField] TMP_InputField seat;
    [SerializeField] Button doneBtn;


    GameDataController gameDataManager;

    private void Awake() {
        //Make a reference to gameDataManager object 
        gameDataManager = FindAnyObjectByType<GameDataController>();
    }

    void Start() {
        doneBtn.onClick.AddListener(TaskOnClick);
    }

    void TaskOnClick() {
        
        if(IsValidIpAddress(ipAddress.text) && 
            IsValidPort(port.text) &&
            IsValidSeat(seat.text) 
        ) {
            Debug.Log("Proper Fields...:-)" + ipAddress.text + port.text + seat.text);
            gameDataManager.WriteGameData(ipAddress.text, port.text, seat.text);
        } else {
            Debug.Log("Improper Fields... :-(" + ipAddress.text + port.text + seat.text);
            if(!IsValidIpAddress(ipAddress.text)) {}
            if(!IsValidPort(port.text)) {}
            if(!IsValidIpAddress(seat.text)) {}
        }

    }



    private bool IsValidIpAddress(string InputText) {
        bool valid = false;
        if(InputText != null) {
            IPAddress address;
            if (IPAddress.TryParse(InputText, out address))
            {
                switch (address.AddressFamily)
                {
                    case System.Net.Sockets.AddressFamily.InterNetwork:
                        // we have IPv4
                        valid = true;
                        break;
                    case System.Net.Sockets.AddressFamily.InterNetworkV6:
                        // we have IPv6
                        valid = true;
                        break;
                    default:
                        // umm... yeah... I'm going to need to take your red packet and...
                        break;
                }
            } 
        }
        return valid;
    }
    private bool IsValidPort(string PortText) {
        bool valid = false;
        if(PortText != null) {
            int port;
            bool isNumeric = int.TryParse(PortText, out port);
            if(isNumeric) {
                if((port > 999) && (port < 10000)) valid = true;
            }

        }
        return valid;

    }

    private bool IsValidSeat(string SeatText) {
        bool valid = false;
        if(SeatText != null) {
            int seatId;
            bool isNumeric = int.TryParse(SeatText, out seatId);
            if(isNumeric) {
                if((seatId > 0) && (seatId < 9)) valid = true;
            }

        }
        return valid;
    }
    
}
