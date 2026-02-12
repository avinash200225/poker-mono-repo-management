using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UIElements;
public class Screen : MonoBehaviour
{
    TextField IpAddress;
    TextField Port;
    TextField Seat;

    Button Done;
    StyleColor NormalColor;

    GameDataController gameDataManager;

    private void Awake() {
        //Make a reference to gameDataManager object 
        gameDataManager = FindAnyObjectByType<GameDataController>();
    }
    private void OnEnable() {
        VisualElement root = GetComponent<UIDocument>().rootVisualElement;
        IpAddress = root.Q<TextField>("IpAddress");
        Port = root.Q<TextField>("Port");
        Seat = root.Q<TextField>("Seat");
        Done = root.Q<Button>("Done");

        NormalColor = Done.style.color;   
        Done.clickable.clicked += OnClickEventOnDoneButton;
    }

    private void OnClickEventOnDoneButton() {
        if(IsValidIpAddress(IpAddress.text) && 
            IsValidPort(Port.text) &&
            IsValidSeat(Seat.text) 
        ) {
            IpAddress.style.color = NormalColor;
            Port.style.color = NormalColor;
            Seat.style.color = NormalColor;
            Debug.Log("Proper Fields...:-)" + IpAddress.text + Port.text + Seat.text);
            gameDataManager.WriteGameData(IpAddress.text, Port.text, Seat.text);
        } else {
            Debug.Log("Improper Fields... :-(" + IpAddress.text + Port.text + Seat.text);

            if(!IsValidIpAddress(IpAddress.text)) {
                IpAddress.style.color = Color.red;
            } else {
                IpAddress.style.color = NormalColor;
            }
            if(!IsValidPort(Port.text)) Port.style.color = Color.red;else Port.style.color = NormalColor;
            if(!IsValidIpAddress(Seat.text)) Seat.style.color = Color.red;else Seat.style.color = NormalColor;
        }
    }

    private bool IsValidIpAddress(string InputText) {
        bool valid = false;
        if(InputText != null) {
            Debug.Log($"IsValidIpAddress? {InputText}");
            System.Net.IPAddress address;
            if (System.Net.IPAddress.TryParse(IpAddress.text, out address))
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
            Debug.Log($"IsValidPort? {PortText}");
            int n;
            bool isNumeric = int.TryParse(PortText, out n);
            if(isNumeric) {
                if((n > 999) && (n < 10000)) valid = true;
            }

        }
        return valid;

    }

    private bool IsValidSeat(string SeatText) {
        bool valid = false;
        if(SeatText != null) {
            Debug.Log($"IsValidSeat? {SeatText}");
            int n;
            bool isNumeric = int.TryParse(SeatText, out n);
            if(isNumeric) {
                if((n > 0) && (n < 9)) valid = true;
            }

        }
        return valid;
    }

}
