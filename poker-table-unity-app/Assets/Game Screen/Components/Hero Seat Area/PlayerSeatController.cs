using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using Unity.Burst;
using UnityEngine.UI;
using System;

public class PlayerSeatController : MonoBehaviour
{
    [Header("External Compoents")]
    [SerializeField] WebSocketManager wc;
    public GameObject particleEffect;

    [SerializeField] AudioSource coinsSound;
    [SerializeField] ImageHolder imageHolder;
    
    [Header("Internal Components")]
    [SerializeField] TextMeshProUGUI Name;
    [SerializeField] TextMeshProUGUI Amount;
    [SerializeField] TextMeshProUGUI WinAmount;
    [SerializeField] TextMeshProUGUI Status;
    [SerializeField] TextMeshProUGUI txtWin;
    [SerializeField] TextMeshProUGUI txtLoose;
    [SerializeField] GameObject WinPopup;
    [SerializeField] GameObject LoosePopup;
    [SerializeField] Image StatusImg;
    [SerializeField] StatusSprite[] StatusSprites;
    [SerializeField] GameObject DealerBtn;
    [SerializeField] GameObject SmallBlindBtn;
    [SerializeField] GameObject BigBlindBtn;
    [SerializeField] GameObject FoldIndicator;
    [SerializeField] CanvasGroup canvasGroup;
    [SerializeField] GameObject HeroSeatArea;
    [SerializeField] GameObject MainPotArea;
    [SerializeField] GameObject CardHighlightBG;
    [SerializeField] GameObject MyCoins;
    [SerializeField] GameObject MyStack;
    [SerializeField] GameObject bettingPanel;

    [Serializable]
    class StatusSprite{
        [SerializeField]
        string name;
        [SerializeField]
        Image image;
    }


    [Header("Internal Data")]
    [SerializeField] float speed = .5f;
    [SerializeField] float scaleFactor = 1.05f;

    [SerializeField]
    // private Image background;
    // Animator _seatAnimator;


    void Start()
    {
        wc = FindAnyObjectByType<WebSocketManager>();
        // _seatAnimator = GetComponent<Animator>();

        /* Listen to the state changes and call methods (normal or coroutine) here... */
        wc.mySeat.OnNameChange += UpdateSeatName;
        wc.mySeat.OnBetsModified += UpdateCurrentBets;
        wc.mySeat.OnTurnStatusChanged += UpdateTurnStatus;
        wc.mySeat.OnGameStatusChange += UpdateGameStatus;
        wc.mySeat.OnDealerStatusChanged += UpdateDealerStatus;
        wc.mySeat.OnSmallBlindStatusChanged += UpdateSmallBlindBtnStatus;
        wc.mySeat.OnBigBlindStatusChanged += UpdateBigBlindBtnStatus;

        wc.mySeat.OnWinAmountChanged += UpdateWinAmount;
        UpdateGameStatus();

    }


    void UpdateWinAmount() {
        Debug.Log(" Player UpdateWinAmount seat.winAmount : "+  wc.mySeat.winAmount);
        if(wc.mySeat.winAmount > 0) {
            WinAmount.gameObject.SetActive(true);
            // WinAmount.transform.parent.gameObject.SetActive(true);
            MyCoins.gameObject.SetActive(true);
            WinAmount.text = "$" + wc.mySeat.winAmount;
            UpdateBalanceAnimation();    
        } else {
            WinAmount.text = string.Empty;
            WinAmount.gameObject.SetActive(false);
            // WinAmount.transform.parent.gameObject.SetActive(false);
            MyCoins.gameObject.SetActive(false);
        }
    }

    void UpdateBalanceAnimation() {
        StartCoroutine(UpdateWinBalance());
    }

    IEnumerator UpdateWinBalance() {
        yield return new WaitForSeconds(2f);
        coinsSound.Play();
        GameObject tempObject = Instantiate(particleEffect, transform.position, Quaternion.identity) as GameObject;
        tempObject.transform.localScale = new Vector3(10,10,1);
		Destroy(tempObject,5f);
    }

    void UpdateBigBlindBtnStatus() {
        BigBlindBtn.SetActive(wc.mySeat.isBigBet);
    }

    void UpdateSmallBlindBtnStatus() {
        SmallBlindBtn.SetActive(wc.mySeat.isSmallBet);
    }

    void UpdateDealerStatus() {
        DealerBtn.SetActive(wc.mySeat.isDealer);
    }

    void UpdateGameStatus() {
        
        Debug.Log("MyPlayer : UpdateGameStatus : Status.text = "+Status.text+"   wc.mySeat.gameStatus "+wc.mySeat.gameStatus);

        if ((Status.text != "SIT OUT") && (wc.mySeat.gameStatus == "Sit Out"))
        {
            StartCoroutine(FadeOut());
        }
        if((Status.text == "SIT OUT") && (wc.mySeat.gameStatus != "Sit Out")) {
            StartCoroutine(FadeIn());
        }

        if(!Status.text.ToUpper().Contains("LOST") && wc.mySeat.gameStatus.ToUpper().Contains("LOST")) {
            // StartCoroutine(FadeOut());
            ResetBlindButtons();
            // FoldIndicator.SetActive(true);
            canvasGroup.alpha = 0.4f;
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("Lost");
        }
        if(Status.text.ToUpper().Contains("LOST") && !wc.mySeat.gameStatus.ToUpper().Contains("LOST")) {
            StartCoroutine(FadeIn());
            // FoldIndicator.SetActive(false);
            canvasGroup.alpha = 1;
        }

        if((Status.text != "FOLDED") && (wc.mySeat.gameStatus == "FOLDED")) {
            StartCoroutine(FadeOut());
            ResetBlindButtons();
            // FoldIndicator.SetActive(true);
            canvasGroup.alpha = 0.4f;
        }
        if((Status.text == "FOLDED") && (wc.mySeat.gameStatus != "FOLDED") && (wc.mySeat.gameStatus.ToUpper() != "LOST")) {
            StartCoroutine(FadeIn());
            // FoldIndicator.SetActive(false);
            canvasGroup.alpha = 1;
        }

        Status.text = wc.mySeat.gameStatus.ToUpper();
        SetStatusBg();
    }

