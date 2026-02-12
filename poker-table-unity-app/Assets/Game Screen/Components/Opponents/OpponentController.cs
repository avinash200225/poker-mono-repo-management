using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using DG.Tweening;
using UnityEngine.UI;
using Unity.VisualScripting;
using System.Linq;
using System;
using Sequence = DG.Tweening.Sequence;

public class OpponentController : MonoBehaviour
{
    [Header("External Components")] 
    public GameObject cardPrefab;
    [SerializeField] WebSocketManager wc;
    [SerializeField] CardsController cardsController;
    
    public GameObject parent;

    [Header("Internal Components")]    
    [SerializeField] TextMeshProUGUI Name;
    [SerializeField] Text Balance;   
    [SerializeField] TextMeshProUGUI betAmount;   
    [SerializeField] TextMeshProUGUI WinAmount;
    // [SerializeField] TextMeshProUGUI BetAmount;

    [SerializeField] TextMeshProUGUI Status;
    [SerializeField] Image StatusBg;
    [SerializeField] GameObject Hand;
    [SerializeField] GameObject Profile;
    [SerializeField] GameObject BalanceBG;
    [SerializeField] GameObject Coins;

    [SerializeField] GameObject DealerBtn;
    [SerializeField] GameObject SmallBlindBtn;
    [SerializeField] GameObject BigBlindBtn;
    [SerializeField] GameObject FoldIndicator;
    [SerializeField] CanvasGroup canvasGroup;


    [Header("Internal Data")]
    public List<Vector3> cardSpawnPos; 

    [SerializeField] int position;
    [SerializeField] float speed = .5f;
    float scaleFactor = 1.2f;
    int curBalance = 0;

    private Image background;


    [Header("External Data")]
    SeatState seat;
    public List<OpponentCard> cardsObject = new List<OpponentCard>();
    public List<string> cardsName = new List<string>();
    [SerializeField] SeatDataSO configData;
    [SerializeField] ImageHolder imageHolder;

    [System.Serializable]
    public class SpriteEntry
    {
        public string key;
        public Sprite sprite;
    }

    private void OnEnable()
    {    
        Init();
    }

    void Init() {
        Setup();
        Configure();
    }

    void Setup() {
        wc = FindAnyObjectByType<WebSocketManager>();
        cardsController = FindAnyObjectByType<CardsController>();
        // background = GetComponent<Image>();

        // Name = GetComponentsInChildren<TextMeshProUGUI>().ToList().Find(x => x.name.Contains("Name") );
        // Amount = GetComponentsInChildren<TextMeshProUGUI>().ToList().Find(x => x.name.Contains("Amount") );
        // Status = GetComponentsInChildren<TextMeshProUGUI>().ToList().Find(x => x.name.Contains("Status") );
    }

    void Configure() {
        if(configData != null) {
            Name.text = configData.Name;
            Balance.text = "$" + configData.balance;
            betAmount.text = "$" + configData.bets[0];
            Status.text = configData.gameStatus;
            DealerBtn.SetActive(configData.isDealer);
            SmallBlindBtn.SetActive(configData.isSmallBet);
            BigBlindBtn.SetActive(configData.isBigBet);
        }else {}
    }

    void Start() {
        switch(position) {  
            case 1: 
                seat = wc.oppSeat1;
                break;
            case 2: 
                seat = wc.oppSeat2;
                break;
            case 3: 
                seat = wc.oppSeat3;
                break;
            case 4: 
                seat = wc.oppSeat4;
                break;
            case 5: 
                seat = wc.oppSeat5;
                break;
            case 6: 
                seat = wc.oppSeat6;
                break;
            case 7: 
                seat = wc.oppSeat7;
                break;
            default: 
                seat = wc.oppSeat1;
                break;
 
        }

        seat.OnCardDraw += OnCardDraw;
        seat.OnCardPack += OnCardPack;
        seat.OnNameChange += UpdateSeatName;
        seat.OnBetsModified += UpdateCurrentBets;
        seat.OnGameStatusChange += UpdateGameStatus;
        seat.OnTurnStatusChanged += UpdateTurnStatus;

        seat.OnDealerStatusChanged += UpdateDealerStatus; 
        seat.OnSmallBlindStatusChanged += UpdateSmallBlindBtnStatus; 
        seat.OnBigBlindStatusChanged += UpdateBigBlindBtnStatus; 

        seat.OnWinAmountChanged += UpdateWinAmount;
        seat.OnBalanceChange += UpdateBalance;
        // wc.tableState.OnWinnersChanged += UpdateWinnerChanged;
        
    }

