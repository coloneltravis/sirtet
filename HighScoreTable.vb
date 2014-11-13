
Imports System.IO


Public Class HighScoreTable

    Private HighScores(10) As HighScoreRec

    Private highscoreFile As String = "highScore.dat"


    Public Sub HighScoreTable()
        Load_HighScores()
    End Sub


    Public Sub New()
        Load_HighScores()
    End Sub


    Public Sub Init_HighScores()

        Dim i As Integer

        For i = 1 To 10
            HighScores(i) = New HighScoreRec
        Next i

        Save_HighScores()
    End Sub


    Public Sub Load_HighScores()

        If Not File.Exists(highscoreFile) Then
            Init_HighScores()
            Return
        End If


        ' Create the reader for data.
        Dim fs As FileStream = New FileStream(highscoreFile, FileMode.Open, FileAccess.Read)

        Dim r As BinaryReader = New BinaryReader(fs)

        Dim i As Integer

        ' Read data from Test.data.
        For i = 1 To 10
            Dim score As Integer = r.ReadInt32()
            Dim lines As Integer = r.ReadInt32()
            Dim name As String = r.ReadString()

            HighScores(i) = New HighScoreRec(score, lines, name)
        Next i

        r.Close()
        fs.Close()

    End Sub


    Public Sub Save_HighScores()

        Dim fs As FileStream


        ' Create the data file
        If Not File.Exists(highscoreFile) Then
            fs = New FileStream(highscoreFile, FileMode.CreateNew)
        Else
            fs = New FileStream(highscoreFile, FileMode.Create)
        End If


        ' Create the writer for data.
        Dim w As BinaryWriter = New BinaryWriter(fs)

        ' Write data to Test.data.
        Dim i As Integer

        For i = 1 To 10
            w.Write(CInt(HighScores(i).Score))
            w.Write(CInt(HighScores(i).Lines))
            w.Write(HighScores(i).Name)
        Next i

        w.Close()
        fs.Close()

    End Sub



    Public Function IsHighScore(ByVal newscore As Integer) As Integer

        Dim pos As Integer

        For pos = 1 To 10
            If newscore > HighScores(pos).Lines() Then
                Return pos
            End If
        Next pos

        Return 0

    End Function


    Public Sub InsertHighScore(ByVal Pos As Integer, ByVal NewScore As HighScoreRec)
        Dim i As Integer

        For i = 10 To (Pos + 1) Step -1
            HighScores(i) = HighScores(i - 1)
        Next

        HighScores(Pos) = NewScore

        Save_HighScores()
    End Sub



    Public Sub ShowHighScores(ByRef g As System.Drawing.Graphics)
        Dim i As Integer

        Dim myFont As New Font("Elegance", 20, FontStyle.Regular)
        Dim brush As SolidBrush = New SolidBrush(Color.White)

        g.Clear(Color.Black)

        For i = 1 To 10
            Dim LineText As String

            LineText = HighScores(i).Name
            g.DrawString(LineText, myFont, brush, 0, (i * myFont.Height))

            LineText = HighScores(i).Lines.ToString & "   " & _
                        HighScores(i).Score.ToString

            g.DrawString(LineText, myFont, brush, (10 * (myFont.Height / 2)), (i * myFont.Height))
        Next

        brush.Dispose()
        myFont.Dispose()
    End Sub
End Class
