using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using DG.Tweening;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.UI;

/* 
    Functionalities(Hight Level)
    Members
        1. A list of game objects
        2. A list of card names  
        2. A reference to the CardsController
        3. A reference to the Hole Cards Place Holder

    1. Listen to Central State Cards Change Event
        a) Go through each card in central State Cards Array (every 10 millisecond)
        b) Compare index with its list of game objects

*/
public class PokerHandManager : MonoBehaviour
{
    public List<GameObject> cardsObject = new List<GameObject>();
    public List<GameObject> cardsObjectBack = new List<GameObject>();
    public List<GameObject> cardsObjectsHighlight = new List<GameObject>();
    public List<string> cardNames = new List<string>();

    public CardsController cardsController;
    public GameObject winAnim;

    string prevGameStatus;

    WebSocketManager wc;

    private void OnEnable()
    {
        wc = FindFirstObjectByType<WebSocketManager>();
    }
    // Start is called before the first frame update
    void Start()
    {
        //Listen to OnPokrtVariantChange
        // wc.configState.OnPokerVariantChangeAction += UpdateGameVariant;

        //Listen to Game Status Change and detect a game over event
        //const gameOver = gameStatus.toUpperCase().includes("WIN-") || gameStatus.toUpperCase().includes("LOST-")

        
        //Listen to Cards drawn event on Seat
        wc.mySeat.OnCardDraw += OnCardDraw;
        //listen to Cards pack event on Seat
        wc.mySeat.OnCardPack += OnCardPack;
        wc.configState.OnPokerVariantChangeAction += SetCardPosition;

        wc.mySeat.OnGameStatusChange += UpdateGameStatus;
    }

    void UpdateGameStatus() {
        // var gameOver = wc.mySeat.gameStatus.ToUpper().Contains("WIN") || wc.mySeat.gameStatus.ToUpper().Contains("LOST");
        // if(gameOver == true) {
        //     OpenGameOverPanel();
        // } else {
        //     if(prevGameStatus == null && (prevGameStatus.ToUpper().Contains("WIN") || prevGameStatus.ToUpper().Contains("LOST"))) {
        //         CloseGameOverPanel();
        //     }
        // }
        if((prevGameStatus != "FOLDED") && (wc.mySeat.gameStatus == "FOLDED")) {
            DisableCardsObjects();
        }
        
        prevGameStatus = wc.mySeat.gameStatus;
    }

    void OpenGameOverPanel() {

    }

    void CloseGameOverPanel() {

    }

    void OnCardDraw()
    {
        StartCoroutine(HandChangeCoroutine());
    }
    void OnCardPack()
    {
        StartCoroutine(HandChangeCoroutine());

    }

    IEnumerator DestroyCard(GameObject card) {
        card.GetComponent<Card>().takeOutCard();
        yield return new WaitForSeconds (.6f);
        Destroy(card);
    }

    void DisableCardsObjects() {
        
            int CardsCount = cardsObject.Count;
            if(CardsCount > 0) {
                for(int i = CardsCount - 1; i > -1; --i) {
                    if(cardsObject[i] != null) {
                        cardsObject[i].transform.parent.gameObject.SetActive(false);
                    }
                }
            }
    }

    IEnumerator HandChangeCoroutine() {        
        if(wc.mySeat.cards == null || wc.mySeat.cards.Count == 0 ) {
            //There are some cards in hand list    
            DisableCardsObjects();

        } else {  
            DisableCardsObjects();
            SetCardPosition();
            if (wc.mySeat.gameStatus.ToUpper() != "FOLDED" && wc.mySeat.gameStatus.ToUpper() != "LOST")
            {
                cardNames = wc.mySeat.cards;
                for (int i = 0; i < wc.mySeat.cards.Count; i++)
                {
                    var cardName = wc.mySeat.cards[i];//Name of the card
                    UnityEngine.Debug.Log("Name of the card Number : " + i + " Name : " + cardName);

                    MeshRenderer meshRenderer = cardsObject[i].GetComponent<MeshRenderer>();
                    if (meshRenderer != null)
                    {
                        UnityEngine.Debug.Log("meshRenderer : " + meshRenderer + " cardsController.GetSprite(cardName).texture : " + cardsController.GetSprite(cardName).texture);

                        // Set additional properties if needed
                        MaterialPropertyBlock properties = new MaterialPropertyBlock();
                        // Get the current properties from the MeshRenderer
                        meshRenderer.GetPropertyBlock(properties);

                        try
                        {
                            properties.SetTexture("_MainTex", cardsController.GetSprite(cardName).texture);
                            properties.SetTexture("_BackTex", cardsController.GetSprite(cardName).texture);
                        }
                        catch (System.Exception)
                        {
                            UnityEngine.Debug.LogError("Exception : Front Texture or Back Texture Properties can't be set.");
                        }
                        meshRenderer.SetPropertyBlock(properties);
                    }

                    cardsObject[i].transform.parent.gameObject.SetActive(true);

                    if (wc.mySeat.gameStatus.ToUpper().Contains("WIN") || wc.mySeat.gameStatus.ToUpper().Contains("LOST"))
                    {
                        ShowCard(i);
                    }
                    else
                    {
                        HideCard(i);
                    }
                }

                yield return new WaitForEndOfFrame();
            }

        }
    }

    private void ShowCard(int index)
    {
        cardsObject[index].transform.localScale = new Vector3(-100, 140, 100);
        cardsObjectBack[index].SetActive(false);
        if (wc.mySeat.gameStatus.ToUpper().Contains("WIN"))
        {
            winAnim.SetActive(true);
            //Show Win Card highlight

            if (wc.tableState.winners[0].cards.Contains(cardNames[index]))
            {
                cardsObjectsHighlight[index].SetActive(true);
            }
            
        }else
        {
            winAnim.SetActive(false);
        }
    }

    private void HideCard(int index)
    {
        cardsObject[index].transform.localScale = new Vector3(100, 140, 100);
        cardsObjectBack[index].SetActive(true);
        cardsObjectsHighlight[index].SetActive(false);
        winAnim.SetActive(false);
    }

    private void SetCardPosition()
    {
        switch (wc.configState.pokerVariant)
        {
            case "Omaha":
                cardsController.gameObject.transform.position = new Vector3(0, -2f, -0.36f);
                break;
            case "Texas":
                cardsController.gameObject.transform.position = new Vector3(0.72f, -2f, -0.36f);
                break;
            default:
                cardsController.gameObject.transform.position = new Vector3(0.36f, -2f, -0.36f);
                break;
        }
    }
}
