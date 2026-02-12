// using DG.Tweening;
using UnityEngine;
using UnityEngine.UIElements;

[System.Serializable]
public class CardState
{

    float opacity = 1;
    float scaleHalf = 0.5f;
    float scaleQuarter = 0.25f;

    public delegate void CallBacktype(string action, string cardName);
    public event CallBacktype OnCardAction;

    public VisualElement ui;
    private string _name;
    public string name{
        get{return _name;} 
        set {
            if(value == "xx"){
                if(_name != value) {
                    _name = value ; 
                    OnCardAction?.Invoke("Back", "xx");
                }
            } else if(_name == "xx" && !string.IsNullOrEmpty(value) && value.Length == 2){
                _name = value ; 
                OnCardAction?.Invoke("Front", value);
            } else {
                _name = value ; 
                OnCardAction?.Invoke("Empty", "");
            }
        }
    }

    
    public CardState(VisualElement ui, string name = "") {
        this.name = name;
        this.ui = ui;

        OnCardAction += CallbackCardAction;
    }

    void CallbackCardAction(string action, string cardName) {
        
        switch(action) {
            case "Empty":
                ui.style.display = DisplayStyle.None; 
                break;
            case "Back":
                ui.style.display = DisplayStyle.Flex;
                ui.style.backgroundImage =  Resources.Load("CardBack") as Texture2D;

                // BringCard();
                break;
            case "Front":
                ui.style.display = DisplayStyle.Flex;
                // Card0.style.backgroundImage =  Resources.Load("CardBack.png") as Texture2D;
                break;
            default:
                break;    
        }
    }

    private void OnOpacityUpdate()
    {
        ui.style.opacity = opacity;
    }

    // public void BringCard(){
    //     var savePos = ui.transform.position;
    //     Sequence cardPathSequence = DOTween.Sequence();
    //     // cardPathSequence.Insert(0, DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(5f, 5f, 1f), 2f));
    //     cardPathSequence.Insert(1, DOTween.To(() => ui.transform.position, x => ui.transform.position = x, new Vector3(0, -1200, 0), .1f).From(true));
    //     // cardPathSequence.Insert(1, DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(1f, 1f, 1f), 2f));
    //     // cardPathSequence.Insert(2, DOTween.To(() => ui.transform.rotation, x => ui.transform.rotation = x, new Vector3(0, 0, 180f), 1f));

    //     cardPathSequence.SetLoops (1);
    // }
	// public void flashCard()
	// {
	// 	Sequence cardScaleSequence = DOTween.Sequence();
    //     cardScaleSequence.Append (DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(0.5f, 0.5f, 1f), 2f));
    //     cardScaleSequence.Append (DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(1f, 1f, 1f), 2f));
    //     cardScaleSequence.Append (DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(.5f, 0.5f, 1f), 2f));
    //     cardScaleSequence.Append (DOTween.To(() => ui.transform.scale, x => ui.transform.scale = x, new Vector3(1f, 1f, 1f), 2f));
	// 	cardScaleSequence.SetLoops (2);
	// }

}