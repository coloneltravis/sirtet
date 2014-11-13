Imports System.Drawing
Imports System.Math




Public Class TetrisBoard

    Public Const GridHeight = 20
    Public Const GridWidth = 10

    Public Const TotalShapes = 7

    Public Const Square_Shape As Integer = 1
    Public Const I_Shape As Integer = 2
    Public Const T_Shape As Integer = 3
    Public Const J_Shape As Integer = 4
    Public Const L_Shape As Integer = 5
    Public Const N_Shape As Integer = 6
    Public Const Z_Shape As Integer = 7

    Public Const Rotate_None = 1
    Public Const Rotate_90 = 2
    Public Const Rotate_180 = 3
    Public Const Rotate_270 = 4

    Public Const Red = 1
    Public Const Green = 2
    Public Const Blue = 3
    Public Const Cyan = 4
    Public Const Magenta = 5
    Public Const Yellow = 6
    Public Const Purple = 7
    Public Const Orange = 8


    Public Const StartRow = 3
    Public Const StartCol = 5

    Dim GameBoard(GridHeight, GridWidth) As Integer
    Dim MyShapes(TotalShapes) As Shape

    Dim LastShape, CurrentShape, NextShape As Integer

    Dim CurrentShapePos, LastShapePos As Point
    Dim Rotation, LastRotation As Integer
    Dim CurrentColour, NextColour As Integer

    Dim BlockWidth, BlockHeight As Integer

    Dim RedrawFlag, GameOver As Boolean

    Dim CompletedLines, CurrentScore, CurrentLevel As Integer


    Public Sub TetrisBoard()
        Init()
    End Sub


    Public Sub Init()
        Dim rows, cols As Integer

        CurrentShapePos = New Point(StartRow, StartCol)
        LastShapePos = New Point(StartRow, StartCol)

        LastRotation = Rotate_None
        Rotation = Rotate_None

        RedrawFlag = True

        For rows = 1 To GridHeight
            For cols = 1 To GridWidth
                GameBoard(rows, cols) = 0
            Next
        Next

        MyShapes(Square_Shape) = New Shape
        MyShapes(Square_Shape).Block(1) = New Point(0, 0)
        MyShapes(Square_Shape).Block(2) = New Point(-1, 0)
        MyShapes(Square_Shape).Block(3) = New Point(-1, 1)
        MyShapes(Square_Shape).Block(4) = New Point(0, 1)

        MyShapes(I_Shape) = New Shape
        MyShapes(I_Shape).Block(1) = New Point(-1, 0)
        MyShapes(I_Shape).Block(2) = New Point(0, 0)
        MyShapes(I_Shape).Block(3) = New Point(1, 0)
        MyShapes(I_Shape).Block(4) = New Point(2, 0)

        MyShapes(T_Shape) = New Shape
        MyShapes(T_Shape).Block(1) = New Point(0, 0)
        MyShapes(T_Shape).Block(2) = New Point(-1, 0)
        MyShapes(T_Shape).Block(3) = New Point(0, -1)
        MyShapes(T_Shape).Block(4) = New Point(0, 1)

        MyShapes(J_Shape) = New Shape
        MyShapes(J_Shape).Block(1) = New Point(0, 0)
        MyShapes(J_Shape).Block(2) = New Point(0, -1)
        MyShapes(J_Shape).Block(3) = New Point(-1, 0)
        MyShapes(J_Shape).Block(4) = New Point(-2, 0)

        MyShapes(L_Shape) = New Shape
        MyShapes(L_Shape).Block(1) = New Point(0, 0)
        MyShapes(L_Shape).Block(2) = New Point(0, 1)
        MyShapes(L_Shape).Block(3) = New Point(-1, 0)
        MyShapes(L_Shape).Block(4) = New Point(-2, 0)

        MyShapes(N_Shape) = New Shape
        MyShapes(N_Shape).Block(1) = New Point(0, 1)
        MyShapes(N_Shape).Block(2) = New Point(0, 0)
        MyShapes(N_Shape).Block(3) = New Point(-1, 1)
        MyShapes(N_Shape).Block(4) = New Point(1, 0)

        MyShapes(Z_Shape) = New Shape
        MyShapes(Z_Shape).Block(1) = New Point(0, 0)
        MyShapes(Z_Shape).Block(2) = New Point(0, -1)
        MyShapes(Z_Shape).Block(3) = New Point(-1, -1)
        MyShapes(Z_Shape).Block(4) = New Point(1, 0)

    End Sub


    Property RedrawBoard()
        Get
            Return RedrawFlag
        End Get
        Set(ByVal Value)
            RedrawFlag = Value
        End Set
    End Property


    Property Lines()
        Get
            Return CompletedLines
        End Get
        Set(ByVal Value)
            CompletedLines = Value
        End Set
    End Property



    Property Score()
        Get
            Return CurrentScore
        End Get
        Set(ByVal Value)
            CurrentScore = Value
        End Set
    End Property


    Property Level()
        Get
            Return CurrentLevel
        End Get
        Set(ByVal Value)
            CurrentLevel = Value
        End Set
    End Property


    Public Function IsGameOver() As Boolean
        ' check for game over - where the new shape cannot be drawn
        ' over a blank space

        Return GameOver
    End Function



    Public Sub NewGame()
        Lines = 0
        Score = 0
        Level = 1

        GameOver = False

        ClearBoard()

        AddNextShape()
        NewCurrentShape()
    End Sub



    Public Sub SetBlockSize(ByVal PixelWidth As Integer, ByVal PixelHeight As Integer)
        BlockWidth = PixelWidth / GridWidth
        BlockHeight = PixelHeight / GridHeight
    End Sub


    Public Sub DisplayLevel(ByRef g As System.Drawing.Graphics)
        Dim myFont As New Font("Elegance", 20, FontStyle.Regular)
        Dim txtLevel As String

        g.Clear(Color.Black)

        Dim brush As SolidBrush = New SolidBrush(Color.Cyan)

        txtLevel = CurrentLevel.ToString
        g.DrawString(txtLevel, myFont, brush, 0, 0)

        brush.Dispose()
        myFont.Dispose()
    End Sub


    Public Sub DisplayScore(ByRef g As System.Drawing.Graphics)
        Dim myFont As New Font("Elegance", 20, FontStyle.Regular)
        Dim txtScore As String

        g.Clear(Color.Black)

        Dim brush As SolidBrush = New SolidBrush(Color.LightGreen)

        txtScore = CurrentScore.ToString("0000000")
        g.DrawString(txtScore, myFont, brush, 0, 0)


        brush.Dispose()
        myFont.Dispose()
    End Sub


    Public Sub DisplayLines(ByRef g As System.Drawing.Graphics)

        Dim myFont As New Font("Elegance", 20, FontStyle.Regular)
        Dim txtLines As String

        g.Clear(Color.Black)

        Dim brush As SolidBrush = New SolidBrush(Color.Red)

        txtLines = Lines.ToString
        g.DrawString(txtLines, myFont, brush, 0, 0)

        brush.Dispose()
        myFont.Dispose()
    End Sub


    Public Sub DrawPreviewShape(ByRef g As System.Drawing.Graphics)

        Dim num As Integer
        Dim Xpos, Ypos As Integer

        g.Clear(Color.Black)

        If NextShape = 0 Then
            Exit Sub
        End If

        For num = 1 To 4
            Dim pt As Point = MyShapes(NextShape).Block(num)

            Xpos = pt.X + 3
            Ypos = pt.Y + 2

            Dim rect As Rectangle = New Rectangle
            rect.Location = New Point((Ypos - 1) * BlockWidth, (Xpos - 1) * BlockWidth)
            rect.Size = New Size(New Point(BlockWidth, BlockWidth))

            Dim brush As SolidBrush
            Dim pen As Pen

            brush = New SolidBrush(ConvertColour(NextColour))
            pen = New Pen(Color.White)

            g.FillRectangle(brush, rect)
            g.DrawRectangle(pen, rect)
        Next
    End Sub


    Public Sub DrawBoard(ByRef g As System.Drawing.Graphics)

        Dim rows, cols As Integer

        RedrawFlag = False

        g.Clear(Color.Transparent)

        For rows = 1 To GridHeight
            For cols = 1 To GridWidth
                If GameBoard(rows, cols) <> 0 Then
                    Dim rect As Rectangle = New Rectangle
                    rect.Location = New Point((cols - 1) * BlockWidth, (rows - 1) * BlockHeight)
                    rect.Size = New Size(New Point(BlockWidth, BlockHeight))

                    Dim brush As SolidBrush = New SolidBrush(ConvertColour(GameBoard(rows, cols)))
                    Dim pen As Pen = New Pen(Color.White)

                    g.FillRectangle(brush, rect)
                    g.DrawRectangle(pen, rect)

                    brush.Dispose()
                    pen.Dispose()
                End If
            Next
        Next

    End Sub


    Public Sub GetCurrentShape(ByRef aShape As Shape)

        Dim num As Integer

        For num = 1 To 4
            Dim pt As Point = MyShapes(CurrentShape).Block(num)
            Dim newPoint As Point = New Point

            Select Case Rotation
                Case Rotate_None
                    newPoint.X = CurrentShapePos.X + pt.X
                    newPoint.Y = CurrentShapePos.Y + pt.Y

                Case Rotate_90
                    newPoint.X = CurrentShapePos.X + pt.Y
                    newPoint.Y = CurrentShapePos.Y - pt.X

                Case Rotate_180
                    newPoint.X = CurrentShapePos.X - pt.X
                    newPoint.Y = CurrentShapePos.Y - pt.Y

                Case Rotate_270
                    newPoint.X = CurrentShapePos.X - pt.Y
                    newPoint.Y = CurrentShapePos.Y + pt.X
            End Select

            aShape.Block(num) = newPoint
        Next
    End Sub


    Public Sub DrawCurrentShape(ByRef g As System.Drawing.Graphics, ByVal Blank As Boolean)
        Dim num As Integer
        Dim Xpos, Ypos As Integer

        Dim thisShape As New Shape
        thisShape = New Shape

        GetCurrentShape(thisShape)

        For num = 1 To 4
            Xpos = thisShape.Block(num).X()
            Ypos = thisShape.Block(num).Y()

            Dim rect As Rectangle = New Rectangle
            rect.Location = New Point((Ypos - 1) * BlockWidth, (Xpos - 1) * BlockHeight)
            rect.Size = New Size(New Point(BlockWidth, BlockHeight))

            Dim brush As SolidBrush
            Dim pen As Pen

            If Not Blank Then
                brush = New SolidBrush(ConvertColour(GameBoard(Xpos, Ypos)))
                pen = New Pen(Color.White)
            Else
                brush = New SolidBrush(Color.Black)
                pen = New Pen(Color.Black)
            End If


            g.FillRectangle(brush, rect)
            g.DrawRectangle(pen, rect)
        Next
    End Sub



    Public Sub AddNextShape()

        Dim shp As Integer

        Randomize() ' Initialize random-number generator.

        shp = CInt(Int((7 * Rnd()) + 1))
        NextShape = shp

        NextColour = SelectColour()
    End Sub


    Public Sub NewCurrentShape()
        RedrawFlag = True
        CheckCompleteLines()

        CurrentShape = NextShape
        LastShape = CurrentShape

        LastShapePos.X = CurrentShapePos.X
        LastShapePos.Y = CurrentShapePos.Y

        CurrentShapePos.X = StartRow
        CurrentShapePos.Y = StartCol

        LastRotation = Rotate_None
        Rotation = Rotate_None

        CurrentColour = NextColour
    End Sub


    Public Sub UpdateShape()

        Dim num As Integer

        Dim oldShape As Shape = New Shape
        Dim newShape As Shape = New Shape

        Dim DropComplete As Boolean = False


        ' get the point coords for the old shape
        For num = 1 To 4
            Dim pt As Point = MyShapes(CurrentShape).Block(num)
            Dim oldPoint As Point = New Point

            Select Case LastRotation
                Case Rotate_None
                    oldPoint.X = LastShapePos.X + pt.X
                    oldPoint.Y = LastShapePos.Y + pt.Y

                Case Rotate_90
                    oldPoint.X = LastShapePos.X + pt.Y
                    oldPoint.Y = LastShapePos.Y - pt.X
                Case Rotate_180
                    oldPoint.X = LastShapePos.X - pt.X
                    oldPoint.Y = LastShapePos.Y - pt.Y

                Case Rotate_270
                    oldPoint.X = LastShapePos.X - pt.Y
                    oldPoint.Y = LastShapePos.Y + pt.X
            End Select

            oldShape.Block(num) = oldPoint
        Next

        If oldShape.FindMinWidth > 0 And oldShape.FindMaxWidth <= GridWidth And _
            oldShape.FindMinHeight > 0 And oldShape.FindMaxHeight <= GridHeight Then
            For num = 1 To 4
                Dim pt As Point = oldShape.Block(num)
                GameBoard(pt.X, pt.Y) = 0
            Next
        End If




        ' get the point coords for the new shape
        For num = 1 To 4
            Dim pt As Point = MyShapes(CurrentShape).Block(num)
            Dim newPoint As Point = New Point

            Select Case Rotation
                Case Rotate_None
                    newPoint.X = CurrentShapePos.X + pt.X
                    newPoint.Y = CurrentShapePos.Y + pt.Y

                Case Rotate_90
                    newPoint.X = CurrentShapePos.X + pt.Y
                    newPoint.Y = Abs(CurrentShapePos.Y - pt.X)

                Case Rotate_180
                    newPoint.X = CurrentShapePos.X - pt.X
                    newPoint.Y = CurrentShapePos.Y - pt.Y

                Case Rotate_270
                    newPoint.X = CurrentShapePos.X - pt.Y
                    newPoint.Y = CurrentShapePos.Y + pt.X
            End Select

            newShape.Block(num) = newPoint
        Next


        If newShape.FindMinWidth < 1 Then
            If Rotation <> LastRotation Then
                Rotation = LastRotation
            Else
                CurrentShapePos.Y = LastShapePos.Y
            End If

            GetCurrentShape(newShape)
        End If

        If newShape.FindMaxWidth > GridWidth Then
            If Rotation <> LastRotation Then
                Rotation = LastRotation
            Else
                CurrentShapePos.Y = LastShapePos.Y
            End If

            GetCurrentShape(newShape)
        End If


        ' checks to see if the shape cannot drop any further

        If newShape.FindMinWidth > 0 And newShape.FindMaxWidth <= GridWidth Then

            For num = 1 To 4
                Dim pt As Point = newShape.Block(num)

                If pt.X > GridHeight Or newShape.FindMaxHeight > GridHeight Then
                    DropComplete = True
                End If

                If newShape.FindMaxHeight <= GridHeight Then
                    If GameBoard(pt.X, pt.Y) <> 0 Then
                        DropComplete = True
                    End If
                End If
            Next


            ' if possible, update the game grid with the new shape
            If Not DropComplete Then
                DrawShape(newShape, CurrentColour)
            Else
                If oldShape.FindMaxHeight <= GridHeight Then
                    DrawShape(oldShape, CurrentColour)

                    ' if the shape has not dropped beyond the start row
                    ' then the game is over
                    If oldShape.FindMinHeight <= StartRow Then
                        GameOver = True
                    End If
                End If


                NewCurrentShape()
                AddNextShape()
            End If
        End If
    End Sub



    Public Sub DrawShape(ByVal aShape As Shape, ByVal Colour As Integer)
        Dim num As Integer

        For num = 1 To 4
            Dim pt As Point = aShape.Block(num)
            GameBoard(pt.X, pt.Y) = Colour
        Next

    End Sub


    Public Sub SaveShapePosition()
        LastShapePos.X = CurrentShapePos.X
        LastShapePos.Y = CurrentShapePos.Y
        LastRotation = Rotation
    End Sub


    Public Sub MoveShape_Down(ByRef g As System.Drawing.Graphics)
        SaveShapePosition()
        DrawCurrentShape(g, True)

        CurrentShapePos.X = CurrentShapePos.X + 1
        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub


    Public Sub MoveShape_Left(ByRef g As System.Drawing.Graphics)
        SaveShapePosition()
        DrawCurrentShape(g, True)

        CurrentShapePos.Y = CurrentShapePos.Y - 1
        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub


    Public Sub MoveShape_Right(ByRef g As System.Drawing.Graphics)
        SaveShapePosition()
        DrawCurrentShape(g, True)

        CurrentShapePos.Y = CurrentShapePos.Y + 1
        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub


    Public Sub RotateShape_Left(ByRef g As System.Drawing.Graphics)

        SaveShapePosition()
        DrawCurrentShape(g, True)

        Rotation = Rotation - 1

        If Rotation < Rotate_None Then
            Rotation = Rotate_270
        End If

        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub


    Public Sub RotateShape_Right(ByRef g As System.Drawing.Graphics)

        SaveShapePosition()
        DrawCurrentShape(g, True)

        Rotation = Rotation + 1

        If Rotation > Rotate_270 Then
            Rotation = Rotate_None
        End If

        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub



    Public Sub DropShape(ByRef g As System.Drawing.Graphics)

        Dim thisShape As Shape
        Dim num As Integer

        thisShape = New Shape

        SaveShapePosition()
        DrawCurrentShape(g, True)

        For num = 1 To 4
            Dim pt As Point = MyShapes(CurrentShape).Block(num)
            Dim thisPoint As Point = New Point

            Select Case Rotation
                Case Rotate_None
                    thisPoint.X = CurrentShapePos.X + pt.X
                    thisPoint.Y = CurrentShapePos.Y + pt.Y

                Case Rotate_90
                    thisPoint.X = CurrentShapePos.X + pt.Y
                    thisPoint.Y = CurrentShapePos.Y - pt.X

                Case Rotate_180
                    thisPoint.X = CurrentShapePos.X - pt.X
                    thisPoint.Y = CurrentShapePos.Y - pt.Y

                Case Rotate_270
                    thisPoint.X = CurrentShapePos.X - pt.Y
                    thisPoint.Y = CurrentShapePos.Y + pt.X
            End Select

            thisShape.Block(num) = thisPoint
        Next

        DrawShape(thisShape, 0)

        Dim Dropped = False
        Dim dropLength = 0


        Do While Not Dropped

            For num = 1 To 4

                Dim pt As Point = thisShape.Block(num)

                If thisShape.FindMaxHeight < GridHeight Then

                    If GameBoard(pt.X + 1, pt.Y) <> 0 Then
                        Dropped = True
                    Else
                        pt.X = pt.X + 1
                    End If

                    thisShape.Block(num) = pt
                Else : Dropped = True
                End If
            Next


            If Not Dropped Then
                dropLength = dropLength + 1
            End If
        Loop


        CurrentShapePos.X = CurrentShapePos.X + dropLength
        UpdateShape()
        DrawCurrentShape(g, False)
    End Sub



    Public Function SelectColour() As Integer

        Dim col As Integer

        Randomize()
        col = CInt(Int((8 * Rnd() + 1)))

        Return col
    End Function


    Public Function ConvertColour(ByVal col As Integer) As Color

        Dim SysColor As Color

        Select Case col
            Case Red
                Return SysColor.Red

            Case Blue
                Return SysColor.Blue

            Case Green
                Return SysColor.Green

            Case Cyan
                Return SysColor.Cyan

            Case Magenta
                Return SysColor.Magenta

            Case Yellow
                Return SysColor.Yellow

            Case Purple
                Return SysColor.Purple

            Case Orange
                Return SysColor.Orange
        End Select
    End Function


    Public Sub CheckCompleteLines()

        Dim rows, cols As Integer
        Dim Completed As Boolean
        Dim line_count As Integer

        Completed = True
        line_count = 0

        Do While Completed

            For rows = GridHeight To 1 Step -1

                Completed = True

                For cols = 1 To GridWidth

                    If GameBoard(rows, cols) = 0 Then
                        Completed = False
                    End If
                Next

                If Completed Then
                    RemoveLine(rows)
                    line_count = line_count + 1

                    RedrawFlag = True
                    Exit For
                End If
            Next
        Loop


        ' increase the level every 10 lines
        If CompletedLines > 0 And line_count > 0 Then
            Dim i As Integer
            For i = (CompletedLines + 1) To (CompletedLines + line_count)
                If i Mod 10 = 0 Then
                    CurrentLevel = CurrentLevel + 1
                End If
            Next
        End If


        CompletedLines = CompletedLines + line_count


        ' assign scores depending on number of lines removed
        Select Case line_count
            Case 1
                CurrentScore = CurrentScore + (CurrentLevel * 1)

            Case 2
                CurrentScore = CurrentScore + (CurrentLevel * 2)

            Case 3
                CurrentScore = CurrentScore + (CurrentLevel * 3)

            Case 4
                CurrentScore = CurrentScore + (CurrentLevel * 4) + (100 * CurrentLevel)
        End Select

    End Sub


    Public Sub RemoveLine(ByVal line As Integer)

        Dim rows, cols As Integer

        For rows = line To 2 Step -1
            For cols = 1 To GridWidth
                GameBoard(rows, cols) = GameBoard(rows - 1, cols)
            Next
        Next

        'initialise top row to 0's
        For cols = 1 To GridWidth
            GameBoard(1, cols) = 0
        Next
    End Sub


    Public Sub ClearBoard()

        Dim rows, cols As Integer

        For rows = 1 To GridHeight
            For cols = 1 To GridWidth
                GameBoard(rows, cols) = 0
            Next
        Next
    End Sub


End Class
