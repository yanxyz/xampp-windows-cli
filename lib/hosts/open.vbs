Set WshShell = CreateObject("WScript.Shell")
windir = WshShell.ExpandEnvironmentStrings("%windir%")
hosts = windir & "\System32\drivers\etc\hosts"

Sub Open
    Set shell = CreateObject("Shell.Application")
    shell.ShellExecute "notepad.exe", hosts, "", "runas", 1
End Sub

Open
