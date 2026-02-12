using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

[Serializable]
public class Pot {
    public Image PotImage;
    public Text Amount;
    public TextMeshProUGUI[] ids;
}

public class MainPotController : MonoBehaviour
{
    [Header("External Dependancy")]
    [SerializeField] WebSocketManager wc;

    [Header("Child Elements")]
    public List<Pot> MainPots = new List<Pot>();

    public List<Pot> SidePots = new List<Pot>();

    public Text txtPotLimit;
    int currentPotLimit = 0;

    [SerializeField] AudioSource coinsSound;

    public GameObject particleEffect;

    int curAmount = 0;
    int[] curSidePotAmount = {0,0,0,0,0,0,0};

    // Start is called before the first frame update
    void Start()
    {
        Init();
        
    }

    void Init() {
        wc = FindAnyObjectByType<WebSocketManager>();

        wc.tableState.OnPotAmountChanged += UpdatePotAmount;
        wc.tableState.OnSidePotsChanged += UpdateSidePotsAmount;
        wc.tableState.OnPotLimitChanged += UpdatePotLimit;

    }

    void UpdatePotAmount()
    {
        Sequence sequence = DOTween.Sequence();
        Tween tween = MainPots[0].Amount.DOCounter(fromValue: curAmount, endValue: (int)wc.tableState.potAmount, duration: 1f, addThousandsSeparator: true, culture: null);
        sequence.Append(tween);
        sequence.SetLoops(1);

        curAmount = (int)wc.tableState.potAmount;
        Debug.Log("UpdatePotAmount curAmount : " + curAmount);

        if (curAmount > 0)
        {
            // Pots[0].PotImage.enabled = true;
            MainPots[0].Amount.gameObject.SetActive(true);
        }
        else
        {
            // Pots[0].PotImage.enabled = false;
            MainPots[0].Amount.gameObject.SetActive(false);
            currentPotLimit = 0;
            txtPotLimit.text = "$0";

            for(int i = 0; i < SidePots.Count; i++)
            {
                SidePots[i].PotImage.gameObject.SetActive(false);
            }
        }
    }

    private void UpdatePotLimit()
    {
        if (!wc.configState.betLimit.Equals("No Limit"))
        {
            if (wc.tableState.potLimit > 0)
            {
                Sequence sequence = DOTween.Sequence();
                Tween tween = txtPotLimit.DOCounter(fromValue: currentPotLimit, endValue: (int)wc.tableState.potLimit, duration: 1.0f, addThousandsSeparator: true, culture: null);
                sequence.Append(tween);
                sequence.SetLoops(1);

                currentPotLimit = (int)wc.tableState.potLimit;
            }
            txtPotLimit.gameObject.transform.parent.gameObject.SetActive(true);
        }else
        {
            txtPotLimit.gameObject.transform.parent.gameObject.SetActive(false);
        }
    }

    private void UpdateSidePotsAmount()
    {
        for (int i = 0; i < (int)wc.tableState.sidePots.Count; i++)
        {
            Sequence sequence = DOTween.Sequence();
            int sidePotAmount = (int)wc.tableState.sidePots[i].capAmount * wc.tableState.sidePots[i].ids.Length + (int)wc.tableState.sidePots[i].foldAmount;
            Tween tween = SidePots[i].Amount.DOCounter(fromValue: curSidePotAmount[i], endValue: sidePotAmount, duration: 1f, addThousandsSeparator: true, culture: null);
            sequence.Append(tween);
            sequence.SetLoops(1);

            curSidePotAmount[i] = (int)wc.tableState.sidePots[i].capAmount;
            Debug.Log("UpdateSidePotAmount curSidePotAmount[i] : " + curSidePotAmount[i] + "    i = " + i);

            if (curSidePotAmount[i] > 0)
            {
                // Pots[0].PotImage.enabled = true;
                SidePots[i].PotImage.gameObject.SetActive(true);
                for (int j = 0; j < SidePots[i].ids.Length; j++)
                {
                    if (j < wc.tableState.sidePots[i].ids.Length)
                    {
                        SidePots[i].ids[j].text = (wc.tableState.sidePots[i].ids[j] + 1) + "";
                        SidePots[i].ids[j].gameObject.transform.parent.gameObject.SetActive(true);
                    }
                    else
                    {
                        SidePots[i].ids[j].gameObject.transform.parent.gameObject.SetActive(false);
                    }
                }
            }
            else
            {
                // Pots[0].PotImage.enabled = false;
                SidePots[i].PotImage.gameObject.SetActive(false);
            }
        }

        if ((int)wc.tableState.sidePots.Count==0)
        {
            for(int i = wc.tableState.sidePots.Count; i < SidePots.Count; i++)
            {
                SidePots[i].PotImage.gameObject.SetActive(false);
            }
        }
    }

    // IEnumerator UpdateWinBalance() {
    //     yield return new WaitForSeconds(2f);
    //     GameObject tempObject = Instantiate(particleEffect, transform.position, Quaternion.identity) as GameObject;
    //     tempObject.transform.localScale = new Vector3(5,5,10);
	// 	Destroy(tempObject,5f);

    // }
}
