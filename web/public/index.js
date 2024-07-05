<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body>

    <!-- Create the canvas that the C++ code will draw into -->
    <canvas id="canvas" oncontextmenu="event.preventDefault()"></canvas>

    <!-- Allow the C++ to access the canvas element --> 
    <script type='text/javascript'>
        var Module = {
            canvas: (function() { return document.getElementById('canvas'); })()
        };
    </script>
    
    <!-- Add the javascript glue code (index.js) as generated by Emscripten -->
    <script async type="text/javascript" src="index.js"></script>
    
</body>

</html>