    // private void UpdateWinnerChanged()
    // {

    // }

    void UpdateBalance()
    {
        /* TODO: You can make it dynamic with different particle animations etc.. based on change in amount */

        if ((int)seat.balance > curBalance)
        {
            Sequence sequence = DOTween.Sequence();
            Tween tween = Balance.DOCounter(fromValue: curBalance, endValue: (int)seat.balance, duration: 3f, addThousandsSeparator: true, culture: null);
            sequence.AppendInterval(0.01f);
            sequence.Append(tween);
            sequence.SetLoops(1);

        }
        else
        {
            Sequence sequence = DOTween.Sequence();
            Tween tween = Balance.DOCounter(fromValue: curBalance, endValue: (int)seat.balance, duration: 1f, addThousandsSeparator: true, culture: null);
            sequence.Append(tween);
            sequence.SetLoops(1);
        }

        curBalance = (int)seat.balance;
        // Amount.text = "$"+curBalance;
    }

    void UpdateWinAmount()
    {
        // InvokeUpdateWinAmount();
        Invoke("InvokeUpdateWinAmount", 0.01f);
    }

    void InvokeUpdateWinAmount()
    {
        Debug.Log("UpdateWinAmount seat.winAmount : " + seat.winAmount + " seat.name : "+ seat.name);
        if (seat.winAmount > 0)
        {
            betAmount.text = "$" + seat.winAmount;
            betAmount.gameObject.SetActive(true);
            Coins.SetActive(true);

            for(int i = 0; i < cardsObject.Count; i++)
            {
                // OpponentCard opponentCard = cardsObject[i].transform.GetComponent<OpponentCard>();
                // OpponentCard opponentCard = cardsObject[i].GetComponent<OpponentCard>();
                Debug.Log("wc.tableState.winners[0].cards : "+ wc.tableState.winners[0].cards[i]);
                Debug.Log("wc.tableState.winners[0].cards card.cardName : "+ cardsName[i]);
                if (wc.tableState.winners[0].cards.Contains(cardsName[i]))
                {
                    cardsObject[i].bgHighlight.gameObject.SetActive(true);
                }
            }
        }
        else
        {
            Debug.Log("UpdateWinAmount else seat.winAmount : " + seat.winAmount + " seat.name : "+ seat.name);
            betAmount.text = string.Empty;
            betAmount.gameObject.SetActive(false);
            Coins.SetActive(false);
        }
    }

    void UpdateTurnStatus() {
        if (seat.isTurn)
        {
            StartCoroutine(TurnChangeCoroutine());//Old Animation
        }
    }


