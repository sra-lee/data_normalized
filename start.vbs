Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' 스크립트가 있는 폴더로 이동
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
WshShell.CurrentDirectory = scriptDir

' Node.js 설치 확인
On Error Resume Next
WshShell.Run "node --version", 0, True
If Err.Number <> 0 Then
    MsgBox "Node.js가 설치되지 않았습니다." & vbCrLf & vbCrLf & _
           "Node.js를 설치하려면:" & vbCrLf & _
           "1. https://nodejs.org 방문" & vbCrLf & _
           "2. LTS 버전 다운로드 및 설치" & vbCrLf & _
           "3. 컴퓨터 재시작 후 다시 실행", vbCritical, "HR 데이터 정규화 도구"
    WScript.Quit
End If
On Error GoTo 0

' node_modules 폴더 확인 및 설치
If Not fso.FolderExists(scriptDir & "\node_modules") Then
    ' npm install을 숨겨진 창에서 실행
    WshShell.Run "npm install", 0, True
End If

' dist 폴더 확인 및 빌드
If Not fso.FileExists(scriptDir & "\dist\index.html") Then
    ' npm run build-web를 숨겨진 창에서 실행
    WshShell.Run "npm run build-web", 0, True
End If

' npm start 실행 (숨겨진 창)
WshShell.Run "npm start", 0, False