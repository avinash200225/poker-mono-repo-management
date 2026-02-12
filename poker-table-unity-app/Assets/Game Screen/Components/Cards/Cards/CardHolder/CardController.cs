using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;

public class CardController : MonoBehaviour, 
    IBeginDragHandler, IDragHandler, IEndDragHandler
{
    public GameObject front;
    public GameObject back;

    public Sprite cardImage;

    Vector3 backStartPos;
    Vector3 frontStartPos;

    private bool introduceCard=true;

	public AudioSource swipeAudio;
	public AudioSource flipAudio;

    public string cardName;

    public Transform cardPlace;


    public float cardIntroduceTime;
	public float cardRotateAngle;
	public float cardRotateTime;
	public float cardMovementDist;
	public float cardMovementTime;

    // Start is called before the first frame update
    void Start()
    {
        addPhysics2DRaycaster();
        setImage ();
        bringCard ();
    }

	public void setImage()
	{
		front.GetComponent<SpriteRenderer>().sprite = cardImage;
        // Debug.Log("setImage called");

	}

    public void bringCard()
	{
        // Debug.Log("bringCard called");
        swipeAudio.Play ();

        // var cardSequence = DOTween.Sequence();
        // cardSequence.Append (this.gameObject.transform.DOLocalMove (cardPlace.transform.position, cardIntroduceTime, false));
        // cardSequence.Append (this.gameObject.transform.DORotate(new Vector3(0,cardRotateAngle,0),cardRotateTime,RotateMode.LocalAxisAdd));
		// cardSequence.SetLoops (1);

        // Invoke("playFlipSound",0.25f);
    }

	void playFlipSound()
	{
		flipAudio.Play ();
	}

    private void OnEnable() {
    }
    void addPhysics2DRaycaster() {
        Physics2DRaycaster physics2DRaycaster = GameObject.FindAnyObjectByType<Physics2DRaycaster>();
        if(physics2DRaycaster == null){
            Camera.main.gameObject.AddComponent<Physics2DRaycaster>();
        } else {
            // Debug.Log("Already Present");
        }
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        backStartPos = back.transform.position;
        frontStartPos = front.transform.position;
        Debug.Log($"Drag Started startPos{backStartPos}");
        front.transform.position = frontStartPos + new Vector3(0,-14.5f, -.0001f); 
    }

    public void OnDrag(PointerEventData eventData)
    {
        Debug.Log($"Dragging {eventData.delta} Abs Delta {Math.Abs(eventData.delta.y * .1f)}");
        transform.position = new Vector3(
            transform.position.x, 
            transform.position.y + eventData.delta.y * .1f , 
            transform.position.z);

        if(eventData.delta.y > 0) {
            front.transform.position -= new Vector3(0, Math.Abs(eventData.delta.y * .1f), -.0001f);
        } else {
            front.transform.position += new Vector3(0, Math.Abs(eventData.delta.y * .1f * 2f), -.0001f);
        }
        
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        Debug.Log("Drag End.");
        back.transform.position = backStartPos;
        front.transform.position = frontStartPos;
    }

}