    IEnumerator TurnChangeCoroutine()
    {
        while(seat.isTurn) {
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
        transform.localScale = new Vector3(1f, 1f, 1f);
    }

    void UpdateBigBlindBtnStatus() {
        BigBlindBtn.SetActive(seat.isBigBet);
    }
    void UpdateSmallBlindBtnStatus() {
        SmallBlindBtn.SetActive(seat.isSmallBet);
    }
    void UpdateDealerStatus() {
        DealerBtn.SetActive(seat.isDealer);
    }

    void UpdateSeatName()
    {
        Name.text = seat.name;
    }
    
    void UpdateCurrentBets() {
        if(seat.bets.Count > 0 ) {
            if(seat.bets[0] > 0) {
                betAmount.text = "$" + seat.bets[0];
                betAmount.gameObject.SetActive(true);
                Coins.SetActive(true);
            } else if(seat.winAmount<=0){
                betAmount.text = string.Empty;
                betAmount.gameObject.SetActive(false);
                Coins.SetActive(false);
            }
        }
    }

    void UpdateGameStatus()
    {
        Debug.Log("UpdateGameStatus : Status.text = " + Status.text + "   seat.gameStatus " + seat.gameStatus + " seat.name : " + seat.name);

        if ((Status.text != "SIT OUT") && (seat.gameStatus.ToUpper() == "SIT OUT"))
        {
            StartCoroutine(Invisible());
        }
        if ((Status.text == "SIT OUT") && (seat.gameStatus.ToUpper() != "SIT OUT"))
        {
            StartCoroutine(FadeIn());
        }

        if ((!Status.text.ToUpper().Contains("LOST")) && (seat.gameStatus.ToUpper().Contains("LOST")))
        {
            DestroyCardsObjects();
            StartCoroutine(FadeOut());
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("Lost");
            // FoldIndicator.SetActive(true);
            canvasGroup.alpha = 0.4f;
        }

        if (Status.text.ToUpper().Contains("LOST") && !seat.gameStatus.ToUpper().Contains("LOST"))
        {
            DestroyCardsObjects();
            StartCoroutine(FadeIn());
            // FoldIndicator.SetActive(false);
            canvasGroup.alpha = 1;
        }

        if (!Status.text.ToUpper().Contains("FOLDED") && (seat.gameStatus == "FOLDED"))
        {
            DestroyCardsObjects();
            StartCoroutine(FadeOut());
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("Sit Out");
            // FoldIndicator.SetActive(true);
            canvasGroup.alpha = 0.4f;
        }

        // if ((Status.text == "FOLDED") && (seat.gameStatus != "FOLDED") && (seat.gameStatus.ToUpper() != "LOST"))
        // {
        //     StartCoroutine(FadeIn());
        //     FoldIndicator.SetActive(false);
        // }
        Status.text = seat.gameStatus.ToUpper();
        SetStatusBg();
    }
    
    

    private void SetStatusBg()
    {
        if (Status.text.Contains("SIT OUT"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("SIT OUT");
        }
        else if (Status.text.Contains("ALL IN"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("ALL IN");
        }
        else if (Status.text.Contains("BET"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("BET");
        }
        else if (Status.text.Contains("CALL"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("CALL");
        }
        else if (Status.text.Contains("CHECK"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("CHECK");
        }
        else if (Status.text.Contains("FOLD"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("FOLD");
        }
        else if (Status.text.Contains("RAISE"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("RAISE");
        }
        else if (Status.text.Contains("READY"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("READY");
        }
        else if (Status.text.Contains("PLAYING"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("PLAYING");
        }
        else if (Status.text.Contains("LOST"))
        {
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("LOST");
        }
    }

    // fade from opaque to transparent
    IEnumerator FadeOut()
    {
        Debug.Log("FadeOut");
        // gameObject.transform.GetChild(0).gameObject.SetActive(false);
        // loop over 1 second backwards
        // for (float i = 1; i >= .5f; i -= Time.deltaTime)
        // {
        // set color with i as alpha
        // background.color = new Color(1, 1, 1, i);

        // Name.color = new Color(1, 1, 1, 0);
        // betAmount.color = new Color(1, 1, 1, 0);
        // Status.color = new Color(1, 1, 1, 0);

        if (Hand.transform.childCount > 0) { Hand.transform.GetChild(0).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 1) { Hand.transform.GetChild(1).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 2) { Hand.transform.GetChild(2).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 3) { Hand.transform.GetChild(3).GetComponent<OpponentCard>().FadeOutCard(); }

        // parent.SetActive(false);

        yield return null;
        // }
    }

    // fade from opaque to transparent
    IEnumerator Invisible()
    {
        Debug.Log("FadeOut Invisible");
        // gameObject.transform.GetChild(0).gameObject.SetActive(false);
        // loop over 1 second backwards
        // for (float i = 1; i >= .5f; i -= Time.deltaTime)
        // {
        // set color with i as alpha
        // background.color = new Color(1, 1, 1, i);
        // Name.color = new Color(1, 1, 1, 0);
        // betAmount.color = new Color(1, 1, 1, 0);
        // Status.color = new Color(1, 1, 1, 0);

        if (Hand.transform.childCount > 0) { Hand.transform.GetChild(0).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 1) { Hand.transform.GetChild(1).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 2) { Hand.transform.GetChild(2).GetComponent<OpponentCard>().FadeOutCard(); }
        if (Hand.transform.childCount > 3) { Hand.transform.GetChild(3).GetComponent<OpponentCard>().FadeOutCard(); }

        parent.SetActive(false);
        StatusBg.sprite = imageHolder.GetByNameIgnoreCase("Sit Out");

        yield return null;
        // }
    }

    // fade from transparent to opaque
    IEnumerator FadeIn()
    {
        Debug.Log("FadeIn");
        // gameObject.transform.GetChild(0).gameObject.SetActive(true);
        // loop over 1 second
        // for (float i = .5f; i <= 1; i += Time.deltaTime)
        // {
            // set color with i as alpha
            // background.color = new Color(1, 1, 1, i);
            // Name.color = new Color(1, 1, 1, 1);
            // betAmount.color = new Color(1, 1, 1, 1);
            // Status.color = new Color(1, 1, 1, 1);

            parent.SetActive(true);
            StatusBg.sprite = imageHolder.GetByNameIgnoreCase("Playing");
            // if (Hand.transform.childCount > 0) { Hand.transform.GetChild(0).GetComponent<OpponentCard>().HideCard(); }
            // if (Hand.transform.childCount > 1) { Hand.transform.GetChild(1).GetComponent<OpponentCard>().HideCard(); }
            // if (Hand.transform.childCount > 2) { Hand.transform.GetChild(2).GetComponent<OpponentCard>().HideCard(); }
            // if (Hand.transform.childCount > 3) { Hand.transform.GetChild(3).GetComponent<OpponentCard>().HideCard(); }

            yield return null;
        // }
 
    }
 

    void OnCardDraw()
    {
        StartCoroutine(HandChangeCoroutine());
    }
    void OnCardPack()
    {
        StartCoroutine(HandChangeCoroutine());
    }

    IEnumerator DestroyCard(GameObject card)
    {
        card.GetComponent<OpponentCard>().takeOutCard();
        yield return new WaitForSeconds(.6f);
        Destroy(card);
        
    }

    void DestroyCardsObjects() {
        if (cardsObject.Count > 0)
        {
            for (int i = cardsObject.Count - 1; i > -1; --i)
            {
                if(cardsObject[i]!=null)
                cardsObject[i].gameObject.SetActive(false);
            }
        }  
    }

    IEnumerator HandChangeCoroutine()
    {
        // if(seat.cards == null || seat.cards.Count == 0 ) {
        //There are some cards in hand list    
        DestroyCardsObjects();

        // } else {
        if (seat.gameStatus.ToUpper() != "FOLDED" && seat.gameStatus.ToUpper() != "LOST")
        {
            for (int i = 0; i < seat.cards.Count; i++)
            {
                // cardsObject[i].SetActive(false);
                Debug.Log("seat.cards "+ i + " "+ seat.cards[i]);
                if (seat.cards.Count == 2)
                {
                    if (seat.cards[i]!=null && !seat.cards[i].Contains("xx"))
                    {
                        cardsName[i + 1] = seat.cards[i];
                        if (wc.tableState.winners.Count>0 && !wc.tableState.winners[0].hand.Equals("Knockout Champion"))
                        {
                            cardsObject[i + 1].ShowCard(cardsController.GetSprite(seat.cards[i]));
                            Debug.Log("seat.cards[i] : " + seat.cards[i] + "    cardName : " + cardsName[i + 1]);
                        }
                    }
                    else
                    {
                        cardsObject[i + 1].HideCard();
                    }
                    cardsObject[i + 1].gameObject.SetActive(true);
                }
                else
                {
                    if (seat.cards[i]!=null && !seat.cards[i].Contains("xx"))
                    {
                        cardsName[i] = seat.cards[i];
                        if (!wc.tableState.winners[0].hand.Equals("Knockout Champion"))
                        {
                            cardsObject[i].ShowCard(cardsController.GetSprite(seat.cards[i]));
                            Debug.Log("open seat.cards[i] : " + seat.cards[i] + "    cardName : " + cardsName[i]);
                        }
                    }
                    else
                    {
                        cardsObject[i].HideCard();
                    }
                    cardsObject[i].gameObject.SetActive(true);
                }
                // if(cardsObject.Count < i + 1) {
                //     Debug.Log("Card index : "+ i);
                //     var cardName = seat.cards[i];//Name of the card

                //     GameObject tempCardObject;
                //     tempCardObject = (GameObject)Instantiate (cardPrefab, new Vector3(0,0,0), cardPrefab.transform.rotation);
                //     tempCardObject.transform.SetParent(Hand.transform);
                //     tempCardObject.name = cardName;

                //     if(wc.configState.pokerVariant == "Texas") {
                //         tempCardObject.transform.localPosition = cardSpawnPos[1+i];
                //     } else {
                //         tempCardObject.transform.localPosition = cardSpawnPos[i];
                //     }

                //     tempCardObject.transform.localScale = new Vector3(.9f,.9f,.9f);
                //     tempCardObject.cardPlace = Hand.transform;
                //     tempCardObject.cardName = cardName;
                //     tempCardObject.cardImage= cardsController.GetSprite(cardName);

                //     tempCardObject.SetActive (true);
                //     cardsObject.Add(tempCardObject);
                // }
            }

            yield return new WaitForEndOfFrame();
        }
    }
    
    private void OnValidate()
    {
        Init();
    }

}
