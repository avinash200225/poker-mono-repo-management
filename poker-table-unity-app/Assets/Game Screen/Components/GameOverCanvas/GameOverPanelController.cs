using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class GameOverPanelController : MonoBehaviour
{
    [Header("Internal Objects")]
    [SerializeField] RectTransform gameOverPanel;
    [SerializeField] TMP_Text gameOverText;

    [Header("External")]
    WebSocketManager wc;
    
    private void Start() {
        
    }
}
