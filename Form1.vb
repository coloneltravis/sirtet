Imports System.Threading

Public Class MyTetrisForm
    Inherits System.Windows.Forms.Form

    Dim GameBoard As TetrisBoard

    Dim HighScoreMgr As HighScoreTable

    Dim GameLoop, SyncVar As Integer

    Dim StopTime As DateTime


    Dim BlockWidth, BlockHeight As Integer

#Region " Windows Form Designer generated code "

    Public Sub New()
        MyBase.New()

        'This call is required by the Windows Form Designer.
        InitializeComponent()

        'Add any initialization after the InitializeComponent() call

    End Sub

    'Form overrides dispose to clean up the component list.
    Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
        If disposing Then
            If Not (components Is Nothing) Then
                components.Dispose()
            End If
        End If
        MyBase.Dispose(disposing)
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    Friend WithEvents btnStart As System.Windows.Forms.Button
    Friend WithEvents Panel1 As System.Windows.Forms.Panel
    Friend WithEvents LoopTimer As System.Timers.Timer
    Friend WithEvents PreviewBox As System.Windows.Forms.Panel
    Friend WithEvents LevelDisplay As System.Windows.Forms.Panel
    Friend WithEvents ScoreDisplay As System.Windows.Forms.Panel
    Friend WithEvents LinesDisplay As System.Windows.Forms.Panel
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents btnHighScores As System.Windows.Forms.Button
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.btnStart = New System.Windows.Forms.Button
        Me.Panel1 = New System.Windows.Forms.Panel
        Me.LoopTimer = New System.Timers.Timer
        Me.PreviewBox = New System.Windows.Forms.Panel
        Me.LevelDisplay = New System.Windows.Forms.Panel
        Me.ScoreDisplay = New System.Windows.Forms.Panel
        Me.LinesDisplay = New System.Windows.Forms.Panel
        Me.Label1 = New System.Windows.Forms.Label
        Me.Label2 = New System.Windows.Forms.Label
        Me.Label3 = New System.Windows.Forms.Label
        Me.Label4 = New System.Windows.Forms.Label
        Me.btnHighScores = New System.Windows.Forms.Button
        CType(Me.LoopTimer, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'btnStart
        '
        Me.btnStart.CausesValidation = False
        Me.btnStart.Font = New System.Drawing.Font("Microsoft Sans Serif", 24.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnStart.Location = New System.Drawing.Point(440, 312)
        Me.btnStart.Name = "btnStart"
        Me.btnStart.Size = New System.Drawing.Size(144, 80)
        Me.btnStart.TabIndex = 2
        Me.btnStart.Text = "Start!"
        '
        'Panel1
        '
        Me.Panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.Panel1.CausesValidation = False
        Me.Panel1.Location = New System.Drawing.Point(16, 16)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(344, 568)
        Me.Panel1.TabIndex = 1
        Me.Panel1.TabStop = True
        '
        'LoopTimer
        '
        Me.LoopTimer.Interval = 10
        Me.LoopTimer.SynchronizingObject = Me
        '
        'PreviewBox
        '
        Me.PreviewBox.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.PreviewBox.Location = New System.Drawing.Point(488, 24)
        Me.PreviewBox.Name = "PreviewBox"
        Me.PreviewBox.Size = New System.Drawing.Size(144, 160)
        Me.PreviewBox.TabIndex = 4
        '
        'LevelDisplay
        '
        Me.LevelDisplay.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
        Me.LevelDisplay.Location = New System.Drawing.Point(504, 440)
        Me.LevelDisplay.Name = "LevelDisplay"
        Me.LevelDisplay.Size = New System.Drawing.Size(48, 32)
        Me.LevelDisplay.TabIndex = 5
        '
        'ScoreDisplay
        '
        Me.ScoreDisplay.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
        Me.ScoreDisplay.Location = New System.Drawing.Point(504, 480)
        Me.ScoreDisplay.Name = "ScoreDisplay"
        Me.ScoreDisplay.Size = New System.Drawing.Size(128, 32)
        Me.ScoreDisplay.TabIndex = 6
        '
        'LinesDisplay
        '
        Me.LinesDisplay.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
        Me.LinesDisplay.Location = New System.Drawing.Point(504, 520)
        Me.LinesDisplay.Name = "LinesDisplay"
        Me.LinesDisplay.Size = New System.Drawing.Size(80, 32)
        Me.LinesDisplay.TabIndex = 7
        '
        'Label1
        '
        Me.Label1.Font = New System.Drawing.Font("Arial", 20.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(405, 440)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(91, 32)
        Me.Label1.TabIndex = 8
        Me.Label1.Text = "Level"
        Me.Label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Label2
        '
        Me.Label2.Font = New System.Drawing.Font("Arial", 20.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label2.Location = New System.Drawing.Point(390, 488)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(106, 32)
        Me.Label2.TabIndex = 9
        Me.Label2.Text = "Score"
        Me.Label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Label3
        '
        Me.Label3.Font = New System.Drawing.Font("Arial", 20.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.Location = New System.Drawing.Point(424, 520)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(72, 32)
        Me.Label3.TabIndex = 10
        Me.Label3.Text = "Lines"
        Me.Label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Label4
        '
        Me.Label4.Font = New System.Drawing.Font("Arial", 20.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.Location = New System.Drawing.Point(384, 60)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(96, 88)
        Me.Label4.TabIndex = 11
        Me.Label4.Text = "Next Shape"
        '
        'btnHighScores
        '
        Me.btnHighScores.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnHighScores.Location = New System.Drawing.Point(456, 216)
        Me.btnHighScores.Name = "btnHighScores"
        Me.btnHighScores.Size = New System.Drawing.Size(112, 56)
        Me.btnHighScores.TabIndex = 12
        Me.btnHighScores.Text = "Hall of Fame"
        '
        'MyTetrisForm
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(672, 598)
        Me.Controls.Add(Me.btnHighScores)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Label1)
        Me.Controls.Add(Me.LinesDisplay)
        Me.Controls.Add(Me.ScoreDisplay)
        Me.Controls.Add(Me.LevelDisplay)
        Me.Controls.Add(Me.PreviewBox)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.btnStart)
        Me.KeyPreview = True
        Me.Name = "MyTetrisForm"
        Me.Text = "Jakris v1.0"
        CType(Me.LoopTimer, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

#End Region

    Private Sub Panel1_Paint(ByVal sender As System.Object, ByVal e As System.Windows.Forms.PaintEventArgs)
    End Sub


    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

        GameLoop = 1

        GameBoard = New TetrisBoard
        GameBoard.Init()
        GameBoard.SetBlockSize(Panel1.Size.Width, Panel1.Size.Height)

        HighScoreMgr = New HighScoreTable
    End Sub


    Private Sub btnStart_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnStart.Click

        ' start new game
        GameBoard.NewGame()

        StopTime = Nothing

        ' start game loop
        GameLoop = 0

        SyncVar = 0

        LoopTimer.Interval = 30
        LoopTimer.Enabled = True

        btnStart.Enabled = False
        btnHighScores.Enabled = False
    End Sub




    Private Sub MyTetrisForm_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles MyBase.KeyUp
        Dim g As Graphics = Panel1.CreateGraphics

        Select Case e.KeyCode
            Case System.Windows.Forms.Keys.Down
                GameBoard.RotateShape_Left(g)

            Case System.Windows.Forms.Keys.Up
                GameBoard.RotateShape_Right(g)

            Case System.Windows.Forms.Keys.Right
                GameBoard.MoveShape_Right(g)

            Case System.Windows.Forms.Keys.Left
                GameBoard.MoveShape_Left(g)

            Case System.Windows.Forms.Keys.Space
                GameBoard.DropShape(g)
        End Select

        e.Handled = True
    End Sub


    Private Sub LoopTimer_Elapsed(ByVal sender As System.Object, ByVal e As System.Timers.ElapsedEventArgs) Handles LoopTimer.Elapsed

        Dim g As Graphics = Panel1.CreateGraphics

        GameLoop = GameLoop + 1


        Dim sync As Integer = Interlocked.CompareExchange(SyncVar, 1, 0)

        If sync <> 0 Then
            Exit Sub
        End If

        Dim delay = 20 - (GameBoard.Level - 1)

        If GameLoop = delay Then
            GameBoard.MoveShape_Down(g)
            GameLoop = 0
        End If


        If GameBoard.RedrawBoard Then
            GameBoard.DrawBoard(g)

            Dim leveldisp As Graphics = LevelDisplay.CreateGraphics
            GameBoard.DisplayLevel(leveldisp)
            leveldisp.Dispose()

            Dim scoredisp As Graphics = ScoreDisplay.CreateGraphics
            GameBoard.DisplayScore(scoredisp)
            scoredisp.Dispose()

            Dim linesdisp As Graphics = LinesDisplay.CreateGraphics
            GameBoard.DisplayLines(linesdisp)
            linesdisp.Dispose()

            Dim previewdisp As Graphics = PreviewBox.CreateGraphics
            GameBoard.DrawPreviewShape(previewdisp)
            previewdisp.Dispose()
        End If


        If GameBoard.IsGameOver Then
            LoopTimer.Enabled = False

            btnStart.Enabled = True
            btnHighScores.Enabled = True

            EndGame(g)

            Dim Index As Integer = HighScoreMgr.IsHighScore(GameBoard.Lines)
            If Index > 0 Then
                Dim HSEntryForm As HighScoreEntry = New HighScoreEntry

                HSEntryForm.Init(GameBoard.Score, GameBoard.Lines)

                HSEntryForm.ShowDialog(Me)
                If HSEntryForm.DialogResult = DialogResult.OK Then
                    Dim NewHighScore As HighScoreRec = New HighScoreRec(GameBoard.Score, GameBoard.Lines, HSEntryForm.PlayerName)
                    HighScoreMgr.InsertHighScore(Index, NewHighScore)
                End If

            End If
        End If

        SyncVar = 0
        g.Dispose()
    End Sub


    Private Sub MyTetrisForm_Paint(ByVal sender As Object, ByVal e As System.Windows.Forms.PaintEventArgs) Handles MyBase.Paint
        Dim g As Graphics = Panel1.CreateGraphics
        GameBoard.DrawBoard(g)

        If GameBoard.IsGameOver Then
            EndGame(g)
        End If

        g.Dispose()


        Dim leveldisp As Graphics = LevelDisplay.CreateGraphics
        GameBoard.DisplayLevel(leveldisp)
        leveldisp.Dispose()

        Dim scoredisp As Graphics = ScoreDisplay.CreateGraphics
        GameBoard.DisplayScore(scoredisp)
        scoredisp.Dispose()

        Dim linesdisp As Graphics = LinesDisplay.CreateGraphics
        GameBoard.DisplayLines(linesdisp)
        linesdisp.Dispose()

        Dim previewdisp As Graphics = PreviewBox.CreateGraphics
        GameBoard.DrawPreviewShape(previewdisp)
        previewdisp.Dispose()
    End Sub


    Public Sub EndGame(ByRef g As System.Drawing.Graphics)

        Dim rect As Rectangle = New Rectangle

        rect.Location = New Point(0, (Panel1.Size.Height / 3))
        rect.Size = New Size(Panel1.Size.Width(), Panel1.Size.Height() / 3)

        Dim backBrush As SolidBrush = New SolidBrush(Color.Black)
        Dim pen As Pen = New Pen(Color.White)

        g.FillRectangle(backBrush, rect)
        'g.DrawRectangle(pen, rect)

        Dim txtBrush As SolidBrush = New SolidBrush(Color.DeepSkyBlue)
        Dim myFont As New Font("Elegance", 30, FontStyle.Bold)
        g.DrawString("GAME OVER", myFont, txtBrush, Panel1.Size.Width / 6, (Panel1.Size.Height / 3) + myFont.Height)
    End Sub


    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnHighScores.Click
        Dim g As Graphics = Panel1.CreateGraphics
        HighScoreMgr.ShowHighScores(g)
    End Sub
End Class
