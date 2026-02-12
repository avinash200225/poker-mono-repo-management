using System;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Rendering.Universal.Internal;

public class CardRevealZ : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IDragHandler
{
    public Material cardMaterialFront;   // The Front Side material using the shader 
    public Material cardMaterialBack;     // The Back Side material using the shader 
    public float maxBendAmount = -0.05f;  // Maximum bend amount for the card
    private float currentBend = 0.0f;
    private float startMousePos;
    private bool isDragging = false;
    private Vector3 offset;
    private Camera mainCamera;

    // Layer mask to ignore the hand layer and only interact with the card layer
    public LayerMask cardLayerMask;

    private float finalMovePositionY;
    private const float moveDelta = -0.8f;
    private Vector3 initialCardPosition;
    private float dragDelta = 0;

    void Start(){

        mainCamera = Camera.main;
        initialCardPosition = transform.localPosition;
        finalMovePositionY = moveDelta;
        Debug.Log("Start");
    }

    // void Update()
    // {
    //     // Detect mouse or touch input
        
    //     if (Input.GetMouseButton(0) && isDragging)
    //     {
    //         // Calculate drag amount (drag downward)
    //         float dragAmount = (startMousePos - Input.mousePosition.y) / 1000f;
    //         Debug.Log("dragAmount : " + dragAmount);

    //         // if(Mathf.Abs(dragAmount) < -dragDelta){
    //         if (transform.position.y > dragDelta && dragAmount>0) {
    //             transform.position -= new Vector3(0, dragAmount/10, dragAmount/10);
    //         } else {
    //             // dragAmount = dragAmount - dragDelta;
    //             // Calculate bend based on drag
    //             currentBend = Mathf.Lerp(0, maxBendAmount, dragAmount);
    //             //Debug.Log("dragAmount : " + dragAmount + " currentBend : "+ currentBend);

    //             currentBend/=5; //Just to reduce bend over drag 

    //             // Apply the bend and reveal to the shader
    //             cardMaterialFront.SetFloat("_BendAmount", currentBend);
    //             cardMaterialBack.SetFloat("_BendAmount", currentBend);
    //         }
    //     }

    //     if (Input.GetMouseButtonDown(0))
    //     {
    //         startMousePos = Input.mousePosition.y;
    //         isDragging = true;
    //     }

    //     if (Input.GetMouseButtonUp(0))
    //     {
    //         isDragging = false;
    //         currentBend = 0;
    //         cardMaterialFront.SetFloat("_BendAmount", currentBend);
    //         cardMaterialBack.SetFloat("_BendAmount", currentBend);
    //         transform.position = initialCardPosition;
    //         startMousePos = initialCardPosition.y;
    //     }
    // }

    public void OnPointerDown(PointerEventData eventData)
    {    
        Debug.Log("OnPointerDown");
        Ray ray = mainCamera.ScreenPointToRay(eventData.position);
        RaycastHit hit;

        // Raycast against only the card layer
        if (Physics.Raycast(ray, out hit, Mathf.Infinity, cardLayerMask))
        {
            if (hit.transform.gameObject.layer == LayerMask.NameToLayer("Card"))
                {
                    // If a card is hit, start dragging it
                    Vector3 worldPosition = GetWorldPosition(eventData);
                    startMousePos = worldPosition.y;
                    isDragging = true;
                }
        }
    }
    
    public void OnDrag(PointerEventData eventData){

        // Debug.Log("OnDrag");
        if(isDragging){
            Vector3 worldPosition = GetWorldPosition(eventData);
            float dragAmount = (startMousePos - worldPosition.y) / 5;
            // Debug.Log("dragAmount : " + dragAmount);

            // if(Mathf.Abs(dragAmount) < -dragDelta){
            if (transform.localPosition.y > moveDelta) {
                if(dragAmount>0f){
                    transform.localPosition = initialCardPosition - new Vector3(0, dragAmount*5, 0);
                }
                dragDelta = dragAmount;
            } else {
                // Calculate bend based on drag
                currentBend = Mathf.Lerp(0, maxBendAmount, (dragAmount - dragDelta)*3);
                //Debug.Log("dragAmount : " + dragAmount + " currentBend : "+ currentBend);
                // currentBend/=5;
                // Apply the bend and reveal to the shader
                cardMaterialFront.SetFloat("_BendAmount", currentBend * 1.1f);
                cardMaterialBack.SetFloat("_BendAmount", currentBend* 1.1f);
                if(currentBend>-0.025){
                    transform.localPosition = new Vector3(transform.localPosition.x, moveDelta + currentBend*50, transform.localPosition.z);
                    finalMovePositionY = transform.localPosition.y;
                }else if(currentBend>-0.050){
                    transform.localPosition = new Vector3(transform.localPosition.x, finalMovePositionY + (currentBend+0.025f)*20, transform.localPosition.z);
                }
                // Debug.Log("currentBend : "+ currentBend);
            }
        }
    }
    
    public void OnPointerUp(PointerEventData eventData){

        Debug.Log("OnPointerUp");
        isDragging = false;
        currentBend = 0;
        cardMaterialFront.SetFloat("_BendAmount", currentBend);
        cardMaterialBack.SetFloat("_BendAmount", currentBend);
        transform.localPosition = initialCardPosition;
        startMousePos = initialCardPosition.y;
    }

    private Vector3 GetWorldPosition(PointerEventData eventData)
    {
        float distanceFromCamera = 10f; // Adjust based on your scene
        return mainCamera.ScreenToWorldPoint(new Vector3(eventData.position.x, eventData.position.y, distanceFromCamera));
    }
}