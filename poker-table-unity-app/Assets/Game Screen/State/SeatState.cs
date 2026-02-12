using System;
using System.Collections.Generic;
using UnityEngine;
using System.Collections;
using System.Linq;

[System.Serializable]
public record SeatState
{
    public delegate void AttributeChangeDelegate();

    public event AttributeChangeDelegate OnSeatStateChanged;
    public event AttributeChangeDelegate OnNameChange;
    public event AttributeChangeDelegate OnBalanceChange;
    public event AttributeChangeDelegate OnCardDraw;
    public event AttributeChangeDelegate OnCardPack;
    public event AttributeChangeDelegate OnBetsModified;
    public event AttributeChangeDelegate OnActionsModified;
    public event AttributeChangeDelegate OnGameStatusChange;
    public event AttributeChangeDelegate OnDealerStatusChanged;
    public event AttributeChangeDelegate OnSmallBlindStatusChanged;
    public event AttributeChangeDelegate OnBigBlindStatusChanged;
    public event AttributeChangeDelegate OnPlayingStatusChanged;
    public event AttributeChangeDelegate OnTurnStatusChanged;

    public event AttributeChangeDelegate OnWinAmountChanged;


    public int id;
    private string _name;
    public string name {get{return _name;} set{if(_name != value) {_name = value; OnNameChange?.Invoke();OnSeatStateChanged?.Invoke();}}}
    public string ip;
    public string hint;
    private double _balance;
    public double balance {get{return _balance;} set{if(_balance != value) {_balance = value; OnBalanceChange?.Invoke();OnSeatStateChanged?.Invoke();}}}
    public string uid; 
    public bool connected;
    public double totalBet;

    private double _winAmount;
    public double winAmount {
        get {return _winAmount;}
        set {if(_winAmount != value) {_winAmount = value; OnWinAmountChanged?.Invoke();OnSeatStateChanged?.Invoke(); }}
    }
    
    public double lastWin;
    public List<SeatHistory> history;
    public List<Bet>  betList;
    public List<WinBet> winningBets;

    private bool _isTurn;
    public bool isTurn{
        get {return _isTurn;}
        set {if(_isTurn != value) {_isTurn = value; OnTurnStatusChanged?.Invoke();OnSeatStateChanged?.Invoke();}}
    }
    private string _gameStatus;
    public string gameStatus{
        get{return _gameStatus;}
        set{_gameStatus = value; OnGameStatusChange?.Invoke();OnSeatStateChanged?.Invoke();}
    }
    private bool _isDealer;
    public bool isDealer{
        get {return _isDealer;}
        set {if(_isDealer != value) {_isDealer = value; OnDealerStatusChanged?.Invoke();OnSeatStateChanged?.Invoke();}}
    }

    private bool _isSmallBet;
    public bool isSmallBet{
        get {return _isSmallBet;}
        set {if(_isSmallBet != value) {_isSmallBet = value; OnSmallBlindStatusChanged?.Invoke();OnSeatStateChanged?.Invoke();}}
    }

    private bool _isBigBet;
    public bool isBigBet{
        get {return _isBigBet;}
        set {if(_isBigBet != value) {_isBigBet = value; OnBigBlindStatusChanged?.Invoke();OnSeatStateChanged?.Invoke();}}
    }

    private bool _isPlaying;
    public bool isPlaying{
        get {return _isPlaying;}
        set {
            if(_isPlaying != value) {
            _isPlaying = value; 
            OnBigBlindStatusChanged?.Invoke();OnSeatStateChanged?.Invoke();
            }
        }
    }
    
    private List<string> _cards;
    public List<string> cards
    {
        get { return _cards; }
        set
        {
            _cards = value;
            OnCardDraw?.Invoke(); OnSeatStateChanged?.Invoke();
        }
    }

    private List<double> _bets;
    public List<double> bets{
        get{ return _bets;}
        set {
            _bets = value;
            OnBetsModified?.Invoke();OnSeatStateChanged?.Invoke();
        }
    }
    private List<bool> _actions;
    public List<bool> actions{
        get{ return _actions;}
        set {
            _actions = value;
            OnActionsModified?.Invoke();OnSeatStateChanged?.Invoke();
        }
    }


    public SeatState(
        int id = -1,
        string name = "",
        string ip = "",
        string hint = "",
        double balance = 0.0,
        string uid = "",
        bool connected = false,
        double totalBet = -1.0,
        double winAmount = 0,
        double lastWin = 0,
        List<SeatHistory> history = null,
        List<Bet>  betList = null,
        List<WinBet> winningBets = null,
        bool isTurn = false,
        string gameStatus = "",
        bool isDealer = false,
        bool isSmallBet = false,
        bool isBigBet = false,
        bool isPlaying = false,
        List<string> cards = null,
        List<double> bets = null,
        List<bool> actions = null
    ) {
        this.id = id;
        this.name = name;
        this.ip = ip;
        this.hint = hint;
        this.balance = balance;
        this.uid = uid;
        this.connected = connected;
        this.totalBet = totalBet;
        this.winAmount = winAmount;
        this.lastWin = lastWin;
        this.history = history ?? new List<SeatHistory>();
        this.betList = betList ?? new List<Bet>();
        this.winningBets = winningBets ?? new List<WinBet>();
        this.isTurn = isTurn;
        this.gameStatus = gameStatus;
        this.isDealer = isDealer;
        this.isSmallBet = isSmallBet;
        this.isBigBet = isBigBet;
        this.isPlaying = isPlaying;
        this.cards = cards ?? new List<string>();
        this.bets  = bets ?? new List<double>{0, 0, 0, 0};
        this.actions = actions ?? new List<bool>{false, false, false, false, false, false};

    }
    public void FillFromSeatData(Seat seat) {
        this.id = seat.id;
        this.name = seat.name;
        this.ip = seat.ip;
        this.hint = seat.hint;
        this.balance = seat.balance;
        this.uid = seat.uid;
        this.connected = seat.connected;
        this.totalBet = seat.totalBet;
        this.winAmount = seat.winAmount;
        this.lastWin = seat.lastWin;
        this.history = seat.history ?? new List<SeatHistory>();
        this.betList = seat.betList ?? new List<Bet>();
        this.winningBets = seat.winningBets ?? new List<WinBet>();
        this.isTurn = seat.isTurn;
        this.gameStatus = seat.gameStatus;
        this.isDealer = seat.isDealer;
        this.isSmallBet = seat.isSmallBet;
        this.isBigBet = seat.isBigBet;
        this.isPlaying = seat.isPlaying;
        this.cards = seat.cards ?? new List<string>();
        this.bets  = seat.bets ?? new List<double>{0, 0, 0, 0};
        this.actions = seat.actions ?? new List<bool>{false, false, false, false, false, false};
    }
    public void CopyToSeatData(Seat seat) {
        seat.id = id;
        seat.name = name;
        seat.ip = ip;
        seat.hint = hint;
        seat.balance = balance;
        seat.uid = uid;
        seat.connected = connected;
        seat.totalBet = totalBet;
        seat.winAmount = winAmount;
        seat.lastWin = lastWin;
        seat.history = history ;
        seat.betList = betList;
        seat.winningBets = winningBets;
        seat.isTurn = isTurn;
        seat.gameStatus = gameStatus;
        seat.isDealer = isDealer;
        seat.isSmallBet = isSmallBet;
        seat.isBigBet = isBigBet;
        seat.isPlaying = isPlaying;
        seat.cards = cards;
        seat.bets = bets;
        seat.actions = actions;
    }

    public string SaveToString()
    {
        return JsonUtility.ToJson(this);
    }
}
