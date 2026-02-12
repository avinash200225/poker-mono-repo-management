using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TMPro;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;

public class BetPanelController : MonoBehaviour
{

    public static BetPanelController Instance;

    [Header("External Compoents")]
    [SerializeField] WebSocketManager wc;
    [SerializeField] AudioSource coinPressSound;
    [SerializeField] AudioSource buttonPressSound;
    [SerializeField] AudioSource playerTurnSound;

    [Header("Child Panels")]
    public RectTransform coinPanelObj;
    public RectTransform buttonPanelObj;

    [Header("Child Buttons")]
    public Button BetBtn;
    public Button RaiseBtn;

    public Button AllInBtn;
    public Button FoldBtn;
    public Button CheckBtn;
    public Button CallBtn;
    public Button ResetBtn;

    [Serializable]
    public class CoinType {
        public Button[] buttons;
        public TextMeshProUGUI[] texts;
    }

    public List<CoinType> coinTypeList = new List<CoinType>();

    public Text BetBtnTxt;
    public Text RaiseBtnTxt;
    public Text AllInBtnTxt;
    public Text CallBtnTxt;
    
    //Key is Coint Type, Value is Count
    private Dictionary<int,int> coinData = new Dictionary<int, int>();
    private int[] coinConfig = {500,25,5,1};
    int userSelectedAmount = 0;

    void Awake() {
        Setup();
        Configure();
    }

