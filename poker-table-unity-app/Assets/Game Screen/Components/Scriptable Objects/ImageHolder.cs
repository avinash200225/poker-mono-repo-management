using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "ImageHolder", menuName = "ScriptableObjects/Image Holder", order = 1)]
public class ImageHolder : ScriptableObject
{
    [System.Serializable]
    public class NamedSprite
    {
        public string name;   // key you’ll use in code
        public Sprite sprite; // actual image
    }

    public List<NamedSprite> images = new List<NamedSprite>();

    // Get a sprite by its name (case-sensitive)
    public Sprite GetByName(string spriteName)
    {
        foreach (var ns in images)
        {
            if (ns != null && ns.name == spriteName)
                return ns.sprite;
        }
        Debug.LogWarning($"Sprite with name '{spriteName}' not found in ImageSet {this.name}");
        return null;
    }

    // Optional: case-insensitive lookup
    public Sprite GetByNameIgnoreCase(string spriteName)
    {
        foreach (var ns in images)
        {
            if (ns != null && ns.name.Equals(spriteName, System.StringComparison.OrdinalIgnoreCase))
                return ns.sprite;
        }
        Debug.LogWarning($"Sprite with name '{spriteName}' not found in ImageSet {this.name}");
        return null;
    }
}
