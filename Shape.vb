Public Class Shape

    Dim BlockList(4) As Point



    Public Sub Shape()

    End Sub


    Public Property Block(ByVal index As Integer) As Point
        Get
            Return BlockList(index)
        End Get
        Set(ByVal Value As Point)
            BlockList(index) = Value
        End Set
    End Property



    Public Function FindMinHeight() As Integer

        Dim num As Integer
        Dim Min As Integer = 50

        For num = 1 To 4
            If BlockList(num).X < Min Then
                Min = BlockList(num).X
            End If
        Next

        Return Min
    End Function


    Public Function FindMaxHeight() As Integer

        Dim num As Integer
        Dim Max As Integer = 0

        For num = 1 To 4
            If BlockList(num).X > Max Then
                Max = BlockList(num).X
            End If
        Next

        Return Max
    End Function


    Public Function FindMinWidth() As Integer

        Dim num As Integer
        Dim Min As Integer = 50

        For num = 1 To 4
            If BlockList(num).Y < Min Then
                Min = BlockList(num).Y
            End If
        Next

        Return Min
    End Function


    Public Function FindMaxWidth() As Integer

        Dim num As Integer
        Dim Max As Integer = 0

        For num = 1 To 4
            If BlockList(num).Y > Max Then
                Max = BlockList(num).Y
            End If
        Next

        Return Max
    End Function


    Public Function IsPntInShp(ByVal pt As Point) As Boolean
        Dim num As Integer
        Dim match As Boolean

        match = True

        For num = 1 To 4
            If Not BlockList(num).Equals(pt) Then
                match = False
            End If
        Next

        Return True
    End Function
End Class
