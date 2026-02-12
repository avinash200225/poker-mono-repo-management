using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class TableRailController : MonoBehaviour
{
    public WebSocketManager wc;

    public Image imgBG;
    public Image imgBGShadow;
    public Image imgFelt;
    public Image imgLight;
    public Image imgCardHighlight;

    public Sprite feltNoLimit;
    public Sprite feltFixedLimit;
    public Sprite feltPotLimit;
    public Sprite lightNoLimit;
    public Sprite lightFixedLimit;
    public Sprite lightPotLimit;
    public Sprite omahaBG;
    public Sprite holdemBG;
    public Sprite omahaBGShadow;
    public Sprite holdemBGShadow;

    public TextMeshProUGUI txtSeatNo;

    private void OnEnable()
    {
        wc = FindAnyObjectByType<WebSocketManager>();
    }

    void Start()
    {
        //Listen to OnPokrtVariantChange
        wc.configState.OnPokerVariantChangeAction += UpdateGameVariant;
        wc.configState.OnBetLimitChangeAction += UpdateGameVariant;

        SetSeatNo();
    }

    void UpdateGameVariant()
    {
        Debug.Log("wc.configState.pokerVariant : " + wc.configState.pokerVariant);
        switch (wc.configState.pokerVariant)
        {
            case "Omaha":
                imgBG.sprite = omahaBG;
                imgBGShadow.sprite = omahaBGShadow;

                // ColorUtility.TryParseHtmlString("#006EFF", out Color omahaColor);
                // imgFelt.color = omahaColor;
                // imgCardHighlight.color = omahaColor;

                // ColorUtility.TryParseHtmlString("#0074FF", out Color omahaColorLight);
                // imgLight.color = omahaColorLight;
                break;
            case "Texas":
                imgBG.sprite = holdemBG;
                imgBGShadow.sprite = holdemBGShadow;
                // ColorUtility.TryParseHtmlString("#FFFFFFFF", out Color texasColor);
                // imgFelt.color = texasColor;
                // imgLight.color = texasColor;
                break;
            default:
                break;
        }

        Debug.Log("wc.configState.betLimit : " + wc.configState.betLimit);
        switch (wc.configState.betLimit)
        {
            case "No Limit":
                imgFelt.sprite = feltNoLimit;
                imgLight.sprite = lightNoLimit;
                break;
            case "Pot Limit":
                imgFelt.sprite = feltPotLimit;
                imgLight.sprite = lightPotLimit;
                break;
            case "Limit":
                imgFelt.sprite = feltFixedLimit;
                imgLight.sprite = lightFixedLimit;
                break;
            default:
                break;
        }
        SetSeatNo();
    }

    public void SetSeatNo()
    {
        string[] splits = GlobalVariables.Instance.seat.Split(".");
        string seatNo = splits[splits.Length - 1];

        txtSeatNo.text = seatNo;   
    }
}
