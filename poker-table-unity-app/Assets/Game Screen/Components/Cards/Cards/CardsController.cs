using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CardsController : MonoBehaviour
{
    public static CardsController Instance;
    // public GameObject cardPrefab;
    // public GameObject oppCardPrefab;
    public Sprite[] cards;

    // public Vector3 cardSpawnPos;

    // public float cardScale;

    private void Awake() {
        Instance = this;
    }
    
    /*public void OppCardGenerator(
        string cardName,
        List<GameObject> cardsObject,
        GameObject newCardPlaceHolder,
        GameObject parentObject
    ) {
        GameObject tempCardObject;
        tempCardObject = (GameObject)Instantiate (oppCardPrefab, cardSpawnPos, Quaternion.identity);
        // Vector3 scale = new Vector3 (cardScale,cardScale,cardScale);

        tempCardObject.transform.parent = parentObject.transform;
        tempCardObject.name = cardName;
        tempCardObject.transform.localScale = new Vector3(.9f,.9f,.9f);
		
        tempCardObject.GetComponent<OpponentCard>().cardPlace = newCardPlaceHolder.transform;
		tempCardObject.GetComponent<OpponentCard>().cardName = cardName;
        
        //From the array of cards 
        for(int i=0;i<cards.Length;i++)
		{
			if(cards[i].name == GetSpriteName(cardName))
			{
				tempCardObject.GetComponent<OpponentCard>().cardImage=cards[i];
			}
		}

        tempCardObject.SetActive (true);
        cardsObject.Add(tempCardObject);

    }*/
    /*public void CardGenerator(
        string cardName,
        List<GameObject> cardsObject,
        GameObject newCardPlaceHolder,
        GameObject parentObject
    ) {
        GameObject tempCardObject;
        tempCardObject = (GameObject)Instantiate (cardPrefab, cardSpawnPos, cardPrefab.transform.rotation);
        // Vector3 scale = new Vector3 (cardScale,cardScale,cardScale);

        // tempCardObject.transform.localScale = scale;
        tempCardObject.transform.parent = parentObject.transform;
        tempCardObject.name = cardName;
		
        // tempCardObject.GetComponent<CardController>().cardPlace = newCardPlaceHolder.transform;
		tempCardObject.GetComponent<CardController>().cardName = cardName;
        
        //From the array of cards 
        for(int i=0;i<cards.Length;i++)
		{
			if(cards[i].name == GetSpriteName(cardName))
			{
				tempCardObject.GetComponent<CardController>().cardImage=cards[i];
			}
		}

        tempCardObject.SetActive (true);
        cardsObject.Add(tempCardObject);

    }*/

    public Sprite GetSprite(string cardName) {
        Sprite spr = null;
        for(int i=0;i<cards.Length;i++)
		{
			if(cards[i].name == GetSpriteName(cardName))
			{
				spr = cards[i];
			}
		}

        return spr;
    }
    string GetSpriteName(string cardName) {
        var spriteName = "";
        switch (cardName)
        {
            case "d2":          
                spriteName = "2diamonds";
                break;
            case "d3":          
                spriteName = "3diamonds";
                break;
            case "d4":          
                spriteName = "4diamonds";
                break;
            case "d5":          
                spriteName = "5diamonds";
                break;
            case "d6":          
                spriteName = "6diamonds";
                break;
            case "d7":          
                spriteName = "7diamonds";
                break;
            case "d8":          
                spriteName = "8diamonds";
                break;
            case "d9":          
                spriteName = "9diamonds";
                break;
            case "d10":          
                spriteName = "10diamonds";
                break;
            case "dJ":          
                spriteName = "Jdiamonds";
                break;
            case "dQ":          
                spriteName = "Qdiamonds";
                break;
            case "dK":          
                spriteName = "Kdiamonds";
                break;
            case "dA":          
                spriteName = "Adiamonds";
                break;

            case "c2":          
                spriteName = "2clubs";
                break;
            case "c3":          
                spriteName = "3clubs";
                break;
            case "c4":          
                spriteName = "4clubs";
                break;
            case "c5":          
                spriteName = "5clubs";
                break;
            case "c6":          
                spriteName = "6clubs";
                break;
            case "c7":          
                spriteName = "7clubs";
                break;
            case "c8":          
                spriteName = "8clubs";
                break;
            case "c9":          
                spriteName = "9clubs";
                break;
            case "c10":          
                spriteName = "10clubs";
                break;
            case "cJ":          
                spriteName = "Jclubs";
                break;
            case "cQ":          
                spriteName = "Qclubs";
                break;
            case "cK":          
                spriteName = "Kclubs";
                break;
            case "cA":          
                spriteName = "Aclubs";
                break;

            case "h2":          
                spriteName = "2hearts";
                break;
            case "h3":          
                spriteName = "3hearts";
                break;
            case "h4":          
                spriteName = "4hearts";
                break;
            case "h5":          
                spriteName = "5hearts";
                break;
            case "h6":          
                spriteName = "6hearts";
                break;
            case "h7":          
                spriteName = "7hearts";
                break;
            case "h8":          
                spriteName = "8hearts";
                break;
            case "h9":          
                spriteName = "9hearts";
                break;
            case "h10":          
                spriteName = "10hearts";
                break;
            case "hJ":          
                spriteName = "Jhearts";
                break;
            case "hQ":          
                spriteName = "Qhearts";
                break;
            case "hK":          
                spriteName = "Khearts";
                break;
            case "hA":          
                spriteName = "Ahearts";
                break;

            case "s2":          
                spriteName = "2spades";
                break;
            case "s3":          
                spriteName = "3spades";
                break;
            case "s4":          
                spriteName = "4spades";
                break;
            case "s5":          
                spriteName = "5spades";
                break;
            case "s6":          
                spriteName = "6spades";
                break;
            case "s7":          
                spriteName = "7spades";
                break;
            case "s8":          
                spriteName = "8spades";
                break;
            case "s9":          
                spriteName = "9spades";
                break;
            case "s10":          
                spriteName = "10spades";
                break;
            case "sJ":          
                spriteName = "Jspades";
                break;
            case "sQ":          
                spriteName = "Qspades";
                break;
            case "sK":          
                spriteName = "Kspades";
                break;
            case "sA":          
                spriteName = "Aspades";
                break;
            default:
                break;
        }

        return spriteName;
    }
}
