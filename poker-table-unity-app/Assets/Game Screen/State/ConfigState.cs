using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class ConfigState
{

    public event Action OnPokerVariantChangeAction;
    public event Action OnBetLimitChangeAction;
    public event Action OnLiveDealerChangeAction;


    private string _pokerVariant;
    public string pokerVariant{
        get {return _pokerVariant;} 
        set{
            if(_pokerVariant != value) {
                _pokerVariant = value; 
                OnPokerVariantChangeAction ?.Invoke();
            }
            
        }
    }
    private string _betLimit{get; set;}
    public string betLimit{
        get {return _betLimit;} 
        set{
            if(_betLimit != value) {
                _betLimit = value; 
                OnBetLimitChangeAction ?.Invoke();
            }
        }
    }

    private bool _liveDealer;
    public bool liveDealer{get { return _liveDealer;} set {if(_liveDealer != value) {_liveDealer = value; OnLiveDealerChangeAction?.Invoke();}}}
    
    public int rakePercent{get; set;}
    public int blind{get; set;}

    public ConfigState(
        string pokerVariant = "Omaha",
        string betLimit = "Limit",
        bool liveDealer = true,
        int rakePercent = 0,
        int blind = 100
    ) {
        this.pokerVariant = pokerVariant;
        this.betLimit = betLimit;
        this.liveDealer = liveDealer;
        this.rakePercent = rakePercent;
        this.blind = blind;

    }

    public void CopyFromConfig(ConfigData data){
        this.pokerVariant = data.pokerVariant;
        this.betLimit = data.betLimit;
        this.liveDealer = data.liveDealer;
        this.rakePercent = data.rakePercent;
        this.blind = data.blind;
    }

}
