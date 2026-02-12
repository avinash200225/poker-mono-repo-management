using System;

[System.Serializable]
public class Device
{
    public event Action OnClientIdChanged;
    public event Action OnConnectionStatusChange;

    private bool _connected;
    public bool connected {
        get {return _connected;}
        set {
            if(value != _connected) {
                _connected = value;
                OnConnectionStatusChange?.Invoke();
            }
        }
    }
    private string clientId;
    public string ClientId{ 
        get{ return clientId;} 
        set{ 
            if(value !=clientId) {
                clientId = value; 
                OnClientIdChanged?.Invoke();
            }
        }
    }

    public Device(string clientId = "-1", bool connected = true ) {
        this.clientId = clientId;
        this.connected = connected;
    }

}
