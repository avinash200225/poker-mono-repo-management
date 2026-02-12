using System;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Sample Seat Data", order = 2, fileName = "Seat Data")]
public class SeatDataSO : ScriptableObject
{
    public string Name;
    public double balance;
    public bool connected;
    public double winAmount;
    public bool isTurn;
    public string gameStatus;
    public bool isDealer;
    public bool isSmallBet;
    public bool isBigBet;
    public bool isPlaying;
    public List<string> cards;
    public List<double> bets;
    public List<bool> actions;


}
