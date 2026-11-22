[Setup]
AppName=WHITE Mod Launcher
AppVersion=1.0.6
DefaultDirName={autopf}\WHITE_Mod
DisableProgramGroupPage=yes
LicenseFile=EULA.txt
OutputDir=dist
OutputBaseFilename=WHITE_ModLauncher_Setup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
DefaultFont=Microsoft YaHei

[Tasks]
Name: "desktopicon"; Description: "Create a Desktop Shortcut"; GroupDescription: "Additional Icons"; Flags: unchecked

[Files]
Source: "dist\WHITE_ModLauncher.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "start_silent.vbs"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\WHITE Mod Launcher"; Filename: "{app}\start_silent.vbs"; IconFilename: "{app}\WHITE_ModLauncher.exe"
Name: "{autodesktop}\WHITE Mod Launcher"; Filename: "{app}\start_silent.vbs"; IconFilename: "{app}\WHITE_ModLauncher.exe"; Tasks: desktopicon
