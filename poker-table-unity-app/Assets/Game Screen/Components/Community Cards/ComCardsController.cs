using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class ComCardsController : MonoBehaviour
{
    [SerializeField] WebSocketManager wc;
    [SerializeField] List<Image> comCards;
    [SerializeField] List<Image> comCardsBgHighlight;

    public List<string> gameCards;

    public AudioSource swipeAudio;
	public AudioSource flipAudio;

    // Start is called before the first frame update
    void Start()
    {
        Init(); 
    }

    public void Init(){
        Setup();
        Configure();
    }

    public void Setup(){
        wc = FindAnyObjectByType<WebSocketManager>();
        wc.tableState.OnGameCardsChanged += UpdateGameCards;
        wc.tableState.OnWinnersChanged += UpdateWinCards;
    }

    private void UpdateWinCards()
    {
        for (int i=0; i<gameCards.Count;i++)
        {
            if (wc.tableState.winners.Count>0 && wc.tableState.winners[0].cards.Contains(gameCards[i]))
            {
                comCardsBgHighlight[i].gameObject.SetActive(true);
            }
        }
    }

    void UpdateGameCards() {
        gameCards = wc.tableState.gameCards;

        bringinCard(0);
        bringinCard(1);
        bringinCard(2);
        bringinCard(3);
        bringinCard(4);

    }

    void bringinCard(int pos) {
        if(gameCards != null && gameCards.Count > pos) {
            if(!comCards[pos].gameObject.activeInHierarchy) {
                comCards[pos].gameObject.SetActive(true);
                swipeAudio.Play ();
                comCards[pos].enabled = true;
                comCards[pos].sprite = CardsController.Instance.GetSprite(gameCards[pos]);
                var cardSequence = DOTween.Sequence();
                cardSequence.Append (comCards[pos].rectTransform.DOLocalMove(new Vector3(0,800,0), 2f).From());
                cardSequence.SetLoops (1);
            }
        } else {
            comCards[pos].gameObject.SetActive(false);
            comCards[pos].enabled = false; 
            comCards[pos].sprite = null;
        }
        comCardsBgHighlight[pos].gameObject.SetActive(false);
    }

    public void Configure() {

    }

}
