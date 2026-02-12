using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;


public class MyStackController : MonoBehaviour
{
    [Header("External Dependancy")]
    [SerializeField] WebSocketManager wc;

    [Header("Child Elements")]
    [SerializeField] Text Amount;

    [SerializeField] AudioSource coinsSound;
    [SerializeField] AudioSource winSound;

    public GameObject particleEffect;

    int curBalance = 0;

    // Start is called before the first frame update
    void Start()
    {
        Init();
        
    }

    void Init() {
        wc = FindAnyObjectByType<WebSocketManager>();

        wc.mySeat.OnBalanceChange += UpdateBalance;
        wc.mySeat.OnWinAmountChanged += UpdateWinAmount;
        

        // wc.mySeat.OnBalanceChange += UpdateBalanceAnimation;
    }

    void UpdateWinAmount() {
            if(wc.mySeat.winAmount > 0) {
                UpdateBalanceAnimation();    
            }
    }
    
    void UpdateBalance() {
        /* TODO: You can make it dynamic with different particle animations etc.. based on change in amount */

        if((int)wc.mySeat.balance > curBalance) {
            Sequence sequence = DOTween.Sequence();
            Tween tween = Amount.DOCounter(fromValue: curBalance, endValue: (int)wc.mySeat.balance, duration: 3f, addThousandsSeparator: true, culture: null);
            sequence.AppendInterval(0.01f);
            sequence.Append(tween);
            sequence.SetLoops (1);

        } else {
            Sequence sequence = DOTween.Sequence();
            Tween tween = Amount.DOCounter(fromValue: curBalance, endValue: (int)wc.mySeat.balance, duration: 1f, addThousandsSeparator: true, culture: null);
            sequence.Append(tween);
            sequence.SetLoops (1);
        }

        curBalance = (int)wc.mySeat.balance;
        // Amount.text = "$"+curBalance;
    }

    void UpdateBalanceAnimation() {
        // StartCoroutine(UpdateWinBalance());
    }

    IEnumerator UpdateWinBalance() {
        yield return new WaitForSeconds(2f);
        coinsSound.Play();
        GameObject tempObject = Instantiate(particleEffect, transform.position, Quaternion.identity) as GameObject;
        tempObject.transform.localScale = new Vector3(5,5,10);
		Destroy(tempObject,5f);

    }

}
