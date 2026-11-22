[Setup]
AppName=WHITE Mod Launcher
AppVersion=1.0.0
DefaultDirName={autopf}\WHITE_Mod
LicenseFile=EULA.txt
OutputDir=dist
OutputBaseFilename=WHITE_ModLauncher_Setup
Compression=lzma
[Files]
Source: "dist\WHITE_ModLauncher.exe"; DestDir: "{app}"
[Icons]
Name: "{autodesktop}\WHITE Mod Launcher"; Filename: "{app}\WHITE_ModLauncher.exe"
