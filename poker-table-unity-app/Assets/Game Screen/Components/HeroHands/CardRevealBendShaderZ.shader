Shader "Custom/CardRevealBendShaderZ"
{
    Properties
    {
        _BendAmount ("Bend Amount", Float) = 0.0
        _MainTex ("Front Texture", 2D) = "white" {}
        _BackTex ("Back Texture", 2D) = "white" {}
    }
    SubShader
    {
        Tags { 
            "Queue" = "Transparent"
            "RenderType"="Opaque" 
        }
        Cull Off  // Disable culling to render both sides of the plane
        Blend One OneMinusSrcAlpha
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            float _BendAmount;
            sampler2D _MainTex;
            sampler2D _BackTex;

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 pos : SV_POSITION;
            };

            v2f vert(appdata v)
            {
                v2f o;

                // Calculate bending based on UV.y
                float yFactor = v.uv.y;
                float bend = _BendAmount * (0.8 - yFactor) * (0.8 - yFactor);

                // Apply the bend effect
                v.vertex.z += bend * 0.3;
                v.vertex.y -= bend * 0.8;
                v.vertex.x += bend * 0.25;

                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;

                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                // Render the front texture
                fixed4 frontColor = tex2D(_MainTex, i.uv);

                // Render the back texture with UV flipping
                fixed4 backColor = tex2D(_BackTex, float2(1.0 - i.uv.x, i.uv.y));

                // Mix front and back textures based on the reveal amount
                float revealFactor = smoothstep(0.0, 1, i.uv.y);
                return lerp(backColor, frontColor, 0);
            }

            ENDCG
        }
    }
}