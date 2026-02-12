using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class TableState 
{
    public event Action OnTableStateChanged;
    public event Action OnRoundIdChanged;
    public event Action OnActionChanged;
    public event Action OnStageChanged;
    public event Action OnBetAmountChanged;
    public event Action OnRaiseAmountChanged;
    public event Action OnPotAmountChanged;
    public event Action OnPotLimitChanged;
    public event Action OnWinnersChanged;
    public event Action OnGameCardsChanged;
    public event Action OnSidePotsChanged;


    private long _roundId;
    public long roundId {get{ return _roundId;} set{if(_roundId != value) {_roundId = value; OnRoundIdChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private string _action;
    public string action {get{return _action;} set{if(_action != value) {_action = value; OnActionChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private string _stage;
    public string stage {get{return _stage;} set{if(_stage != value){_stage = value; OnStageChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private double _betAmount;
    public double betAmount{get{return _betAmount;} set{if(_betAmount != value){_betAmount = value; OnBetAmountChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private double _raiseAmount;
    public double raiseAmount{get{return _raiseAmount;} set{if(_raiseAmount != value){_raiseAmount = value; OnRaiseAmountChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private double _potAmount;
    public double potAmount{get{return _potAmount;} set{if(_potAmount != value){_potAmount = value; OnPotAmountChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    private double _potLimit;
    public double potLimit{get{return _potLimit;} set{if(_potLimit != value){_potLimit = value; OnPotLimitChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}

    private List<Winner> _winners;
    public List<Winner> winners{
        get{return _winners;} 
        set{
            if(_winners == null || (!_winners.SequenceEqual(value))){
                _winners = value; 
                OnWinnersChanged?.Invoke(); 
                OnTableStateChanged?.Invoke();
            }
        }
    }

    private List<string> _gameCards;
    public List<string> gameCards{get{return _gameCards;} set{if(_gameCards == null || !_gameCards.SequenceEqual(value)){_gameCards = value; OnGameCardsChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}
    
    private List<SidePot> _sidePots;
    public List<SidePot> sidePots{get{return _sidePots;} set{if(_sidePots == null || !_sidePots.SequenceEqual(value)){_sidePots = value; OnSidePotsChanged?.Invoke(); OnTableStateChanged?.Invoke();}}}

    public TableState(
        long roundId = 1,
        string action = "",
        string stage ="1",
        double betAmount = 0.0,
        double raiseAmount = 0.0,
        double potAmount = 0.0,
        double potLimit = 0.0,
        List<Winner> winners = null,
        List<string> gameCards = null,
        List<SidePot> sidePots = null
    ) {
        this.roundId = roundId;
        this.action = action;
        this.stage = stage;
        this.betAmount = betAmount;
        this.raiseAmount = raiseAmount;
        this.potAmount = potAmount;
        this.potLimit = potLimit;
        this.winners = winners ?? new List<Winner>();
        this.gameCards = gameCards ?? new List<string>();
        this.sidePots = sidePots ?? new List<SidePot>();
    }

    public void CopyFromTable(TableData tableData){
        this.roundId = tableData.roundId;
        this.action = tableData.action;
        this.stage = tableData.stage;
        this.betAmount = tableData.betAmount;
        this.raiseAmount = tableData.raiseAmount;
        this.potAmount = tableData.potAmount;
        this.potLimit = tableData.potLimit;
        this.winners = tableData.winners ?? new List<Winner>();
        this.gameCards = tableData.gameCards ?? new List<string>();
        this.sidePots = tableData.sidePots ?? new List<SidePot>();
    }
    public void CopyToTable(TableData tableData){
        tableData.roundId = roundId;
        tableData.action = action;
        tableData.stage = stage;
        tableData.betAmount = betAmount;
        tableData.raiseAmount = raiseAmount;
        tableData.potAmount = potAmount;
        tableData.potLimit = potLimit;
        tableData.winners = winners;
        tableData.gameCards = gameCards;
        tableData.sidePots = sidePots;
    }

}
