using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ClickController : MonoBehaviour
{
    
    [SerializeField] WebSocketManager wc;
    BetPanelController betPanelController;
    [SerializeField] TableData tableData;
    [SerializeField] Seat seatData;

    // [SerializeField] RectTransform coinsContainer;

    bool panelOut = false;

    void Awake() {
        Setup();
    }
    void Setup() {
        wc = FindAnyObjectByType<WebSocketManager>();
        
    }

    // Start is called before the first frame update
    void Start()
    {
        betPanelController = BetPanelController.Instance;

        wc.configState.OnPokerVariantChangeAction += UpdateGameVariant;
        wc.configState.OnBetLimitChangeAction += UpdateGameVariant;

        wc.tableState.OnTableStateChanged += HandleTableStateChanged;
        wc.mySeat.OnSeatStateChanged += HandleSeatStateChanged;

        // wc.mySeat.OnActionsModified += HandleActionsChanged;
        wc.mySeat.OnActionsModified += HandleActionButtons;

        
    }

    void UpdateGameVariant() {
        // switch(wc.configState.betLimit) {
        //     case "Fixed Limit" or "Limit":
        //         coinsContainer.localScale = new Vector3(0,0,0);
        //         break;
        //     case "Pot Limit":
        //         coinsContainer.localScale = new Vector3(1,1,1);
        //         break;
        //     case "No Limit":
        //         coinsContainer.localScale = new Vector3(1,1,1);
        //         break;
        //     default:
        //         break; 
        // }
    }

    void HandleTableStateChanged() {
        wc.tableState.CopyToTable(tableData);
    }

    void HandleSeatStateChanged() {
        wc.mySeat.CopyToSeatData(seatData);
    }

    
    // void HandleActionsChanged() {
    //     {/* actions[0] - Fold */}
    //     {/* actions[1] - Check */}
    //     {/* actions[2] - Raise & Its Slider */}
    //     {/* actions[3] - Bet & Its Slider */}
    //     {/* actions[4] - Call */}
    //     {/* actions[5] - All In */}
    //     if(wc.mySeat.actions.Count == 0 || (wc.mySeat.actions.Count > 0 && wc.mySeat.actions.All(action => action == false) )) {
    //         if(!panelOut) {

    //             panelOut = true;
    //             //Takeout
    //             TakePanelOut();
    //         }

    //     } else {
            
    //         if(panelOut) {
    //             panelOut = false;
    //             //Bring in panel
    //             BringPanelIn();
    //         }
     
    //     }
    // }

    // void TakePanelOut() {
    //     HandleActionButtons();
    //     // DOTween.Sequence()
    //     //         .Join(DOTween.To(() => betPanelController.coinPanelObj.anchorMin, x => betPanelController.coinPanelObj.anchorMin = x, new Vector2(0f, 1f), 1f))
    //     //         .Join(DOTween.To(() => betPanelController.coinPanelObj.anchorMax, x => betPanelController.coinPanelObj.anchorMax = x, new Vector2(0f, 1f), 1f))
    //     //         .SetRelative(true)
    //     //         .Play();
    //     // DOTween.Sequence()
    //     //         .Join(DOTween.To(() => betPanelController.buttonPanelObj.anchorMin, x => betPanelController.buttonPanelObj.anchorMin = x, new Vector2(0f, 1f), 1f))
    //     //         .Join(DOTween.To(() => betPanelController.buttonPanelObj.anchorMax, x => betPanelController.buttonPanelObj.anchorMax = x, new Vector2(0f, 1f), 1f))
    //     //         .SetRelative(true)
    //     //         .Play();
    // }
    // void BringPanelIn() {
    //     HandleActionButtons();

    //     // DOTween.Sequence()
    //     //         .Join(DOTween.To(() => betPanelController.coinPanelObj.anchorMin, x => betPanelController.coinPanelObj.anchorMin = x, new Vector2(0f, -1f), 1f))
    //     //         .Join(DOTween.To(() => betPanelController.coinPanelObj.anchorMax, x => betPanelController.coinPanelObj.anchorMax = x, new Vector2(0f, -1f), 1f))
    //     //         .SetRelative(true)
    //     //         .Play();
    //     // DOTween.Sequence()
    //     //         .Join(DOTween.To(() => betPanelController.buttonPanelObj.anchorMin, x => betPanelController.buttonPanelObj.anchorMin = x, new Vector2(0f, -1f), 1f))
    //     //         .Join(DOTween.To(() => betPanelController.buttonPanelObj.anchorMax, x => betPanelController.buttonPanelObj.anchorMax = x, new Vector2(0f, -1f), 1f))
    //     //         .SetRelative(true)
    //     //         .Play();
    // }

    void HandleActionButtons() {
        
        if(wc.mySeat.actions.Count > 0 && wc.mySeat.actions[0]) {
            if(!betPanelController.FoldBtn.gameObject.activeSelf) {
                betPanelController.FoldBtn.gameObject.SetActive(true);
            }
        } else {
            if(betPanelController.FoldBtn.gameObject.activeSelf) {
                betPanelController.FoldBtn.gameObject.SetActive(false);
            }
        }
        if(wc.mySeat.actions.Count > 1 && wc.mySeat.actions[1]) {
            if(!betPanelController.CheckBtn.gameObject.activeSelf) {
                betPanelController.CheckBtn.gameObject.SetActive(true);
            }
        } else {
            if(betPanelController.CheckBtn.gameObject.activeSelf) {
                betPanelController.CheckBtn.gameObject.SetActive(false);
            }
        }
        if(wc.mySeat.actions.Count > 2 && wc.mySeat.actions[2]) {
                betPanelController.RaiseBtn.transform.localScale = new Vector3(1,1,1);
        } else {
                betPanelController.RaiseBtn.transform.localScale = new Vector3(0,0,0);
        }
        if(wc.mySeat.actions.Count > 3 && wc.mySeat.actions[3]) {
                betPanelController.BetBtn.transform.localScale = new Vector3(1,1,1);
        } else {
                betPanelController.BetBtn.transform.localScale = new Vector3(0,0,0);
        }
        if(wc.mySeat.actions.Count > 4 && wc.mySeat.actions[4]) {
                betPanelController.CallBtn.transform.localScale = new Vector3(1,1,1);
        } else {
                betPanelController.CallBtn.transform.localScale = new Vector3(0, 0, 0);
        }
        if(wc.mySeat.actions.Count > 5 && 
           wc.mySeat.actions[5] && 
           wc.configState.betLimit == "No Limit"
           ) {
                betPanelController.AllInBtn.transform.localScale = new Vector3(1,1,1);

        } else {

            if (wc.tableState.raiseAmount > wc.mySeat.balance && wc.mySeat.balance>0)
            {
                betPanelController.AllInBtn.transform.localScale = new Vector3(1,1,1);
            }
            else
            {
                betPanelController.AllInBtn.transform.localScale = new Vector3(0, 0, 0);
            }
        }
    }

    // private void Update() {
    //     if(Input.GetKeyDown(KeyCode.DownArrow)){
    //         BringPanelIn();
    //     }
    //     if(Input.GetKeyDown(KeyCode.UpArrow)){
    //         TakePanelOut();
    //     }
    // }

}


