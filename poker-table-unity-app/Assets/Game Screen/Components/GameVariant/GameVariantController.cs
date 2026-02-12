using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class GameVariantController : MonoBehaviour
{
    public Sprite[] variants;

    public Image  image;
    public AudioSource notificatinSound;
    
    string gameVariant;


    WebSocketManager wc;

    private void OnEnable() {
        wc = FindAnyObjectByType<WebSocketManager>();
    }
    // Start is called before the first frame update
    void Start()
    {
        wc.configState.OnPokerVariantChangeAction += UpdateGameVariant;
        wc.configState.OnBetLimitChangeAction += UpdateGameVariant;
    }

    void UpdateGameVariant()
    {
        Sequence sequence = DOTween.Sequence()
                .Append(image.transform.DOLocalRotate(new Vector3(360, 0, 0), 2, RotateMode.FastBeyond360));
        // .Join(image.transform.DOPunchScale(new Vector3(0.5f, 0.5f, 0.5f), 1, 10, 1f));
        sequence.SetLoops(1);

        // Tween tween = Amount.DOCounter(fromValue: curBalance, endValue: (int)wc.mySeat.balance, duration: 4f, addThousandsSeparator: true, culture: null);
        // sequence.Append(tween);
        // sequence.SetLoops (1);

        gameVariant = "";
        switch (wc.configState.betLimit)
        {
            case "Fixed Limit" or "Limit":
                gameVariant = "Limit";
                break;
            case "Pot Limit":
                gameVariant = "PotLimit";
                break;
            case "No Limit":
                gameVariant = "NoLimit";
                break;
            default:
                gameVariant = "Limit";
                break;
        }
        gameVariant = wc.configState.pokerVariant + gameVariant;
        StartCoroutine(CoroutineUpdateGameVariant());
    }

    IEnumerator CoroutineUpdateGameVariant()
    {
        notificatinSound.Play();
        for (int i = 0; i < variants.Length; i++)
        {
            if (variants[i].name == gameVariant && image != null)
            {
                image.sprite = variants[i];
                image.SetNativeSize();
            }
        }
        yield return new WaitForEndOfFrame();
    }

}