    void Setup()
    {
        Instance = this;
        wc = FindAnyObjectByType<WebSocketManager>();

        if (BetBtn == null)
            BetBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("BetBtn"));
        if (BetBtnTxt == null)
            BetBtnTxt = GetComponentsInChildren<Text>(includeInactive: true).ToList().Find(x => x.name.Contains("BetBtnTxt"));
        if (RaiseBtn == null)
            RaiseBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("RaiseBtn"));
        if (RaiseBtnTxt == null)
            RaiseBtnTxt = GetComponentsInChildren<Text>(includeInactive: true).ToList().Find(x => x.name.Contains("RaiseBtnTxt"));
        if (AllInBtn == null)
            AllInBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("AllInBtn"));
        if (AllInBtnTxt == null)
            AllInBtnTxt = GetComponentsInChildren<Text>(includeInactive: true).ToList().Find(x => x.name.Contains("AllInBtnTxt"));
        if (FoldBtn == null)
            FoldBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("FoldBtn"));
        if (CheckBtn == null)
            CheckBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("CheckBtn"));
        if (CallBtn == null)
            CallBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("CallBtn"));
        if (CallBtnTxt == null)
            CallBtnTxt = GetComponentsInChildren<Text>(includeInactive: true).ToList().Find(x => x.name.Contains("CallBtnTxt"));
        if (ResetBtn == null)
            CallBtn = GetComponentsInChildren<Button>(includeInactive: true).ToList().Find(x => x.name.Contains("ResetBtn"));

        PrepareCoinViewAndData();
    }

    private void PrepareCoinViewAndData(){
        for(int i=0;i<coinConfig.Length;i++){
            coinData.Add(coinConfig[i],0);
            
            for(int j=0;j<coinTypeList[i].texts.Length;j++){
                coinTypeList[i].texts[j].text = "x"+coinData.Keys.ElementAt(i);
            }
        }
    }

    void Configure() {
        UpdateCoinObjects();
        // BetBtnTxt.colorGradientPreset = goldGradient;
        // RaiseBtnTxt.colorGradientPreset = goldGradient;
    }
    // Start is called before the first frame update
    void Start()
    {
        wc.mySeat.OnBalanceChange += HandleBalanceChange;
        // wc.mySeat.OnBalanceChange += UpdateAllInButton;

        wc.tableState.OnBetAmountChanged += UpdateBetButton;
        wc.tableState.OnRaiseAmountChanged += UpdateRaiseButton;

        wc.mySeat.OnActionsModified += HandleActionsChanged;
        wc.mySeat.OnTurnStatusChanged += UpdateTurnStatus;
        wc.mySeat.OnWinAmountChanged += UpdateWin;

        BetBtn.onClick.AddListener(() => HandleBetButtonPressed("BetBtn"));
        RaiseBtn.onClick.AddListener(() => HandleBetButtonPressed("RaiseBtn"));

        AllInBtn.onClick.AddListener(() => HandleBetButtonPressed("AllInBtn"));
        FoldBtn.onClick.AddListener(() => HandleBetButtonPressed("FoldBtn"));
        CheckBtn.onClick.AddListener(() => HandleBetButtonPressed("CheckBtn"));
        CallBtn.onClick.AddListener(() => HandleBetButtonPressed("CallBtn"));
        ResetBtn.onClick.AddListener(() => HandleResetButtonPressed());

        for (int i = 0; i < coinTypeList.Count; i++)
        {
            for (int j = 0; j < coinTypeList[i].buttons.Length; j++)
            {
                // Debug.Log("i="+i + " j="+j);
                int num = i;
                coinTypeList[i].buttons[j].onClick.AddListener(() => HandleCoinButtonPressed(coinConfig[num]));
            }
        }
        
        UpdateTurnStatus();
    }

    private void UpdateWin()
    {
        Invoke("InvokeUpdateWin", 0.01f);
    }

    private void InvokeUpdateWin()
    {
        coinPanelObj.gameObject.SetActive(false);
        ResetBtn.gameObject.SetActive(false);
    }

    void UpdateTurnStatus()
    {
        if (wc.mySeat.isTurn)
        {
            if (!(wc.configState.betLimit.Equals("Fixed Limit") || wc.configState.betLimit.Equals("Limit")))
            {
                coinPanelObj.gameObject.SetActive(true);
                ResetBtn.gameObject.SetActive(true);
            }
            buttonPanelObj.gameObject.SetActive(true);
        }
        else
        {
            buttonPanelObj.gameObject.SetActive(false);
            coinPanelObj.gameObject.SetActive(false);
            ResetBtn.gameObject.SetActive(false);
        }
    }

    void HandleActionsChanged() {
        // UpdateCoinCounts();
        UpdateCoinObjects();
    }

    void HandleBetButtonPressed(string btnName)
    {
        byte[] msgBytes;
        buttonPressSound.Play();
        switch (btnName)
        {
            case "AllInBtn":
                var allInMessage = new PokerBetMessage(MessageType: "ALL_IN", uid: $"{wc.myDevice.ClientId}");
                msgBytes = Encoding.UTF8.GetBytes(allInMessage.SaveToString());
                // wc.SendWebSocketMessage(msgBytes);
                StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                break;
            case "FoldBtn":
                var foldMessage = new PokerBetMessage(MessageType: "FOLD_HAND", uid: $"{wc.myDevice.ClientId}");
                msgBytes = Encoding.UTF8.GetBytes(foldMessage.SaveToString());
                // wc.SendWebSocketMessage(msgBytes);
                StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                break;
            case "CheckBtn":
                var checkMessage = new PokerBetMessage(MessageType: "CHECK_HAND", uid: $"{wc.myDevice.ClientId}");
                msgBytes = Encoding.UTF8.GetBytes(checkMessage.SaveToString());
                // wc.SendWebSocketMessage(msgBytes);
                StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                break;
            case "CallBtn":
                var callMessage = new PokerBetMessage(MessageType: "CALL_HAND", uid: $"{wc.myDevice.ClientId}");
                msgBytes = Encoding.UTF8.GetBytes(callMessage.SaveToString());
                // wc.SendWebSocketMessage(msgBytes);
                StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                break;

            case "BetBtn":
                if (userSelectedAmount + (int)wc.tableState.betAmount >= wc.mySeat.balance)
                {
                    allInMessage = new PokerBetMessage(MessageType: "ALL_IN", uid: $"{wc.myDevice.ClientId}");
                    msgBytes = Encoding.UTF8.GetBytes(allInMessage.SaveToString());
                    // wc.SendWebSocketMessage(msgBytes);
                    StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                }
                else
                {
                    var betMessage = new PokerBetMessage(MessageType: "BET_HAND", uid: $"{wc.myDevice.ClientId}", amount: userSelectedAmount + (int)wc.tableState.betAmount);
                    msgBytes = Encoding.UTF8.GetBytes(betMessage.SaveToString());
                    // wc.SendWebSocketMessage(msgBytes);
                    StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                }

                break;
            case "RaiseBtn":
                if (userSelectedAmount + (int)wc.tableState.raiseAmount >= wc.mySeat.balance)
                {
                    allInMessage = new PokerBetMessage(MessageType: "ALL_IN", uid: $"{wc.myDevice.ClientId}");
                    msgBytes = Encoding.UTF8.GetBytes(allInMessage.SaveToString());
                    // wc.SendWebSocketMessage(msgBytes);
                    StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                }
                else
                {
                    var raiseMessage = new PokerBetMessage(MessageType: "RAISE_HAND", uid: $"{wc.myDevice.ClientId}", amount: userSelectedAmount + (int)wc.tableState.raiseAmount);
                    msgBytes = Encoding.UTF8.GetBytes(raiseMessage.SaveToString());
                    // wc.SendWebSocketMessage(msgBytes);
                    StartCoroutine(SendDelayedWebSocketMessage(msgBytes));
                }
                break;
            default:
                break;
        }

        userSelectedAmount = 0;
        UpdateCoinObjects();
        UpdateBetButton();
        UpdateRaiseButton();
    }

    private IEnumerator SendDelayedWebSocketMessage(byte[] msgBytes)
    {
        yield return null;
        wc.SendWebSocketMessage(msgBytes);
    }

    void HandleCoinButtonPressed(int coinValue) {
        coinPressSound.Play();
        userSelectedAmount += coinValue;
        
        UpdateCoinObjects();
        UpdateBetButton();
        UpdateRaiseButton();
    }

    private void HandleResetButtonPressed()
    {
        userSelectedAmount = 0;
        UpdateCoinObjects();
        UpdateBetButton();
        UpdateRaiseButton();
    }


    void HandleBalanceChange() {    
        UpdateCoinObjects();
    }

    void UpdateBetButton() {
        BetBtnTxt.text = "$"+(userSelectedAmount + wc.tableState.betAmount);
        BetBtnTxt.text =  "$" + (userSelectedAmount + wc.tableState.betAmount);
        CallBtnTxt.text = "$" + wc.tableState.betAmount;
        AllInBtnTxt.text = "$" + wc.mySeat.balance;
    }
    void UpdateRaiseButton() {
        BetBtnTxt.text = "$" + (userSelectedAmount + wc.tableState.raiseAmount);
        RaiseBtnTxt.text = "$" + (userSelectedAmount + wc.tableState.raiseAmount);
        CallBtnTxt.text = "$" + wc.tableState.betAmount;
        AllInBtnTxt.text = "$" + wc.mySeat.balance;
    }

    private void RefreshCoinData(int balance)
    {
        int tempBalance = balance;
        for (int i = 0; i < coinData.Count; i++)
        {
            int key = coinData.Keys.ElementAt(i);
            coinData[key] = tempBalance / key;
            tempBalance = tempBalance % key;
            Debug.Log("Coins key : " + key + " Value : " + coinData[key]);
        }

        MakeSmallDenomCoins(balance);
        
    }

    private void MakeSmallDenomCoins(int balance)
    {
        if (balance < 0)
            return;
        CheckPreviousCoin(coinData.Count - 1, balance);
    }

    private void CheckPreviousCoin(int i, int balance)
    {
        int key = coinData.Keys.ElementAt(i);
        if (coinData[key] <= 0)
        {
            if (balance >= coinData.Keys.ElementAt(i - 1))
            {
                coinData[key] = coinData[key] + coinData.Keys.ElementAt(i - 1) / key;
                coinData[coinData.Keys.ElementAt(i - 1)] -= 1;
            }
        }
        
        i--;
        if(i>0)
            CheckPreviousCoin(i, balance);
    }

    void UpdateCoinObjects()
    {
        if (wc.configState == null)
        {
            Debug.Log("wc.configState is null");
            return;
        }
        Debug.Log("wc.configState : "+ wc.configState.betLimit);

        if (wc.configState.betLimit.Equals("Fixed Limit") || wc.configState.betLimit.Equals("Limit"))
            return;
            
        int coinBalance = 0;
        try
        {
            if (wc.configState.betLimit.Equals("Pot Limit"))
            {
                coinBalance = (int)(wc.tableState.potLimit - (userSelectedAmount + (int)wc.tableState.raiseAmount));
            }
            else
            {
                coinBalance = (int)(wc.mySeat.balance - (userSelectedAmount + (int)wc.tableState.raiseAmount));
            }
            Debug.Log("Coin Balance : " + coinBalance);
        }
        catch (Exception e)
        {
            Debug.Log(e.StackTrace);
        }
        if (coinBalance < 0)
            return;

        RefreshCoinData(coinBalance);

        for (int i = 0; i < coinData.Count; i++)
        {
            int key = coinData.Keys.ElementAt(i);
            Debug.Log("Coins key : " + key + " Value : " + coinData[key]);
            for (int j = 0; j < 5; j++)
            {
                if (j < coinData[key])
                {
                    coinTypeList[i].buttons[j].gameObject.SetActive(true);
                }
                else
                {
                    coinTypeList[i].buttons[j].gameObject.SetActive(false); ;
                }
            }
        }     
    }


}

