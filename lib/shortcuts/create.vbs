If WScript.Arguments.Count < 2 Then
  WScript.Echo "Two argumennts is required"
  WScript.Quit(1)
End If

exePath = WScript.Arguments(0)
lnkPath = WScript.Arguments(1)

Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FileExists(exePath) Then
  WScript.Echo "Not found: " & exePath
  WScript.Quit(1)
End If

dir = fso.GetParentFolderName(lnkPath)
If Not fso.FolderExists(dir) Then
  fso.CreateFolder(dir)
End If

Sub CreateShortcut()
  Set WshShell = WScript.createObject("WScript.Shell")
  Set link = WshShell.CreateShortcut(lnkPath)
  link.TargetPath = exePath
  link.WorkingDirectory = fso.GetParentFolderName(exePath)
  link.Save
End Sub

CreateShortcut
