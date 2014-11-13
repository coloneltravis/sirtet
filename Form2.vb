Public Class HighScoreEntry
    Inherits System.Windows.Forms.Form

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
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents Label5 As System.Windows.Forms.Label
    Friend WithEvents txtName As System.Windows.Forms.TextBox
    Friend WithEvents btnOK As System.Windows.Forms.Button
    Friend WithEvents txtScore As System.Windows.Forms.Label
    Friend WithEvents txtLines As System.Windows.Forms.Label
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.Label1 = New System.Windows.Forms.Label
        Me.Label2 = New System.Windows.Forms.Label
        Me.Label3 = New System.Windows.Forms.Label
        Me.Label4 = New System.Windows.Forms.Label
        Me.Label5 = New System.Windows.Forms.Label
        Me.txtName = New System.Windows.Forms.TextBox
        Me.btnOK = New System.Windows.Forms.Button
        Me.txtScore = New System.Windows.Forms.Label
        Me.txtLines = New System.Windows.Forms.Label
        Me.SuspendLayout()
        '
        'Label1
        '
        Me.Label1.Font = New System.Drawing.Font("ELEGANCE", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.Label1.ForeColor = System.Drawing.Color.FromArgb(CType(192, Byte), CType(0, Byte), CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(32, 8)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(384, 56)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Congratulations!"
        Me.Label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'Label2
        '
        Me.Label2.Font = New System.Drawing.Font("ELEGANCE", 20.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(2, Byte))
        Me.Label2.ForeColor = System.Drawing.Color.FromArgb(CType(0, Byte), CType(192, Byte), CType(0, Byte))
        Me.Label2.Location = New System.Drawing.Point(40, 72)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(372, 48)
        Me.Label2.TabIndex = 1
        Me.Label2.Text = "You have a new high score!!"
        Me.Label2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
        '
        'Label3
        '
        Me.Label3.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label3.Location = New System.Drawing.Point(288, 160)
        Me.Label3.Name = "Label3"
        Me.Label3.Size = New System.Drawing.Size(64, 23)
        Me.Label3.TabIndex = 4
        Me.Label3.Text = "Lines:"
        '
        'Label4
        '
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.Location = New System.Drawing.Point(104, 160)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(72, 24)
        Me.Label4.TabIndex = 5
        Me.Label4.Text = "Score:"
        '
        'Label5
        '
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label5.Location = New System.Drawing.Point(24, 272)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(264, 32)
        Me.Label5.TabIndex = 6
        Me.Label5.Text = "Please enter your name:"
        '
        'txtName
        '
        Me.txtName.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtName.Location = New System.Drawing.Point(296, 272)
        Me.txtName.Name = "txtName"
        Me.txtName.Size = New System.Drawing.Size(152, 31)
        Me.txtName.TabIndex = 7
        Me.txtName.Text = ""
        '
        'btnOK
        '
        Me.btnOK.Font = New System.Drawing.Font("Microsoft Sans Serif", 18.0!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.btnOK.Location = New System.Drawing.Point(200, 352)
        Me.btnOK.Name = "btnOK"
        Me.btnOK.Size = New System.Drawing.Size(96, 64)
        Me.btnOK.TabIndex = 8
        Me.btnOK.Text = "OK"
        '
        'txtScore
        '
        Me.txtScore.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
        Me.txtScore.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtScore.Location = New System.Drawing.Point(96, 192)
        Me.txtScore.Name = "txtScore"
        Me.txtScore.Size = New System.Drawing.Size(96, 40)
        Me.txtScore.TabIndex = 9
        '
        'txtLines
        '
        Me.txtLines.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
        Me.txtLines.Font = New System.Drawing.Font("Microsoft Sans Serif", 15.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.txtLines.Location = New System.Drawing.Point(288, 192)
        Me.txtLines.Name = "txtLines"
        Me.txtLines.Size = New System.Drawing.Size(100, 40)
        Me.txtLines.TabIndex = 10
        '
        'HighScoreEntry
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(488, 438)
        Me.Controls.Add(Me.txtLines)
        Me.Controls.Add(Me.txtScore)
        Me.Controls.Add(Me.btnOK)
        Me.Controls.Add(Me.txtName)
        Me.Controls.Add(Me.Label5)
        Me.Controls.Add(Me.Label4)
        Me.Controls.Add(Me.Label3)
        Me.Controls.Add(Me.Label2)
        Me.Controls.Add(Me.Label1)
        Me.Name = "HighScoreEntry"
        Me.Text = "New High Score"
        Me.ResumeLayout(False)

    End Sub

#End Region

    Private Sub HighScoreEntry_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

    End Sub


    Private Sub btnOK_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles btnOK.Click
        DialogResult = DialogResult.Cancel

        If txtName.Text <> "" Then
            DialogResult = DialogResult.OK
        Else
            MessageBox.Show("You have not entered your name!")
        End If
    End Sub


    Public Sub Init(ByVal score As Integer, ByVal lines As Integer)
        txtScore.Text = score.ToString
        txtLines.Text = lines.ToString
    End Sub


    Property PlayerName() As String
        Get
            Return txtName.Text
        End Get
        Set(ByVal Value As String)
            txtName.Text = Value
        End Set
    End Property

    Property Score() As String
        Get
            Return txtScore.Text
        End Get
        Set(ByVal Value As String)
            txtScore.Text = Value
        End Set
    End Property

    Property Lines() As String
        Get
            Return txtLines.Text
        End Get
        Set(ByVal Value As String)
            txtLines.Text = Value
        End Set
    End Property

End Class

