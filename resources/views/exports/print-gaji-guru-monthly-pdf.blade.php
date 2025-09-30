<!DOCTYPE html>
<html>
<head>
    <title>Print PDF Gaji Guru Bulanan</title>
    <style>
        body { margin: 0; }
        iframe { width: 100vw; height: 100vh; border: none; }
    </style>
</head>
<body>
    <iframe id="pdfFrame" src="{{ $pdfUrl }}"></iframe>
    <script>
        const iframe = document.getElementById('pdfFrame');
        iframe.onload = function() {
            setTimeout(function() {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
            }, 500);
        };
    </script>
</body>
</html>
