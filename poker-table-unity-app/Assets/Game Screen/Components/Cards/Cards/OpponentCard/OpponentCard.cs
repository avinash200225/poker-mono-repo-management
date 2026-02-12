using System;
using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class OpponentCard : MonoBehaviour
{
    public Image front;
    public Image back;
    public Image bgHighlight;

    public Sprite cardImage;

    Vector3 backStartPos;
    Vector3 frontStartPos;

    private bool introduceCard=true;

	public AudioSource swipeAudio;
	public AudioSource flipAudio;

    [SerializeField]
    // public string cardName = "zz";

    public Transform cardPlace;

    public GameObject shoePosition;


    public float cardIntroduceTime;
	public float cardRotateAngle;
	public float cardRotateTime;
	public float cardMovementDist;
	public float cardMovementTime;

    // Start is called before the first frame update
    void Start()
    {
        // addPhysics2DRaycaster();
        setImage ();
        bringCard ();

    }

    public void setImage()
    {
        // front.GetComponent<SpriteRenderer>().sprite = cardImage;
        front.sprite = cardImage;
        // Debug.Log("setImage called");
    }

    public void FadeOutCard()
    {
        Debug.Log("OpponentCard FadeOutCard");
        front.color = new Color(1, 1, 1, 0);
        // back.color = new Color(1, 1, 1, .3f);
        back.color = new Color(1, 1, 1, 1);
        bgHighlight.gameObject.SetActive(false);
    }

    public void SetFrontCardData(Sprite sprite)
    {
        cardImage = sprite;
        front.sprite = sprite;
    }

    public void ShowCard(Sprite sprite)
    {
        Debug.Log("OpponentCard ShowCard cardImage : " + sprite.name);
        front.overrideSprite = sprite;
        front.color = new Color(1, 1, 1, 1);
        back.color = new Color(1, 1, 1, 0);
        transform.localScale = new Vector3(0.75f, 0.75f, 0.75f); 
    }
    
    public void HideCard()
    {
        Debug.Log("OpponentCard HideCard");
        front.color = new Color(1, 1, 1, 0);
        back.color = new Color(1, 1, 1, 1);
        transform.localScale = new Vector3(0.25f, 0.25f, 0.25f); 
        bgHighlight.gameObject.SetActive(false);
    }


    public void bringCard()
	{
        Debug.Log("OpponentCard bringCard");
        if (swipeAudio != null)
        {
            swipeAudio.Play();
        }

        // HideCard();
        var cardSequence = DOTween.Sequence();
        cardSequence.Insert (0, this.gameObject.transform.DOMove (new Vector3(0, 0, 0), .5f, false).From().SetEase(Ease.Flash));
        cardSequence.Insert (0, this.gameObject.transform.DOScale (0, .5f).From().SetEase(Ease.Flash));
		cardSequence.SetLoops (1);

        // Invoke("playFlipSound",0.25f);
    }

    public void takeOutCard() {
        Debug.Log("OpponentCard takeOutCard");
        var cardSequence = DOTween.Sequence();
        cardSequence.Insert (0, this.gameObject.transform.DOMove (new Vector3(0, 0, 0), .5f, false).SetEase(Ease.Flash));
        cardSequence.Insert (0, this.gameObject.transform.DOScale (0, .5f).SetEase(Ease.Flash));
		cardSequence.SetLoops (1);
    }

	void playFlipSound()
	{
		flipAudio.Play ();
	}

    void addPhysics2DRaycaster() {
        Physics2DRaycaster physics2DRaycaster = GameObject.FindAnyObjectByType<Physics2DRaycaster>();
        if(physics2DRaycaster == null){
            Camera.main.gameObject.AddComponent<Physics2DRaycaster>();
        } else {
            // Debug.Log("Already Present");
        }
    }


}