    private void SetStatusBg()
    {
        if (Status.text.Contains("SIT OUT"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("SIT OUT");
        }
        else if (Status.text.Contains("ALL IN"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("ALL IN");
        }
        else if (Status.text.Contains("BET"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("BET");
        }
        else if (Status.text.Contains("CALL"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("CALL");
        }
        else if (Status.text.Contains("CHECK"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("CHECK");
        }
        else if (Status.text.Contains("FOLD"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("FOLD");
        }
        else if (Status.text.Contains("RAISE"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("RAISE");
        }
        else if (Status.text.Contains("READY"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("READY");
        }
        else if (Status.text.Contains("PLAYING"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("PLAYING");
        }
        else if (Status.text.Contains("LOST"))
        {
            StatusImg.sprite = imageHolder.GetByNameIgnoreCase("LOST");
        }
    }

    private void ResetBlindButtons()
    {
        // FoldIndicator.SetActive(false);
        canvasGroup.alpha = 1;
        BigBlindBtn.SetActive(false);
        SmallBlindBtn.SetActive(false);
        DealerBtn.SetActive(false);
    }

    // fade from opaque to transparent
    IEnumerator FadeOut()
    {
        Debug.Log("FadeOut");
        // loop over 1 second backwards
        // for (float i = 1; i >= 0.0f; i -= Time.deltaTime)
        // {
        //     // set color with i as alpha
        //     // background.color = new Color(1, 1, 1, i);
        //     Name.color = new Color(1, 1, 1, i);
        //     Amount.color = new Color(1, 1, 1, i);
        //     Status.color = new Color(1, 1, 1, i);
        //     yield return null;
        // }
        // gameObject.transform.GetChild(0).gameObject.SetActive(false);
        // HeroSeatArea.SetActive(false);
        // MyCoins.SetActive(false);
        // MainPotArea.SetActive(false);
        CardHighlightBG.SetActive(false);
        bettingPanel.SetActive(false);
        StatusImg.sprite = imageHolder.GetByNameIgnoreCase("Sit Out");
        yield return null;
    }

    // fade from transparent to opaque
    IEnumerator FadeIn()
    {
        Debug.Log("FadeIn");
        // loop over 1 second
        // for (float i = 0.0f; i <= 1; i += Time.deltaTime)
        // {
        //     // set color with i as alpha
        //     // background.color = new Color(1, 1, 1, i);
        //     Name.color = new Color(1, 1, 1, i);
        //     Amount.color = new Color(1, 1, 1, i);
        //     Status.color = new Color(1, 1, 1, i);
        //     yield return null;
        // }
        // gameObject.transform.GetChild(0).gameObject.SetActive(true);
        HeroSeatArea.SetActive(true);
        // MyCoins.SetActive(false);
        // MainPotArea.SetActive(false);
        CardHighlightBG.SetActive(false);
        bettingPanel.SetActive(false);
        StatusImg.sprite = imageHolder.GetByNameIgnoreCase("Playing");
        yield return null;
    }

    void UpdateTurnStatus() {
        if(wc.mySeat.isTurn) {
            // _seatAnimator.Play("Turn");
            bettingPanel.SetActive(true);
            
        } else {
            // _seatAnimator.Play("Idle");
            bettingPanel.SetActive(false);
        }
    }

    IEnumerator TurnChangeCoroutine()
    {
        while(wc.mySeat.isTurn) {
            scale();
            yield return new WaitForSeconds(speed);
            normalFlash();
            yield return new WaitForSeconds(speed);

        }

    }
    void scale()
    {
        transform.localScale = new Vector3(scaleFactor, scaleFactor, scaleFactor);
    }
    void normalFlash()
    {
        transform.localScale = new Vector3(1.0f, 1.0f, 1.0f);
    }

    void UpdateSeatName() {
        Name.text = wc.mySeat.name;
    }

    void UpdateCurrentBets() {
        if(wc.mySeat.bets.Count > 0) {
            if (wc.mySeat.bets[0] != 0)
            {
                Amount.text = "$" + wc.mySeat.bets[0];
                Amount.gameObject.SetActive(true);
                Amount.transform.parent.gameObject.SetActive(true);
            }
            else if(!WinAmount.gameObject.activeInHierarchy)
            {
                Amount.text = string.Empty;
                Amount.gameObject.SetActive(false);
                Amount.transform.parent.gameObject.SetActive(false);   
                Debug.Log(" Player x UpdateWinAmount seat.winAmount : "+  wc.mySeat.winAmount);
            }
        }

    }

}
