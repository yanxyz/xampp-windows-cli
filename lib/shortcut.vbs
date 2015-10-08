If WScript.Arguments.Count < 2 Then
  MsgBox "not enough parameters" & vbCrLf & "Usage: shortcut.vbs exe lnk", vbCritical
  WScript.Quit(1)
End If

strExe = WScript.Arguments(0)
strLnk = WScript.Arguments(1)

Set fso = CreateObject("Scripting.FileSystemObject")
If Not fso.FileExists(strExe) Then
  MsgBox "xampp-control.exe not found" & vbCrLf & vbCrLf & strExe, vbCritical
  WScript.Quit(1)
End If

strFolder = fso.GetParentFolderName(strLnk)
If Not fso.FolderExists(strFolder) Then
  fso.CreateFolder(strFolder)
End If

Sub CreateShortcut()
  Set WshShell = WScript.createObject("WScript.Shell")
  Set oShellLink = WshShell.CreateShortcut(strLnk)
  oShellLink.TargetPath = strExe
  oShellLink.WorkingDirectory = fso.GetParentFolderName(strExe)
  oShellLink.Save
End Sub

CreateShortcut
