using System;
using System.IO;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

public static class BuildScript
{
    public static void BuildAndroid()
    {
        try
        {
            Debug.Log("🚀 BuildAndroid: starting…");

            string buildPath = GetArg("-customBuildPath");
            if (string.IsNullOrEmpty(buildPath))
            {
                buildPath = Path.Combine("Builds", "Android", "poker.apk");
                Debug.LogWarning($"-customBuildPath not supplied, defaulting to: {buildPath}");
            }
            Directory.CreateDirectory(Path.GetDirectoryName(buildPath));

            // Collect enabled scenes
            var enabledScenes = Array.FindAll(EditorBuildSettings.scenes, s => s.enabled);
            if (enabledScenes.Length == 0)
            {
                Debug.LogWarning("No scenes enabled in Build Settings. Forcing SampleScene...");
                enabledScenes = new EditorBuildSettingsScene[]
                {
                    new EditorBuildSettingsScene("Assets/Scenes/SampleScene.unity", true)
                };
            }
            string[] scenePaths = Array.ConvertAll(enabledScenes, s => s.path);

            // Android build settings
            EditorUserBuildSettings.buildAppBundle = false; // produce APK
            EditorUserBuildSettings.exportAsGoogleAndroidProject = false;
            EditorUserBuildSettings.androidBuildSystem = AndroidBuildSystem.Gradle;
            EditorUserBuildSettings.androidCreateSymbols = AndroidCreateSymbols.Public;
            EditorUserBuildSettings.development = false;
            PlayerSettings.Android.useCustomKeystore = false;

            var options = new BuildPlayerOptions
            {
                scenes = scenePaths,
                locationPathName = buildPath,
                target = BuildTarget.Android,
                options = BuildOptions.None
            };

            BuildReport report = BuildPipeline.BuildPlayer(options);
            var summary = report.summary;

            if (summary.result == BuildResult.Succeeded)
            {
                Debug.Log($"✅ Build succeeded: {summary.outputPath}  size={(summary.totalSize / (1024f * 1024f)):0.0} MB");
            }
            else
            {
                throw new Exception($"Build failed: {summary.result}  warnings={summary.totalWarnings} errors={summary.totalErrors}");
            }
        }
        catch (Exception ex)
        {
            Debug.LogError($"❌ BuildAndroid exception: {ex}");
            EditorApplication.Exit(1); // non-zero exit code for CI
        }
    }

    private static string GetArg(string name)
    {
        var args = Environment.GetCommandLineArgs();
        for (int i = 0; i < args.Length; i++)
            if (args[i] == name && i + 1 < args.Length)
                return args[i + 1];
        return null;
    }
}
