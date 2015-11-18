<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="share.aspx.cs" Inherits="Storefront.share" %>
<!DOCTYPE html>
<html>
	<head runat="server">
		<title></title>
        <asp:Literal runat="server" ID="metaLiteral" />
        <script src="js/libs/jquery.min.js"></script>
		<script src="js/libs/_bundle.js"></script>
		<link rel="stylesheet" href="css/_bundle.css?1410362125452" />
        <style type='text/css'> body { padding: 0px; margin: 0px; }</style>
		<script src="https://apis.google.com/js/plusone.js"></script>
	</head>
	<body>
		<div class="placeholder csHtmlContent">
			<div style="clear:both;">
				<asp:Literal runat="server" ID="lit"></asp:Literal>
			</div>
			<div style="clear:both; padding:20px; margin-top:10px; background-color:#bbb;">
				This content is available for syndication on your website. For more information, please visit the CDC Content Services site at <asp:HyperLink runat="server" ID="hlBackLink"></asp:HyperLink>.
			</div>
		</div>
	</body>
</html>